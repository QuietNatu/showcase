import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
  componentWrapperDecorator,
  applicationConfig,
} from '@storybook/angular';
import { NatuSidebarComponent, natuSidebarImports } from './sidebar.component';
import { RouterLink, RouterLinkActive, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebarComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([]), provideLocationMocks()],
    }),
    moduleMetadata({ imports: [natuSidebarImports, RouterLink, RouterLinkActive] }),
    /* TODO: reduce height */
    componentWrapperDecorator((story) => `<div style="height: 600px">${story}</div>`),
  ],
  render: (args) => {
    const templateArgs = argsToTemplate(args);

    return {
      props: args,
      template: `
        <natu-sidebar ${templateArgs}>
          <natu-sidebar-header>😀</natu-sidebar-header>

          <natu-sidebar-body>
            <natu-sidebar-group *natuSidebarItem>
              <span [natuSidebarGroupIcon]>😀</span>
              <span [natuSidebarGroupLabel]>Group 1</span>

              <a [natu-sidebar-item] *natuSidebarItem [routerLink]="[]" [routerLinkActive]>
                <span [natuSidebarItemIcon]>😀</span>
                <span [natuSidebarItemLabel]>Link 2</span>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemIcon]>😀</span>
                <span [natuSidebarItemLabel]>Link 3</span>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <span [natuSidebarItemIcon]>😀</span>
              <span [natuSidebarItemLabel]>Link 1</span>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <span [natuSidebarItemIcon]>😀</span>
              <span [natuSidebarItemLabel]>Item 1</span>
            </natu-sidebar-item>
          </natu-sidebar-body>

          <natu-sidebar-footer>
            <natu-sidebar-group *natuSidebarItem>
              <span [natuSidebarGroupIcon]>😀</span>
              <span [natuSidebarGroupLabel]>Group 1</span>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemIcon]>😀</span>
                <span [natuSidebarItemLabel]>Link 2</span>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemIcon]>😀</span>
                <span [natuSidebarItemLabel]>Link 3</span>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <span [natuSidebarItemIcon]>😀</span>
              <span [natuSidebarItemLabel]>Link 1</span>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <span [natuSidebarItemIcon]>😀</span>
              <span [natuSidebarItemLabel]>Item 1</span>
            </natu-sidebar-item>
          </natu-sidebar-footer>
        </natu-sidebar>
      `,
    };
  },
} satisfies Meta<NatuSidebarComponent>;

export default meta;
type Story = StoryObj<NatuSidebarComponent>;

export const Default: Story = {};
export const Expanded: Story = {
  args: {
    defaultIsExpanded: true,
  },
};
