import { axe, render } from '../../test';
import { NatuHeaderDirective } from './header.directive';

describe(`${NatuHeaderDirective.name} accessibility`, () => {
  it(`has no accessibility violations`, async () => {
    const view = await render(`<header natuHeader>Header</header>`, {
      renderOptions: { imports: [NatuHeaderDirective] },
    });

    expect(await axe(view.container)).toHaveNoViolations();
  });
});
