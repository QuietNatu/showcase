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

/* TODO: active item */

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
    componentWrapperDecorator((story) => `<div style="height: 500px">${story}</div>`),
  ],
  render: (args) => {
    const templateArgs = argsToTemplate(args);

    return {
      props: args,
      template: `
        <natu-sidebar ${templateArgs}>
          <natu-sidebar-header>
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Example header</div>
          </natu-sidebar-header>

          <natu-sidebar-actions>
            <natu-sidebar-group *natuSidebarItem>
              <svg-icon *natuSidebarIcon [key]="'dna'" />
              <ng-template natuSidebarLabel>Group 1</ng-template>

              <a [natu-sidebar-item] *natuSidebarItem [routerLink]="[]" [routerLinkActive]>
                <ng-template natuSidebarLabel>Link 1</ng-template>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <ng-template natuSidebarLabel>Link 2</ng-template>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <svg-icon *natuSidebarIcon [key]="'mask-happy'" />
              <ng-template natuSidebarLabel>Link 3</ng-template>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <svg-icon *natuSidebarIcon [key]="'rocket'" />
              <ng-template natuSidebarLabel>Item 1</ng-template>
            </natu-sidebar-item>
          </natu-sidebar-actions>

          <natu-sidebar-secondary-actions>
            <natu-sidebar-group *natuSidebarItem>
              <svg-icon *natuSidebarIcon [key]="'dna'" />
              <ng-template natuSidebarLabel>Group 1</ng-template>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <ng-template natuSidebarLabel>Link 1</ng-template>
              </a>

              <a [natu-sidebar-item] *natuSidebarItem href="">
                <ng-template natuSidebarLabel>Link 2</ng-template>
              </a>
            </natu-sidebar-group>

            <a [natu-sidebar-item] *natuSidebarItem href="">
              <svg-icon *natuSidebarIcon [key]="'mask-happy'" />
              <ng-template natuSidebarLabel>Link 3</ng-template>
            </a>

            <natu-sidebar-item *natuSidebarItem>
              <svg-icon *natuSidebarIcon [key]="'rocket'" />
              <ng-template natuSidebarLabel>Item 1</ng-template>
            </natu-sidebar-item>
          </natu-sidebar-secondary-actions>
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
