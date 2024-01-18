import { type Meta, type StoryObj } from '@storybook/angular';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NatuPortalService } from '../../directives/portal/portal.service';
import { NatuPortalDirective } from './portal.directive';
import { natuButtonImports } from '../../components/button/button.directive';

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
      <button type="button" natuButton (click)="attach()">Attach</button>
      <button type="button" natuButton (click)="detach()">Detach</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports],
  providers: [NatuPortalService],
})
class NatuDefaultComponent {
  private readonly portalService = inject(NatuPortalService);

  attach() {
    this.portalService.attach(NatuPortalContentComponent);
  }

  detach() {
    this.portalService.detach();
  }
}

@Component({
  selector: 'natu-nested',
  template: `
    <div style="display: flex; gap: 10px;">
      <button type="button" natuButton (click)="attach()">Attach</button>
      <button type="button" natuButton (click)="detach()">Detach</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports],
  providers: [NatuPortalService],
})
export class NatuNestedComponent {
  private readonly portalService = inject(NatuPortalService);

  attach() {
    this.portalService.attach(NatuNestedComponent);
  }

  detach() {
    this.portalService.detach();
  }
}

const meta = {
  title: 'Directives/Portal',
  component: NatuPortalDirective,
  tags: ['autodocs'],
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
      moduleMetadata: { imports: [NatuDefaultComponent] },
      template: `<natu-default />`,
    };
  },
};

export const Nested: Story = {
  render: (args) => {
    return {
      props: args,
      moduleMetadata: { imports: [NatuNestedComponent] },
      template: `<natu-nested />`,
    };
  },
};
