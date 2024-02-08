import { screen } from '@testing-library/angular';
import { NatuTooltipDirective } from './tooltip.directive';
import { aliasArgs, aliasedArgsToTemplate, render } from '../../test';

/* TODO */
/* TODO: a11y */

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

  // it('hides tooltip when trigger is unhovered', async () => {
  //   const { userEvent, isOpenChangeSpy } = await setup();

  //   await userEvent.hover(screen.getByRole('button', { name: 'Trigger' }));
  //   await userEvent.unhover(screen.getByRole('button', { name: 'Trigger' }));

  //   /* TODO is this not working because of animation delay for some reason? TODO: disable animations module */
  //   // await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());

  //   // expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  //   expect(isOpenChangeSpy).toHaveBeenCalledTimes(2);
  //   expect(isOpenChangeSpy.calls.argsFor(2)).toEqual([false]);
  // });

  // it('hides tooltip when trigger loses focus', async () => {
  //   const { container, userEvent, isOpenChangeSpy } = await setup();

  //   // Should not be a click but jsdom does not have the required API for focus-visible
  //   await userEvent.click(screen.getByRole('button', { name: 'Trigger' }));
  //   await userEvent.click(container);

  //   await waitForElementToBeRemoved(screen.queryByRole('tooltip'));

  //   expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  //   expect(isOpenChangeSpy).toHaveBeenCalledTimes(4); // Click also triggers hover
  //   expect(isOpenChangeSpy.calls.argsFor(2)).toEqual([false]);
  // });

  /* TODO: variation with template */
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
          imports: [NatuTooltipDirective],
          componentProperties: componentProperties,
        },
      },
    );

    return { ...view, isOpenChangeSpy };
  }
});
