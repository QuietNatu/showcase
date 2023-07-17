import { screen } from '@solidjs/testing-library';
import { App } from './app';
import { render } from './test/utils/render';

test('renders', async () => {
  const { userEvent } = render(() => <App />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByText('Vite + Solid')).toBeInTheDocument();
  expect(screen.getByText('count is 1')).toBeInTheDocument();
});
