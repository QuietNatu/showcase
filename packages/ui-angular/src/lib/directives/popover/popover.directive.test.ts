import { screen, waitForElementToBeRemoved, within } from '@testing-library/angular';
import { NatuPopoverDirective } from './popover.directive';
import { aliasArgs, aliasedArgsToTemplate, axe, render } from '../../test';

describe(`${NatuPopoverDirective.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Popover',
      template: `<button type="button" natuPopover [natuPopoverTitle]="'Example title'" [natuPopoverContent]="'Example popover'" [natuPopoverIsOpen]="true" [natuPopoverPlacement]="'top'">Trigger</button>`,
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

  it('shows popover when trigger is clicked', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Example title')).toBeInTheDocument();
    expect(await within(popover).findByText('Example content')).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('hides popover when pressing Escape', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Example title')).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when clicked outside', async () => {
    const { container, userEvent, isOpenChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Example title')).toBeInTheDocument();

    await userEvent.click(container);

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('controls popover default visibility', async () => {
    const { userEvent, isOpenChangeSpy } = await setup({ defaultIsOpen: true });

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Example title')).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('controls popover visibility', async () => {
    const { rerender, isOpenChangeSpy } = await setup({ isOpen: true });

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Example title')).toBeInTheDocument();

    const componentProperties = aliasArgs({ isOpen: false }, 'natuPopover');

    await rerender({ componentProperties: componentProperties });

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('does not show popover if disabled', async () => {
    const { userEvent } = await setup({ isOpen: true, isDisabled: true });

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('supports templates with context', async () => {
    const props: Partial<NatuPopoverDirective> = {
      titleContext: { count: 2 },
      contentContext: { count: 10 },
      isOpen: true,
    };
    const componentProperties = aliasArgs(props, 'natuPopover');
    const templateArgs = aliasedArgsToTemplate(props, 'natuPopover');

    await render(
      `
        <button type="button" natuPopover [natuPopoverTitle]="titleTemplate" [natuPopoverContent]="contentTemplate" ${templateArgs}>Trigger</button>

        <ng-template #titleTemplate let-count="count">Title value: {{count}}</ng-template>
        <ng-template #contentTemplate let-count="count">Content value: {{count}}</ng-template>
      `,
      {
        renderOptions: {
          imports: [NatuPopoverDirective],
          componentProperties,
        },
      },
    );

    const popover = await screen.findByRole('dialog');

    expect(await within(popover).findByText('Title value: 2')).toBeInTheDocument();
    expect(await within(popover).findByText('Content value: 10')).toBeInTheDocument();
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
      `<button type="button" natuPopover [natuPopoverTitle]="'Example title'" [natuPopoverContent]="'Example content'" ${templateArgs}>Trigger</button>`,
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
