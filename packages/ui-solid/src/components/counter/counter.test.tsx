import { Counter } from './counter';
import { render } from '../../test';
import { screen } from '@solidjs/testing-library';

test('renders', async () => {
  const { userEvent } = render(() => <Counter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
