import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NatuPortalDirective } from './portal.directive';
import { natuButtonImports } from '../directives/button/button.directive';

@Component({
  selector: 'natu-portal-content',
  template: `<div>Example content</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NatuPortalContentComponent {}

@Component({
  selector: 'natu-default',
  template: `
    <div style="display: flex; gap: 10px;">
      <button type="button" natuButton (click)="isVisible$.set(true)">Attach</button>
      <button type="button" natuButton (click)="isVisible$.set(false)">Detach</button>
    </div>

    @if (isVisible$()) {
      <div *natuPortal>Example content</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, NatuPortalDirective],
})
class NatuDefaultComponent {
  readonly isVisible$ = signal(false);
}

@Component({
  selector: 'natu-nested',
  template: `
    <div style="display: flex; gap: 10px;">
      <button type="button" natuButton (click)="isVisible$.set(true)">Attach</button>
      <button type="button" natuButton (click)="isVisible$.set(false)">Detach</button>
    </div>

    @if (isVisible$()) {
      <natu-nested *natuPortal />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports, NatuPortalDirective],
})
class NatuNestedComponent {
  readonly isVisible$ = signal(false);
}

const meta = {
  title: 'Utils/Portal',
  component: NatuPortalDirective,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [NatuDefaultComponent, NatuNestedComponent] })],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<NatuPortalDirective>;

export default meta;
type Story = StoryObj<NatuPortalDirective>;

export const Default: Story = {
  render: (args) => {
    return {
      props: args,
      template: `<natu-default />`,
    };
  },
};

export const Nested: Story = {
  render: (args) => {
    return {
      props: args,
      template: `<natu-nested />`,
    };
  },
};
