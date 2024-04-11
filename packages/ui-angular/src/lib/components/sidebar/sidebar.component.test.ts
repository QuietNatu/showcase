import { argsToTemplate } from '@storybook/angular';
import { axe, render } from '../../test';
import { NatuSidebarComponent, natuSidebarImports } from './sidebar.component';

describe(`${NatuSidebarComponent.name} accessibility`, () => {
  const scenarios = [
    { name: 'Collapsed', args: { defaultIsExpanded: false } },
    { name: 'Expanded', args: { defaultIsExpanded: true } },
  ];

  scenarios.forEach(({ name, args }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await setup(args);

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

function setup(args: Partial<NatuSidebarComponent>) {
  const templateArgs = argsToTemplate(args);

  return render(
    `
      <natu-sidebar ${templateArgs}>
        <natu-sidebar-header>Example header</natu-sidebar-header>

        <natu-sidebar-actions>
          <natu-sidebar-group *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Patients</ng-template>

            <a natu-sidebar-item *natuSidebarItem href="">
              <ng-template natuSidebarLabel>General Info</ng-template>
            </a>

            <a natu-sidebar-item *natuSidebarItem href="">
              <ng-template natuSidebarLabel>Records</ng-template>
            </a>
          </natu-sidebar-group>

          <natu-sidebar-item *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Activities</ng-template>
          </natu-sidebar-item>
        </natu-sidebar-actions>

        <natu-sidebar-secondary-actions>
          <natu-sidebar-item *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Activities</ng-template>
          </natu-sidebar-item>
        </natu-sidebar-secondary-actions>
      </natu-sidebar>
    `,
    {
      renderOptions: {
        imports: [natuSidebarImports],
        componentProperties: args,
      },
    },
  );
}
