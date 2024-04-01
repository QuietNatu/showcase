import { screen, waitForElementToBeRemoved } from '@testing-library/angular';
import { NatuPopoverDirective } from './popover.directive';
import { aliasArgs, aliasedArgsToTemplate, axe, render } from '../../test';

/* TODO: change tests */

describe(`${NatuPopoverDirective.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Popover',
      template: `<button type="button" natuPopover="Example popover" [natuPopoverIsOpen]="true" [natuPopoverPlacement]="'top'">Trigger</button>`,
    },
  ];

  scenarios.forEach(({ name, template }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await render(template, {
        renderOptions: { imports: [NatuPopoverDirective] },
      });

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

describe(NatuPopoverDirective.name, () => {
  it('does not show popover by default', async () => {
    const { isOpenChangeSpy } = await setup();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('shows popover when trigger is hovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(await screen.findByRole('dialog', { name: 'Example popover' })).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('shows popover when trigger is focused', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('hides popover when trigger is unhovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    await userEvent.unhover(screen.getByRole('button', { name: 'Trigger' }));

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when popover is unhovered', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    await userEvent.hover(popover);
    await userEvent.unhover(popover);

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when trigger loses focus', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    const popover = await screen.findByRole('dialog');

    await userEvent.tab();

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when pressing Escape', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when clicked outside', async () => {
    const { container, userEvent, isOpenChangeSpy } = await setup();

    await userEvent.tab();

    const popover = await screen.findByRole('dialog');

    await userEvent.click(container);

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('controls popover default visibility', async () => {
    const { userEvent, isOpenChangeSpy } = await setup({ defaultIsOpen: true });

    const popover = await screen.findByRole('dialog', { name: 'Example popover' });

    expect(popover).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('controls popover visibility', async () => {
    const { rerender, isOpenChangeSpy } = await setup({ isOpen: true });

    expect(await screen.findByRole('dialog', { name: 'Example popover' })).toBeInTheDocument();

    const componentProperties = aliasArgs({ isOpen: false }, 'natuPopover');
    await rerender({ componentProperties: componentProperties });

    await waitForElementToBeRemoved(screen.queryByRole('dialog'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('does not show popover if disabled', async () => {
    const { userEvent } = await setup({ isOpen: true, isDisabled: true });

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports templates with context', async () => {
    const props: Partial<NatuPopoverDirective> = { context: { count: 10 }, isOpen: true };
    const componentProperties = aliasArgs(props, 'natuPopover');
    const templateArgs = aliasedArgsToTemplate(props, 'natuPopover');

    await render(
      `
        <button type="button" [natuPopover]="popoverTemplate" ${templateArgs}>Trigger</button>
        <ng-template #popoverTemplate let-count="count">Current value: {{count}}</ng-template>
      `,
      {
        renderOptions: {
          imports: [NatuPopoverDirective],
          componentProperties,
        },
      },
    );

    expect(await screen.findByRole('dialog', { name: 'Current value: 10' })).toBeInTheDocument();
  });

  async function setup(props: Partial<NatuPopoverDirective> = {}) {
    // eslint-disable-next-line jasmine/no-unsafe-spy
    const isOpenChangeSpy = jasmine.createSpy();

    const allProps = {
      ...props,
      isOpenChange: isOpenChangeSpy,
    };

    const componentProperties = aliasArgs(allProps, 'natuPopover');
    const templateArgs = aliasedArgsToTemplate(allProps, 'natuPopover');

    const view = await render(
      `<button type="button" natuPopover="Example popover" ${templateArgs}>Trigger</button>`,
      {
        renderOptions: {
          imports: [NatuPopoverDirective],
          componentProperties: componentProperties,
        },
      },
    );

    return { ...view, isOpenChangeSpy };
  }
});
