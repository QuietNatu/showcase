import { NatuAccordionDirective, natuAccordionImports } from './accordion.directive';
import { aliasArgs, aliasedArgsToTemplate, axe, render } from '../../test';
import { screen } from '@testing-library/angular';

describe(`${NatuAccordionDirective.name} accessibility`, () => {
  const scenarios = [
    { name: 'Collapsed accordion', args: { isExpanded: false } },
    { name: 'Expanded accordion', args: { isExpanded: true } },
  ];

  scenarios.forEach(({ name, args }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await setup(args);

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

describe(NatuAccordionDirective.name, () => {
  it('does not show content by default', async () => {
    await setup();

    expect(screen.getByRole('button', { name: 'Example Trigger' })).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByText('Example Content')).not.toBeVisible();
  });

  it('shows content when trigger is clicked', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Example Trigger' }));

    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByText('Example Content')).toBeVisible();
    expect(isExpandedChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('hides content when trigger is clicked', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Example Trigger' }));
    await userEvent.click(screen.getByRole('button', { name: 'Example Trigger' }));

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByText('Example Content')).not.toBeVisible();
    expect(isExpandedChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('does not show content when disabled', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup({ isDisabled: true });

    await userEvent.click(screen.getByRole('button', { name: 'Example Trigger' }));

    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    expect(isExpandedChangeSpy).not.toHaveBeenCalled();
  });

  it('controls content default visibility', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup({ defaultIsExpanded: true });

    expect(await screen.findByRole('region')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Example Trigger' }));

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('controls content visibility', async () => {
    const { rerender, isExpandedChangeSpy } = await setup({ isExpanded: true });

    expect(await screen.findByRole('region')).toBeInTheDocument();

    const componentProperties = aliasArgs({ isExpanded: false }, 'natuAccordion');
    await rerender({ componentProperties });

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).not.toHaveBeenCalled();
  });
});

async function setup(props: Partial<NatuAccordionDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isExpandedChangeSpy = jasmine.createSpy();

  const allProps = {
    ...props,
    isExpandedChange: isExpandedChangeSpy,
  };

  const componentProperties = aliasArgs(allProps, 'natuAccordion');
  const templateArgs = aliasedArgsToTemplate(allProps, 'natuAccordion');

  const view = await render(
    ` <div [natuAccordion] ${templateArgs}>
        <button type="button" [natuAccordionTrigger]>Example Trigger</button>
        <div [natuAccordionContent]>Example Content</div>
      </div>`,
    {
      renderOptions: {
        imports: [natuAccordionImports],
        componentProperties,
      },
    },
  );

  return { ...view, isExpandedChangeSpy };
}
