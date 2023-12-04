import { screen } from '@testing-library/angular';
import { render } from '../../test';
import { NatuA11yButtonDirective, natuButtonImports } from './button.directive';
import { argsToTemplate } from '@storybook/angular';

describe(NatuA11yButtonDirective.name, () => {
  it('triggers click on click', async () => {
    const { userEvent, clickSpy } = await setup();

    const button = screen.getByRole('button', { name: 'Button' });

    expect(clickSpy).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('triggers click on space', async () => {
    const { userEvent, clickSpy } = await setup();

    expect(clickSpy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Button' }));
    await userEvent.keyboard('{Space}');

    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it('triggers click on enter', async () => {
    const { userEvent, clickSpy } = await setup();

    expect(clickSpy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Button' }));
    await userEvent.keyboard('{Enter}');

    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it('disables interactions', async () => {
    const { userEvent, clickSpy } = await setup({ disabled: true });

    const button = screen.getByRole('button', { name: 'Button' });

    await userEvent.click(button);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  async function setup(props: Partial<NatuA11yButtonDirective> = {}) {
    // eslint-disable-next-line jasmine/no-unsafe-spy
    const clickSpy = jasmine.createSpy();

    const componentProperties = {
      ...props,
      natuButtonClick: clickSpy,
    };

    const view = await render(
      `<span [natuButton] ${argsToTemplate(componentProperties)}>Button</span>`,
      {
        renderOptions: {
          imports: [natuButtonImports],
          componentProperties,
        },
      },
    );

    return { ...view, clickSpy };
  }
});
