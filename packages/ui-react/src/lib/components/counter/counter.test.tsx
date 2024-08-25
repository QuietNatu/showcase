import { screen } from '@testing-library/react';
import { NatuCounter } from './counter';
import { render } from '../../../test/render';

test('renders', async () => {
  const { userEvent } = render(<NatuCounter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
