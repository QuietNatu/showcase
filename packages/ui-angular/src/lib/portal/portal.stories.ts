import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NatuPortalDirective } from './portal.directive';
import { natuButtonImports } from '../directives/button/button.directive';
import { NatuPortalService } from './portal.service';

@Component({
  selector: 'natu-buttons',
  template: `<div style="display: flex; gap: 10px;">
    <button type="button" natuButton (click)="attach.emit()">Attach</button>
    <button type="button" natuButton (click)="detach.emit()">Detach</button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [natuButtonImports],
})
class ButtonsComponent {
  @Output() attach = new EventEmitter<void>();
  @Output() detach = new EventEmitter<void>();
}

@Component({
  selector: 'natu-default',
  template: `
    <natu-buttons (attach)="isVisible$.set(true)" (detach)="isVisible$.set(false)" />

    @if (isVisible$()) {
      <div *natuPortal>Example content</div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonsComponent, NatuPortalDirective],
})
class DefaultComponent {
  readonly isVisible$ = signal(false);
}

@Component({
  selector: 'natu-nested',
  template: `
    <natu-buttons (attach)="isVisible$.set(true)" (detach)="isVisible$.set(false)" />

    @if (isVisible$()) {
      <natu-nested *natuPortal />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonsComponent, NatuPortalDirective],
})
class NestedComponent {
  readonly isVisible$ = signal(false);
}

@Component({
  selector: 'natu-service-template',
  template: `
    <natu-buttons (attach)="attach()" (detach)="detach()" />

    <ng-template #portalTemplate><div>Example content</div></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonsComponent],
  providers: [NatuPortalService],
})
class ServiceTemplateComponent {
  @ViewChild('portalTemplate', { static: true }) portalTemplateRef!: TemplateRef<unknown>;

  private readonly portaService = inject(NatuPortalService);

  attach() {
    this.portaService.attachTemplate(this.portalTemplateRef);
  }

  detach() {
    this.portaService.detach();
  }
}

@Component({
  selector: 'natu-service-component-example',
  template: `<div>Example content</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
class ServiceComponentExampleComponent {}

@Component({
  selector: 'natu-service-component',
  template: `<natu-buttons (attach)="attach()" (detach)="detach()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonsComponent],
  providers: [NatuPortalService],
})
class ServiceComponentComponent {
  private readonly portaService = inject(NatuPortalService);

  attach() {
    this.portaService.attachComponent(ServiceComponentExampleComponent);
  }

  detach() {
    this.portaService.detach();
  }
}

const meta = {
  title: 'Utils/Portal',
  component: NatuPortalDirective,
  decorators: [
    moduleMetadata({
      imports: [
        DefaultComponent,
        NestedComponent,
        ServiceTemplateComponent,
        ServiceComponentComponent,
      ],
    }),
  ],
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

export const ServiceWithTemplate: Story = {
  render: (args) => {
    return {
      props: args,
      template: `<natu-service-template />`,
    };
  },
};

export const ServiceWithComponent: Story = {
  render: (args) => {
    return {
      props: args,
      template: `<natu-service-component />`,
    };
  },
};
