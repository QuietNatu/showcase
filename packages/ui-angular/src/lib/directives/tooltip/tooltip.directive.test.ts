import { screen, waitForElementToBeRemoved } from '@testing-library/angular';
import { NatuTooltipDirective, natuTooltipImports } from './tooltip.directive';
import { axe, render } from '../../test';
import { TestComponentArgs } from '../../test/types';
import { NatuOverlayDelayGroupDirective } from '../../overlay';
import { provideUiConfig } from '../../core';
import { fakeAsync, tick } from '@angular/core/testing';

describe(`${NatuTooltipDirective.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Closed',
      props: { isOpen: false },
    },
    {
      name: 'Open',
      props: { isOpen: true },
      waitForTestToBeReady: () => screen.findByRole('tooltip', { name: 'Example tooltip' }),
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

    await rerender({
      componentProperties: { isOpen: false } satisfies TestComponentArgs<NatuTooltipDirective>,
    });

    await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(isOpenChangeSpy).not.toHaveBeenCalled();
  });

  it('does not show tooltip if disabled', async () => {
    const { userEvent } = await setup({ isOpen: true, isDisabled: true });

    await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  describe('with group delay', () => {
    it('shows and hides tooltip with delay but skips delay between tooltips', fakeAsync(async () => {
      const { userEvent, isOpenChangeSpy1, isOpenChangeSpy2 } = await setupDelayGroup();

      await userEvent.hover(screen.getByRole('button', { name: 'Trigger 1' }));
      tick(10_000);

      const tooltip1 = await screen.findByRole('tooltip', { name: 'Example tooltip 1' });

      expect(tooltip1).toBeInTheDocument();

      await userEvent.unhover(screen.getByRole('button', { name: 'Trigger 1' }));
      await userEvent.hover(screen.getByRole('button', { name: 'Trigger 2' }));

      await waitForElementToBeRemoved(tooltip1);
      const tooltip2 = await screen.findByRole('tooltip', { name: 'Example tooltip 2' });

      expect(tooltip1).not.toBeInTheDocument();
      expect(tooltip2).toBeInTheDocument();

      await userEvent.unhover(screen.getByRole('button', { name: 'Trigger 2' }));
      tick(10_000);

      await waitForElementToBeRemoved(tooltip2);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(isOpenChangeSpy1.calls.mostRecent().args).toEqual([false]);
      expect(isOpenChangeSpy2.calls.mostRecent().args).toEqual([false]);
    }));

    it('does not skip delay between tooltips when not in a group', fakeAsync(async () => {
      const { userEvent, isOpenChangeSpy1, isOpenChangeSpy2 } = await setupWithoutDelayGroup();

      await userEvent.hover(screen.getByRole('button', { name: 'Trigger 1' }));
      tick(10_000);

      const tooltip1 = await screen.findByRole('tooltip', { name: 'Example tooltip 1' });

      expect(tooltip1).toBeInTheDocument();

      await userEvent.unhover(screen.getByRole('button', { name: 'Trigger 1' }));
      await userEvent.hover(screen.getByRole('button', { name: 'Trigger 2' }));
      tick(10_000);

      await waitForElementToBeRemoved(tooltip1);
      const tooltip2 = await screen.findByRole('tooltip', { name: 'Example tooltip 2' });

      expect(tooltip1).not.toBeInTheDocument();
      expect(tooltip2).toBeInTheDocument();

      await userEvent.unhover(screen.getByRole('button', { name: 'Trigger 2' }));
      tick(10_000);

      await waitForElementToBeRemoved(tooltip2);

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(isOpenChangeSpy1.calls.mostRecent().args).toEqual([false]);
      expect(isOpenChangeSpy2.calls.mostRecent().args).toEqual([false]);
    }));
  });
});

async function setup(props: TestComponentArgs<NatuTooltipDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isOpenChange: isOpenChangeSpy,
  };

  const view = await render(
    `
      <ng-container
        natuTooltip
        [natuTooltipDefaultIsOpen]="defaultIsOpen"
        [natuTooltipIsOpen]="isOpen"
        [natuTooltipIsDisabled]="isDisabled"
        (natuTooltipIsOpenChange)="isOpenChange($event)"
      >
        <button type="button" natuTooltipTrigger>Trigger</button>
        <ng-template natuTooltipContent>Example tooltip</ng-template>
      </ng-container>
    `,
    {
      renderOptions: {
        imports: [natuTooltipImports],
        componentProperties,
      },
    },
  );

  return { ...view, isOpenChangeSpy };
}

async function setupDelayGroup(props: TestComponentArgs<NatuTooltipDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy1 = jasmine.createSpy();
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy2 = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isOpenChange1: isOpenChangeSpy1,
    isOpenChange2: isOpenChangeSpy2,
  };

  // big delay to make sure test fails when timers are not manually advanced
  const delay = 10_000;

  const view = await render(
    `
      <ng-container natuOverlayDelayGroup [natuOverlayDelayGroupDelay]="${delay}">
        <ng-container
          natuTooltip
          [natuTooltipDefaultIsOpen]="defaultIsOpen"
          [natuTooltipIsOpen]="isOpen"
          [natuTooltipIsDisabled]="isDisabled"
          (natuTooltipIsOpenChange)="isOpenChange1($event)"
        >
          <button type="button" natuTooltipTrigger>Trigger 1</button>
          <ng-template natuTooltipContent>Example tooltip 1</ng-template>
        </ng-container>

        <ng-container
          natuTooltip
          [natuTooltipDefaultIsOpen]="defaultIsOpen"
          [natuTooltipIsOpen]="isOpen"
          [natuTooltipIsDisabled]="isDisabled"
          (natuTooltipIsOpenChange)="isOpenChange2($event)"
        >
          <button type="button" natuTooltipTrigger>Trigger 2</button>
          <ng-template natuTooltipContent>Example tooltip 2</ng-template>
        </ng-container>
      </ng-container>
    `,
    {
      renderOptions: {
        imports: [natuTooltipImports, NatuOverlayDelayGroupDirective],
        componentProperties,
      },
      userEventOptions: {
        advanceTimers: (ms) => {
          tick(ms);
        },
      },
    },
  );

  return { ...view, isOpenChangeSpy1, isOpenChangeSpy2 };
}

async function setupWithoutDelayGroup(props: TestComponentArgs<NatuTooltipDirective> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy1 = jasmine.createSpy();
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isOpenChangeSpy2 = jasmine.createSpy();

  const componentProperties = {
    ...props,
    isOpenChange1: isOpenChangeSpy1,
    isOpenChange2: isOpenChangeSpy2,
  };

  const view = await render(
    `
      <ng-container
        natuTooltip
        [natuTooltipDefaultIsOpen]="defaultIsOpen"
        [natuTooltipIsOpen]="isOpen"
        [natuTooltipIsDisabled]="isDisabled"
        (natuTooltipIsOpenChange)="isOpenChange1($event)"
      >
        <button type="button" natuTooltipTrigger>Trigger 1</button>
        <ng-template natuTooltipContent>Example tooltip 1</ng-template>
      </ng-container>

      <ng-container
        natuTooltip
        [natuTooltipDefaultIsOpen]="defaultIsOpen"
        [natuTooltipIsOpen]="isOpen"
        [natuTooltipIsDisabled]="isDisabled"
        (natuTooltipIsOpenChange)="isOpenChange2($event)"
      >
        <button type="button" natuTooltipTrigger>Trigger 2</button>
        <ng-template natuTooltipContent>Example tooltip 2</ng-template>
      </ng-container>
    `,
    {
      renderOptions: {
        // big delay to make sure test fails when timers are not manually advanced
        providers: [provideUiConfig({ tooltip: { hoverDelay: 10_000 } })],
        imports: [natuTooltipImports, NatuOverlayDelayGroupDirective],
        componentProperties,
      },
      userEventOptions: {
        advanceTimers: (ms) => {
          tick(ms);
        },
      },
    },
  );

  return { ...view, isOpenChangeSpy1, isOpenChangeSpy2 };
}
