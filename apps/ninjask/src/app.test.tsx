import { screen } from '@solidjs/testing-library';
import { App } from './app';
import { render } from '@natu/ui-solid/test';

test('renders', async () => {
  const { userEvent } = render(() => <App />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByText('Vite + Solid')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
