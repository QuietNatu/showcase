import { screen, waitForElementToBeRemoved } from '@testing-library/angular';
import { NatuTooltipDirective, natuTooltipImports } from './tooltip.directive';
import { aliasArgs, aliasedArgsToTemplate, axe, render } from '../../test';
import { NatuTooltipReferenceDirective } from './tooltip-reference.directive';

describe(`${NatuTooltipDirective.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Closed',
      props: { isOpen: false },
    },
    {
      name: 'Open',
      props: { isOpen: true },
      waitForTestToBeReady: () => screen.findByText('Example tooltip'),
    },
  ];

  scenarios.forEach(({ name, props, waitForTestToBeReady = () => Promise.resolve() }) => {
    it(`${name} has no accessibility violations`, async () => {
      await setup(props);

      await waitForTestToBeReady();

      expect(await axe(document.body)).toHaveNoViolations();
    });
  });
});

describe(NatuTooltipDirective.name, () => {
  it('does not show tooltip by default', async () => {
    const { isOpenChangeSpy } = await setup();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('shows tooltip when trigger is hovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('shows tooltip when trigger is focused', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('hides tooltip when trigger is unhovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const tooltip = await screen.findByRole('tooltip');

    await userEvent.unhover(screen.getByRole('button', { name: 'Trigger' }));

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides tooltip when tooltip is unhovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const tooltip = await screen.findByRole('tooltip');

    await userEvent.hover(tooltip);
    await userEvent.unhover(tooltip);

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides tooltip when trigger loses focus', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    const tooltip = await screen.findByRole('tooltip');

    await userEvent.tab();

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides tooltip when pressing Escape', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const tooltip = await screen.findByRole('tooltip');

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides tooltip when clicked outside', async () => {
    const { container, userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    const tooltip = await screen.findByRole('tooltip');

    await userEvent.click(container);

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('controls tooltip default visibility', async () => {
    const { userEvent, isOpenChangeSpy } = await setup({ defaultIsOpen: true });

    const tooltip = await screen.findByRole('tooltip', { name: 'Example tooltip' });

    expect(tooltip).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(tooltip);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('controls tooltip visibility', async () => {
    const { rerender, isOpenChangeSpy } = await setup({ isOpen: true });

    expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();

    const componentProperties = aliasArgs({ isOpen: false }, 'natuTooltip');
    await rerender({ componentProperties: componentProperties });

    await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('does not show tooltip if disabled', async () => {
    const { userEvent } = await setup({ isOpen: true, isDisabled: true });

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('supports templates with context', async () => {
    const props: Partial<NatuTooltipDirective> = { context: { count: 10 }, isOpen: true };
    const componentProperties = aliasArgs(props, 'natuTooltip');
    const templateArgs = aliasedArgsToTemplate(props, 'natuTooltip');

    await render(
      `
        <button type="button" [natuTooltip]="tooltipTemplate" ${templateArgs}>Trigger</button>
        <ng-template #tooltipTemplate let-count="count">Current value: {{count}}</ng-template>
      `,
      {
        renderOptions: {
          imports: [NatuTooltipDirective],
          componentProperties,
        },
      },
    );

    expect(await screen.findByRole('tooltip', { name: 'Current value: 10' })).toBeInTheDocument();
  });

  it(`supports setting reference element via ${NatuTooltipReferenceDirective.name}`, async () => {
    const { userEvent } = await render(
      `
        <ng-container natuTooltip="Example tooltip">
          <button type="button" natuTooltipReference>Trigger</button>
        </ng-container>
      `,
      { renderOptions: { imports: [natuTooltipImports] } },
    );

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(await screen.findByRole('tooltip', { name: 'Example tooltip' })).toBeInTheDocument();
  });
});

async function setup(props: Partial<NatuTooltipDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy = jasmine.createSpy();

  const allProps = {
    ...props,
    isOpenChange: isOpenChangeSpy,
  };

  const componentProperties = aliasArgs(allProps, 'natuTooltip');
  const templateArgs = aliasedArgsToTemplate(allProps, 'natuTooltip');

  const view = await render(
    `<button type="button" natuTooltip="Example tooltip" ${templateArgs}>Trigger</button>`,
    {
      renderOptions: {
        imports: [natuTooltipImports],
        componentProperties: componentProperties,
      },
    },
  );

  return { ...view, isOpenChangeSpy };
}
