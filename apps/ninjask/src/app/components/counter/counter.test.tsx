import { screen } from '@solidjs/testing-library';
import { render } from '@natu/ui-solid/test';
import { Counter } from './counter';

test('renders', async () => {
  const { userEvent } = render(() => <Counter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
