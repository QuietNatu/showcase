import { axe, render } from '@natu/ui-angular/test';
import { HeaderComponent } from './header.component';

describe(`${HeaderComponent.name} accessibility`, () => {
  it(`has no accessibility violations`, async () => {
    const view = await render(HeaderComponent);

    expect(await axe(view.container)).toHaveNoViolations();
  });
});
