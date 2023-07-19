import { screen } from '@testing-library/react';
import { App } from './app';
import { render } from './test/utils/render';

test('renders', async () => {
  const { userEvent } = render(<App />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByText('Vite + React')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
