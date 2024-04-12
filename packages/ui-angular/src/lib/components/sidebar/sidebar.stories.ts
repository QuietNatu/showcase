import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  componentWrapperDecorator,
  applicationConfig,
} from '@storybook/angular';
import { NatuSidebarComponent, natuSidebarImports } from './sidebar.component';
import { Route, Router, RouterLink, RouterLinkActive, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { SvgIconComponent, provideSvgIcons } from '@natu/assets';
import { dnaIcon } from '@natu/assets/svg/dna';
import { maskHappyIcon } from '@natu/assets/svg/mask-happy';
import { rocketIcon } from '@natu/assets/svg/rocket';
import { NatuTestComponent } from '../../test';
import { onStoryInitDecorator } from '../../stories';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'natu-sidebar-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuSidebarImports, RouterLink, RouterLinkActive, SvgIconComponent],
  template: `
    <natu-sidebar [defaultIsExpanded]="defaultIsExpanded">
      <natu-sidebar-header>
        <div
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 0.5rem"
        >
          Example header
        </div>
      </natu-sidebar-header>

      <natu-sidebar-actions>
        <natu-sidebar-group *natuSidebarItem>
          <svg-icon *natuSidebarIcon [key]="'dna'" />
          <ng-template natuSidebarLabel>Patients</ng-template>

          <a natu-sidebar-item *natuSidebarItem href="">
            <ng-template natuSidebarLabel>General Info</ng-template>
          </a>

          <a natu-sidebar-item *natuSidebarItem href="">
            <ng-template natuSidebarLabel>Records</ng-template>
          </a>
        </natu-sidebar-group>

        <a
          natu-sidebar-item
          *natuSidebarItem
          [isActive]="activeItem() === 'culture'"
          [routerLink]="['/culture']"
          routerLinkActive
          (isActiveChange)="activeItem.set($event ? 'culture' : null)"
        >
          <svg-icon *natuSidebarIcon [key]="'mask-happy'" />
          <ng-template natuSidebarLabel>Culture</ng-template>
        </a>

        <natu-sidebar-item *natuSidebarItem>
          <svg-icon *natuSidebarIcon [key]="'rocket'" />
          <ng-template natuSidebarLabel>Activities</ng-template>
        </natu-sidebar-item>
      </natu-sidebar-actions>

      <natu-sidebar-secondary-actions>
        <natu-sidebar-group *natuSidebarItem>
          <svg-icon *natuSidebarIcon [key]="'dna'" />
          <ng-template natuSidebarLabel>Staff</ng-template>

          <a natu-sidebar-item *natuSidebarItem href="">
            <ng-template natuSidebarLabel>General Info</ng-template>
          </a>

          <a natu-sidebar-item *natuSidebarItem href="">
            <ng-template natuSidebarLabel>Records</ng-template>
          </a>
        </natu-sidebar-group>

        <a natu-sidebar-item *natuSidebarItem href="">
          <svg-icon *natuSidebarIcon [key]="'mask-happy'" />
          <ng-template natuSidebarLabel>Culture</ng-template>
        </a>

        <natu-sidebar-item *natuSidebarItem>
          <svg-icon *natuSidebarIcon [key]="'rocket'" />
          <ng-template natuSidebarLabel>Activities</ng-template>
        </natu-sidebar-item>
      </natu-sidebar-secondary-actions>
    </natu-sidebar>
  `,
})
class NatuSidebarStoryComponent {
  @Input() defaultIsExpanded?: boolean;

  readonly activeItem = signal<string | null>(null);
}

const routes: Route[] = [
  { path: 'patients/info', component: NatuTestComponent },
  { path: 'patients/records', component: NatuTestComponent },
  { path: 'culture', component: NatuTestComponent },
];

const meta = {
  title: 'Components/Sidebar',
  component: NatuSidebarStoryComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter(routes),
        provideLocationMocks(),
        provideSvgIcons([dnaIcon, maskHappyIcon, rocketIcon]),
      ],
    }),
    moduleMetadata({
      imports: [natuSidebarImports, RouterLink, RouterLinkActive, SvgIconComponent],
    }),
    componentWrapperDecorator((story) => `<div style="height: 500px">${story}</div>`),
  ],
} satisfies Meta<NatuSidebarComponent>;

export default meta;
type Story = StoryObj<NatuSidebarComponent>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    defaultIsExpanded: true,
  },
};

export const Active: Story = {
  decorators: [onStoryInitDecorator((injector) => injector.get(Router).navigate(['/culture']))],
};

export const ActiveExpanded: Story = {
  ...Active,

  args: {
    defaultIsExpanded: true,
  },
};
