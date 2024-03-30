import { screen } from '@testing-library/angular';
import { axe, render } from '../../test';
import { NatuCardComponent, natuCardImports } from './card.component';

describe(`${NatuCardComponent.name} accessibility`, () => {
  const scenarios = [
    {
      name: 'Card',
      template: `
        <natu-card [isDismissable]="true">
          <natu-card-header >
            <span natuCardHeaderIcon>🧪</span>
            <span>Example header</span>
          </natu-card-header>

          <natu-card-body>Example body</natu-card-body>

          <natu-card-footer>Example footer</natu-card-footer>
        </natu-card>
      `,
    },
  ];

  scenarios.forEach(({ name, template }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await render(template, {
        renderOptions: { imports: [natuCardImports] },
      });

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

describe(NatuCardComponent.name, () => {
  it('emits dismiss event when clicked', async () => {
    const dismissSpy = jasmine.createSpy();

    const { userEvent } = await render(
      `
      <natu-card [isDismissable]="true" (dismiss)="dismiss()">
        <natu-card-header>Example header</natu-card-header>
        <natu-card-body>Example body</natu-card-body>
        <natu-card-footer>Example footer</natu-card-footer>
      </natu-card>
    `,
      {
        renderOptions: {
          imports: [natuCardImports],
          componentProperties: { dismiss: dismissSpy },
        },
      },
    );

    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });
});
