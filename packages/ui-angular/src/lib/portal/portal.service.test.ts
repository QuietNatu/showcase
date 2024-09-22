import { screen, within } from '@testing-library/angular';
import { NatuPortalService } from './portal.service';
import { render } from '../test';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  effect,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

describe(NatuPortalService.name, () => {
  describe('template', () => {
    @Component({
      selector: 'natu-test-template',
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      providers: [NatuPortalService],
      template: `<ng-template #template>{{ text() }}</ng-template>`,
    })
    class TestTemplateComponent {
      readonly text = input.required<string>();
      readonly template = viewChild<TemplateRef<unknown>>('template');

      private readonly portalService = inject(NatuPortalService);

      constructor() {
        effect((onCleanup) => {
          const template = this.template();

          if (template) {
            untracked(() => {
              this.portalService.attachTemplate(template);
            });

            onCleanup(() => {
              untracked(() => {
                this.portalService.detach();
              });
            });
          }
        });
      }
    }

    @Component({
      selector: 'natu-test-nested-template',
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [TestTemplateComponent],
      providers: [NatuPortalService],
      template: `
        <ng-template #template>
          <div>Example content</div>
          <natu-test-template [text]="'Nested content'" />
        </ng-template>
      `,
    })
    class TestNestedTemplateComponent {
      readonly template = viewChild<TemplateRef<unknown>>('template');

      private readonly portalService = inject(NatuPortalService);

      constructor() {
        effect((onCleanup) => {
          const template = this.template();

          if (template) {
            untracked(() => {
              this.portalService.attachTemplate(template);
            });

            onCleanup(() => {
              untracked(() => {
                this.portalService.detach();
              });
            });
          }
        });
      }
    }

    it('renders template portal content', async () => {
      await render(TestTemplateComponent, {
        renderOptions: { componentInputs: { text: 'Example content' } },
      });

      expect(screen.getByText('Example content')).toBeInTheDocument();
    });

    it('attaches template portal to document body by default', async () => {
      await render(TestTemplateComponent, {
        renderOptions: { componentInputs: { text: 'Example content' } },
      });

      // eslint-disable-next-line testing-library/no-node-access
      const portal = document.body.lastChild as HTMLElement;

      expect(portal.tagName).toBe('NATU-PORTAL');
      expect(within(portal).getByText('Example content')).toBeInTheDocument();
    });

    it('attaches nested template portals to parent portal', async () => {
      await render(TestNestedTemplateComponent);

      // eslint-disable-next-line testing-library/no-node-access
      const parentElement = document.body.lastChild as HTMLElement;
      // eslint-disable-next-line testing-library/no-node-access
      const childElement = parentElement.lastChild as HTMLElement;

      expect(childElement.tagName).toBe('NATU-PORTAL');
      expect(parentElement.tagName).toBe('NATU-PORTAL');
      expect(within(childElement).getByText('Nested content')).toBeInTheDocument();
      expect(within(parentElement).getByText('Example content')).toBeInTheDocument();
    });
  });

  describe('component', () => {
    @Component({
      selector: 'natu-test-component',
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      providers: [NatuPortalService],
      template: ``,
    })
    class TestComponentComponent {
      readonly component = input.required<ComponentType<unknown>>();

      private readonly portalService = inject(NatuPortalService);

      constructor() {
        effect((onCleanup) => {
          const component = this.component();
          untracked(() => {
            this.portalService.attachComponent(component);
          });

          onCleanup(() => {
            untracked(() => {
              this.portalService.detach();
            });
          });
        });
      }
    }

    it('renders component portal content', async () => {
      @Component({
        selector: 'natu-test-content',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        template: `Example content`,
      })
      class TestContentComponent {}

      await render(TestComponentComponent, {
        renderOptions: { componentInputs: { component: TestContentComponent } },
      });

      expect(screen.getByText('Example content')).toBeInTheDocument();
    });

    it('attaches component portal to document body by default', async () => {
      @Component({
        selector: 'natu-test-content',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        template: `Example content`,
      })
      class TestContentComponent {}

      await render(TestComponentComponent, {
        renderOptions: { componentInputs: { component: TestContentComponent } },
      });

      // eslint-disable-next-line testing-library/no-node-access
      const portal = document.body.lastChild as HTMLElement;

      expect(portal.tagName).toBe('NATU-PORTAL');
      expect(within(portal).getByText('Example content')).toBeInTheDocument();
    });

    it('attaches nested component portals to parent portal', async () => {
      @Component({
        selector: 'natu-test-nested-content',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        template: `Nested content`,
      })
      class TestNestedContentComponent {}

      @Component({
        selector: 'natu-test-content',
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [TestComponentComponent],
        template: `
          <div>Example content</div>
          <natu-test-component [component]="component" />
        `,
      })
      class TestContentComponent {
        readonly component = TestNestedContentComponent;
      }

      await render(TestComponentComponent, {
        renderOptions: { componentInputs: { component: TestContentComponent } },
      });

      // eslint-disable-next-line testing-library/no-node-access
      const parentElement = document.body.lastChild as HTMLElement;
      // eslint-disable-next-line testing-library/no-node-access
      const childElement = parentElement.lastChild as HTMLElement;

      expect(childElement.tagName).toBe('NATU-PORTAL');
      expect(parentElement.tagName).toBe('NATU-PORTAL');
      expect(within(childElement).getByText('Nested content')).toBeInTheDocument();
      expect(within(parentElement).getByText('Example content')).toBeInTheDocument();
    });
  });
});
