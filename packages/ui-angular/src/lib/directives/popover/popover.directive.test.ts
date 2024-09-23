import { screen, waitForElementToBeRemoved } from '@testing-library/angular';
import {
  NatuPopoverDirective,
  natuCardPopoverImports,
  natuPopoverImports,
} from './popover.directive';
import { axe, render } from '../../test';
import { TestComponentArgs } from '../../test/types';

describe(`${NatuPopoverDirective.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Closed',
      props: { isOpen: false },
    },
    {
      name: 'Open',
      props: { isOpen: true },
      waitForTestToBeReady: async () => {
        expect(await screen.findByRole('dialog', { name: 'Example popover' })).toBeInTheDocument();
      },
    },
  ];

  scenarios.forEach(({ name, props, waitForTestToBeReady = () => Promise.resolve() }) => {
    it(`${name} has no accessibility violations`, async () => {
      await setup(props);

      await waitForTestToBeReady();

      expect(await axe(document.body)).toHaveNoViolations();
    });
  });

  it(`card has no accessibility violations`, async () => {
    await setupCardPopover({ isOpen: true });

    expect(await screen.findByRole('dialog', { name: 'Header' })).toBeInTheDocument();

    expect(await axe(document.body)).toHaveNoViolations();
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

    expect(await screen.findByRole('dialog', { name: 'Example popover' })).toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('hides popover when pressing Escape', async () => {
    const { userEvent, isOpenChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog', { name: 'Example popover' });

    expect(popover).toBeInTheDocument();

    await userEvent.keyboard('[Escape]');

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('hides popover when clicked outside', async () => {
    const { container, userEvent, isOpenChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog', { name: 'Example popover' });

    expect(popover).toBeInTheDocument();

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

    const popover = await screen.findByRole('dialog', { name: 'Example popover' });

    expect(popover).toBeInTheDocument();

    await rerender({
      componentProperties: { isOpen: false } satisfies TestComponentArgs<NatuPopoverDirective>,
    });

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('does not show popover if disabled', async () => {
    const { userEvent } = await setup({ isOpen: true, isDisabled: true });

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('hides popover when card dismiss button is clicked', async () => {
    const { userEvent, isOpenChangeSpy } = await setupCardPopover();

    await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));

    const popover = await screen.findByRole('dialog', { name: 'Header' });

    expect(popover).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    await waitForElementToBeRemoved(popover);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
    expect(isOpenChangeSpy.calls.argsFor(1)).toEqual([false]);
  });
});

async function setup(props: TestComponentArgs<NatuPopoverDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isOpenChange: isOpenChangeSpy,
  };

  const view = await render(
    `
      <ng-container
        natuPopover
        [natuPopoverAttributes]="{ 'aria-labelledby': 'popover-content-id' }"
        [natuPopoverIsDisabled]="isDisabled"
        [natuPopoverDefaultIsOpen]="defaultIsOpen"
        [natuPopoverIsOpen]="isOpen"
        (natuPopoverIsOpenChange)="isOpenChange($event)"
      >
        <button type="button" natuPopoverTrigger>Trigger</button>

        <div *natuPopoverContent id="popover-content-id">Example popover</div>
      </ng-container>
    `,
    {
      renderOptions: {
        imports: [natuPopoverImports],
        componentProperties,
      },
    },
  );

  return { ...view, isOpenChangeSpy };
}

async function setupCardPopover(props: TestComponentArgs<NatuPopoverDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isOpenChange: isOpenChangeSpy,
  };

  const view = await render(
    `
      <ng-container
        natuPopover
        [natuPopoverHasEmbeddedContent]="true"
        [natuPopoverIsDisabled]="isDisabled"
        [natuPopoverDefaultIsOpen]="defaultIsOpen"
        [natuPopoverIsOpen]="isOpen"
        (natuPopoverIsOpenChange)="isOpenChange($event)"
      >
        <button type="button" natuPopoverTrigger>Trigger</button>

        <natu-card *natuPopoverContent natuPopoverCard>
            <natu-card-header natuPopoverCardHeader>Header</natu-card-header>

            <natu-card-body natuPopoverCardBody>Example body</natu-card-body>
        </natu-card>
      </ng-container>
    `,
    {
      renderOptions: {
        imports: [natuCardPopoverImports],
        componentProperties,
      },
    },
  );

  return { ...view, isOpenChangeSpy };
}
