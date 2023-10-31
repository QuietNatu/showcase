import { NatuCounter } from './counter';
import { render } from '../../test';
import { screen } from '@solidjs/testing-library';

test('renders', async () => {
  const { userEvent } = render(() => <NatuCounter />);

  await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
});
