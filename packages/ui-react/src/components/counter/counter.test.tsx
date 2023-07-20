import { screen } from '@testing-library/react';
import { render } from '../../test/utils/render';
import { Counter } from './counter';

/* TODO: absolute imports? */

test('renders', async () => {
  const { userEvent } = render(<Counter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
