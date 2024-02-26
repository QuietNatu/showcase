import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NatuSidebarComponent, natuSidebarImports } from './sidebar.component';

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebarComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [natuSidebarImports] })],
  render: (args) => {
    const templateArgs = argsToTemplate(args);

    return {
      props: args,
      template: `
        <natu-sidebar ${templateArgs}>
          <natu-sidebar-header>Example header</natu-sidebar-header>

          <natu-sidebar-body>
            <natu-sidebar-group *natuSidebarItem>
              <natu-sidebar-group-label>
                <a [natu-sidebar-item] href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 1</span>
                </a>
              </natu-sidebar-group-label>

              <natu-sidebar-group-list>
                <a [natu-sidebar-item] *natuSidebarItem href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 2</span>
                </a>

                <a [natu-sidebar-item] *natuSidebarItem href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 3</span>
                </a>
              </natu-sidebar-group-list>
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
              <natu-sidebar-group-label>
                <a [natu-sidebar-item] href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 1</span>
                </a>
              </natu-sidebar-group-label>

              <natu-sidebar-group-list>
                <a [natu-sidebar-item] *natuSidebarItem href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 2</span>
                </a>

                <a [natu-sidebar-item] *natuSidebarItem href="">
                  <span [natuSidebarItemIcon]>😀</span>
                  <span [natuSidebarItemLabel]>Link 3</span>
                </a>
              </natu-sidebar-group-list>
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
