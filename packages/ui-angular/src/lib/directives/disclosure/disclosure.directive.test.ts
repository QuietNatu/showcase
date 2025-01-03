import { NatuDisclosureDirective, natuDisclosureImports } from './disclosure.directive';
import { axe, render } from '../../test';
import { screen } from '@testing-library/angular';
import { TestComponentArgs } from '../../test/types';

describe(`${NatuDisclosureDirective.name} accessibility`, () => {
  const scenarios = [
    { name: 'Collapsed disclosure', args: { isExpanded: false } },
    { name: 'Expanded disclosure', args: { isExpanded: true } },
  ];

  scenarios.forEach(({ name, args }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await setup(args);

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

describe(NatuDisclosureDirective.name, () => {
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

    await rerender({
      componentProperties: {
        isExpanded: false,
      } satisfies TestComponentArgs<NatuDisclosureDirective>,
    });

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).not.toHaveBeenCalled();
  });
});

async function setup(props: TestComponentArgs<NatuDisclosureDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isExpandedChangeSpy = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isExpandedChange: isExpandedChangeSpy,
  };

  const view = await render(
    ` <div
        natuDisclosure
        [natuDisclosureDefaultIsExpanded]="defaultIsExpanded"
        [natuDisclosureIsExpanded]="isExpanded"
        [natuDisclosureIsDisabled]="isDisabled"
        (natuDisclosureIsExpandedChange)="isExpandedChange($event)"
      >
        <button type="button" natuDisclosureTrigger>Example Trigger</button>
        <div natuDisclosureContent>Example Content</div>
      </div>`,
    {
      renderOptions: {
        imports: [natuDisclosureImports],
        componentProperties,
      },
    },
  );

  return { ...view, isExpandedChangeSpy };
}
