import { screen } from '@testing-library/react';
import { render } from '@natu/ui-react/test';
import { Counter } from './counter';

test('renders', async () => {
  const { userEvent } = render(<Counter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
