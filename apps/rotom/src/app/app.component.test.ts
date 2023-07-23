import { render } from '@natu/ui-angular/test';
import { AppComponent } from './app.component';
import { screen } from '@testing-library/angular';

describe(AppComponent.name, () => {
  it('renders', async () => {
    const { userEvent } = await render(AppComponent, { renderOptions: { routes: [] } });

    await userEvent.click(screen.getByRole('button', { name: 'count is 0' }));

    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument();
  });
});
