import { render } from '@natu/ui-angular/test';
import { screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  it('renders', async () => {
    const { userEvent } = await render(CounterComponent);

    await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

    expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});
