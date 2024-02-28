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
import { SvgIconComponent, provideSvgIcons } from '@natu/assets';
import { dnaIcon } from '@natu/assets/svg/dna';
import { maskHappyIcon } from '@natu/assets/svg/mask-happy';
import { rocketIcon } from '@natu/assets/svg/rocket';

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebarComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        provideSvgIcons([dnaIcon, maskHappyIcon, rocketIcon]),
      ],
    }),
    moduleMetadata({
      imports: [natuSidebarImports, RouterLink, RouterLinkActive, SvgIconComponent],
    }),
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
              <svg-icon [natuSidebarGroupIcon] [key]="'dna'" />
              <span [natuSidebarGroupLabel]>Group 1</span>

              <a [natu-sidebar-item] *natuSidebarItem [routerLink]="[]" [routerLinkActive]>
                <span [natuSidebarItemLabel]>Link 1</span>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemLabel]>Link 2</span>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <svg-icon [natuSidebarItemIcon] [key]="'mask-happy'" />
              <span [natuSidebarItemLabel]>Link 3</span>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <svg-icon [natuSidebarItemIcon] [key]="'rocket'" />
              <span [natuSidebarItemLabel]>Item 1</span>
            </natu-sidebar-item>
          </natu-sidebar-body>

          <natu-sidebar-footer>
            <natu-sidebar-group *natuSidebarItem>
              <svg-icon [natuSidebarGroupIcon] [key]="'dna'" />
              <span [natuSidebarGroupLabel]>Group 1</span>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemLabel]>Link 1</span>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <span [natuSidebarItemLabel]>Link 2</span>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <svg-icon [natuSidebarItemIcon] [key]="'mask-happy'" />
              <span [natuSidebarItemLabel]>Link 3</span>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <svg-icon [natuSidebarItemIcon] [key]="'rocket'" />
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
