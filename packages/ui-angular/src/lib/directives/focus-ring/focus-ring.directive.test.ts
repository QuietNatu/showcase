import { screen } from '@testing-library/angular';
import { aliasArgs, aliasedArgsToTemplate, render } from '../../test';
import { NatuFocusRingDirective } from './focus-ring.directive';
import { A11yModule, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { TestComponentArgs } from '../../test/types';

describe(NatuFocusRingDirective.name, () => {
  it('by default, does not set focus visible class', async () => {
    await setup({ focusVisibleClass: 'example-class' });

    expect(screen.getByRole('button')).not.toHaveClassName('example-class');
  });

  it('sets focus visible class', async () => {
    const { focusMonitorTrigger$, detectChanges } = await setup({
      focusVisibleClass: 'example-class',
    });

    focusMonitorTrigger$.next('keyboard');
    detectChanges();

    expect(screen.getByRole('button')).toHaveClassName('example-class');
  });

  it('does not set focus visible class', async () => {
    const { focusMonitorTrigger$, detectChanges } = await setup({
      focusVisibleClass: 'example-class',
    });

    focusMonitorTrigger$.next('mouse');
    detectChanges();

    expect(screen.getByRole('button')).not.toHaveClassName('example-class');
  });

  async function setup(props: TestComponentArgs<NatuFocusRingDirective> = {}) {
    // eslint-disable-next-line jasmine/no-unsafe-spy
    const focusMonitorSpy = jasmine.createSpyObj<FocusMonitor>(FocusMonitor.name, ['monitor']);
    const focusMonitorTrigger$ = new Subject<FocusOrigin>();
    focusMonitorSpy.monitor.and.returnValue(focusMonitorTrigger$);

    const componentProperties = aliasArgs(props, 'natuFocusRing');
    const templateArgs = aliasedArgsToTemplate(props, 'natuFocusRing');

    const view = await render(
      `<button type="button" natuFocusRing ${templateArgs}>Button</button>`,
      {
        renderOptions: {
          imports: [NatuFocusRingDirective, A11yModule],
          providers: [{ provide: FocusMonitor, useValue: focusMonitorSpy }],
          componentProperties,
        },
      },
    );

    return { ...view, focusMonitorTrigger$ };
  }
});
