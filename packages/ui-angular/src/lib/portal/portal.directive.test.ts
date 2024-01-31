import { screen, within } from '@testing-library/angular';
import { render } from '../test';
import { NatuPortalDirective } from './portal.directive';

describe(NatuPortalDirective.name, () => {
  it('renders portal content', async () => {
    await setup();

    expect(screen.getByText('Example content')).toBeInTheDocument();
  });

  it('attaches portal to document body by default', async () => {
    await setup();

    // eslint-disable-next-line testing-library/no-node-access
    const portal = document.body.lastChild as HTMLElement;

    expect(portal.tagName).toBe('NATU-PORTAL');
    expect(within(portal).getByText('Example content')).toBeInTheDocument();
  });

  it('attaches nested portals to parent portal', async () => {
    await setupNested();

    // eslint-disable-next-line testing-library/no-node-access
    const parentElement = document.body.lastChild as HTMLElement;
    // eslint-disable-next-line testing-library/no-node-access
    const childElement = parentElement.lastChild as HTMLElement;

    expect(childElement.tagName).toBe('NATU-PORTAL');
    expect(parentElement.tagName).toBe('NATU-PORTAL');
    expect(within(childElement).getByText('Nested content')).toBeInTheDocument();
    expect(within(parentElement).getByText('Example content')).toBeInTheDocument();
  });

  function setup() {
    return render(`<div *natuPortal>Example content</div>`, {
      renderOptions: {
        imports: [NatuPortalDirective],
      },
    });
  }

  function setupNested() {
    return render(
      `
      <div *natuPortal>
        <div>Example content</div>
        <div *natuPortal>Nested content</div>
      </div>`,
      {
        renderOptions: {
          imports: [NatuPortalDirective],
        },
      },
    );
  }
});
