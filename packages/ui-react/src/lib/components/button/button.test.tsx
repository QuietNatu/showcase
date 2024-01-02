import { screen } from '@testing-library/react';
import { axe, render, renderStory } from '../../test';
import { NatuButton, NatuButtonSlottedProps } from './button';
import { composeStories } from '@storybook/react';
import * as stories from './button.stories';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);
  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);
  expect(await axe(baseElement)).toHaveNoViolations();
});

describe('custom button', () => {
  test('triggers click on click', async () => {
    const { userEvent, pressSpy } = setup();

    const button = screen.getByRole('button', { name: 'Button' });

    expect(pressSpy).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(pressSpy).toHaveBeenCalledTimes(1);
  });

  test('triggers click on space', async () => {
    const { userEvent, pressSpy } = setup();

    expect(pressSpy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Button' }));
    await userEvent.keyboard('[Space]');

    expect(pressSpy).toHaveBeenCalledTimes(2);
  });

  test('triggers click on enter', async () => {
    const { userEvent, pressSpy } = setup();

    expect(pressSpy).not.toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'Button' }));
    await userEvent.keyboard('[Enter]');

    expect(pressSpy).toHaveBeenCalledTimes(2);
  });

  test('disables interactions', async () => {
    const { userEvent, pressSpy } = setup({ isDisabled: true });

    const button = screen.getByRole('button', { name: 'Button' });

    await userEvent.click(button);

    expect(pressSpy).not.toHaveBeenCalled();
  });

  function setup(props: Partial<NatuButtonSlottedProps> = {}) {
    const pressSpy = vi.fn();

    const view = render(
      <NatuButton {...props} asChild={true} onPress={pressSpy}>
        <span>Button</span>
      </NatuButton>,
    );

    return { ...view, pressSpy };
  }
});
