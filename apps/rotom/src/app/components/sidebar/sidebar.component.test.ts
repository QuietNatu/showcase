import { axe, render } from '@natu/ui-angular/test';
import { SidebarComponent } from './sidebar.component';

describe(`${SidebarComponent.name} accessibility`, () => {
  it(`has no accessibility violations`, async () => {
    const view = await render(SidebarComponent);

    expect(await axe(view.container)).toHaveNoViolations();
  });
});
