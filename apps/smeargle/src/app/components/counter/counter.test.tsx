import { screen } from '@testing-library/react';
import { Counter } from './counter';
import { render } from '@/test/render';

test('renders', async () => {
  const { userEvent } = render(<Counter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
