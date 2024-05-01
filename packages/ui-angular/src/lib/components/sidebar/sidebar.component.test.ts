import { argsToTemplate } from '@storybook/angular';
import { axe, render } from '../../test';
import { NatuSidebarComponent, natuSidebarImports } from './sidebar.component';
import { screen, within } from '@testing-library/angular';

describe(`${NatuSidebarComponent.name} accessibility`, () => {
  const scenarios = [
    { name: 'Collapsed', args: { defaultIsExpanded: false } },
    { name: 'Expanded', args: { defaultIsExpanded: true } },
  ];

  scenarios.forEach(({ name, args }) => {
    it(`${name} has no accessibility violations`, async () => {
      const view = await setup(args);

      expect(await axe(view.container)).toHaveNoViolations();
    });
  });
});

describe(NatuSidebarComponent.name, () => {
  it('is not expanded by default', async () => {
    await setup();

    expect(screen.getByRole('button', { name: 'Expand' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
  });

  it('expands sidebar when button is clicked', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Expand' }));

    expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).toHaveBeenCalledOnceWith(true);
  });

  it('collapses sidebar when button is clicked', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup();

    await userEvent.click(screen.getByRole('button', { name: 'Expand' }));
    await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    expect(await screen.findByRole('button', { name: 'Expand' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).toHaveBeenCalledTimes(2);
    expect(isExpandedChangeSpy.calls.argsFor(1)).toEqual([false]);
  });

  it('controls default sidebar expansion', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup({ defaultIsExpanded: true });

    expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    expect(await screen.findByRole('button', { name: 'Expand' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
    expect(isExpandedChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('controls sidebar expansion', async () => {
    const { userEvent, isExpandedChangeSpy } = await setup({ isExpanded: true });

    expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

    expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
    expect(isExpandedChangeSpy).toHaveBeenCalledOnceWith(false);
  });

  it('shows subgroup items when a group is clicked in collapsed sidebar', async () => {
    const { userEvent } = await setup();

    await userEvent.click(await screen.findByRole('button', { name: 'Patients' }));

    const popover = await screen.findByRole('dialog');

    expect(popover).toBeInTheDocument();
    expect(await within(popover).findByText('Patients')).toBeInTheDocument();
    expect(await within(popover).findByRole('link', { name: 'General Info' })).toBeInTheDocument();
  });

  it('shows subgroup items when a group is clicked in expanded sidebar', async () => {
    const { userEvent } = await setup({ isExpanded: true });

    await userEvent.click(await screen.findByRole('button', { name: 'Patients' }));

    const region = await screen.findByRole('region', { name: 'Patients' });

    expect(region).toBeInTheDocument();
    expect(await within(region).findByRole('link', { name: 'General Info' })).toBeInTheDocument();
  });
});

async function setup(args: Partial<NatuSidebarComponent> = {}) {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const isExpandedChangeSpy = jasmine.createSpy();

  const componentProperties = {
    ...args,
    isExpandedChange: isExpandedChangeSpy,
  };

  const templateArgs = argsToTemplate(componentProperties);

  const view = await render(
    `
      <natu-sidebar ${templateArgs}>
        <natu-sidebar-header>Example header</natu-sidebar-header>

        <natu-sidebar-actions>
          <natu-sidebar-group *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Patients</ng-template>

            <a natu-sidebar-item *natuSidebarItem href="">
              <ng-template natuSidebarLabel>General Info</ng-template>
            </a>

            <a natu-sidebar-item *natuSidebarItem href="">
              <ng-template natuSidebarLabel>Records</ng-template>
            </a>
          </natu-sidebar-group>

          <button type="button" natu-sidebar-item *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Activities</ng-template>
          </button>
        </natu-sidebar-actions>

        <natu-sidebar-secondary-actions>
          <button type="button" natu-sidebar-item *natuSidebarItem>
            <span *natuSidebarIcon>🧪</span>
            <ng-template natuSidebarLabel>Activities</ng-template>
          </button>
        </natu-sidebar-secondary-actions>
      </natu-sidebar>
    `,
    {
      renderOptions: {
        imports: [natuSidebarImports],
        componentProperties,
      },
    },
  );

  return { ...view, isExpandedChangeSpy };
}
