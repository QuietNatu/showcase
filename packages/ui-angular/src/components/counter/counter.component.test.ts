import { screen } from '@testing-library/angular';
import { NatuCounterComponent } from './counter.component';
import { render } from '../../test';

describe(NatuCounterComponent.name, () => {
  it('renders', async () => {
    const { userEvent } = await render(NatuCounterComponent);

    await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

    expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});
