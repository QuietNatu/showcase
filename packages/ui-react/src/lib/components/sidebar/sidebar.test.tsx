import { composeStories } from '@storybook/react';
import { axe } from '../../test';
import { render, renderStory } from '../../../test/render';
import * as stories from './sidebar.stories';
import { NatuSidebar, NatuSidebarAction, NatuSidebarProps } from './sidebar';
import { NatuIcon } from '../icon/icon';
import { screen, within } from '@testing-library/react';

const storyTestCases = Object.entries(composeStories(stories));

test.each(storyTestCases)('renders %s story', (_, Story) => {
  const { container } = renderStory(<Story />);

  expect(container).toBeInTheDocument();
});

test.each(storyTestCases)('%s has no accessibility violations', async (_, Story) => {
  const { baseElement } = renderStory(<Story />);

  expect(await axe(baseElement)).toHaveNoViolations();
});

test('is not expanded by default', () => {
  setup();

  expect(screen.getByRole('button', { name: 'Expand' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
});

test('expands sidebar when button is clicked', async () => {
  const { userEvent, onExpandedChangeSpy } = setup();

  await userEvent.click(screen.getByRole('button', { name: 'Expand' }));

  expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();
  expect(onExpandedChangeSpy).toHaveBeenCalledTimes(1);
  expect(onExpandedChangeSpy).toHaveBeenLastCalledWith(true);
});

test('collapses sidebar when button is clicked', async () => {
  const { userEvent, onExpandedChangeSpy } = setup();

  await userEvent.click(screen.getByRole('button', { name: 'Expand' }));
  await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

  expect(await screen.findByRole('button', { name: 'Expand' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
  expect(onExpandedChangeSpy).toHaveBeenCalledTimes(2);
  expect(onExpandedChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls default sidebar expansion', async () => {
  const { userEvent, onExpandedChangeSpy } = setup({ defaultIsExpanded: true });

  expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

  expect(await screen.findByRole('button', { name: 'Expand' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Collapse' })).not.toBeInTheDocument();
  expect(onExpandedChangeSpy).toHaveBeenCalledTimes(1);
  expect(onExpandedChangeSpy).toHaveBeenLastCalledWith(false);
});

test('controls sidebar expansion', async () => {
  const { userEvent, onExpandedChangeSpy } = setup({ isExpanded: true });

  expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Expand' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Collapse' }));

  expect(await screen.findByRole('button', { name: 'Collapse' })).toBeInTheDocument();
  expect(onExpandedChangeSpy).toHaveBeenCalledTimes(1);
  expect(onExpandedChangeSpy).toHaveBeenLastCalledWith(false);
});

test('shows subgroup items when a group is clicked in collapsed sidebar', async () => {
  const { userEvent } = setup();

  await userEvent.click(await screen.findByRole('button', { name: 'Patients' }));

  const popover = await screen.findByRole('dialog', { name: 'Patients' });

  expect(popover).toBeInTheDocument();
  expect(await within(popover).findByRole('link', { name: 'General Info' })).toBeInTheDocument();
});

test('shows subgroup items when a group is clicked in expanded sidebar', async () => {
  const { userEvent } = setup({ isExpanded: true });

  await userEvent.click(await screen.findByRole('button', { name: 'Patients' }));

  expect(await screen.findByRole('link', { name: 'General Info' })).toBeInTheDocument();
});

function setup(props: Partial<NatuSidebarProps> = {}) {
  const onExpandedChangeSpy = vi.fn();

  const actions: NatuSidebarAction[] = [
    {
      id: 'patients',
      label: 'Patients',
      icon: <NatuIcon>🧪</NatuIcon>,
      items: [
        {
          id: 'patients/general-info',
          label: 'General Info',
          render: (children) => <a href="/">{children}</a>,
        },
        {
          id: 'patients/records',
          label: 'Records',
          render: (children) => <a href="/">{children}</a>,
        },
      ],
    },
    {
      id: 'culture',
      label: 'Culture',
      icon: <NatuIcon>🧪</NatuIcon>,
      render: (children) => <a href="/">{children}</a>,
    },
    {
      id: 'activities',
      label: 'Activities',
      icon: <NatuIcon>🧪</NatuIcon>,
      render: (children) => <button type="button">{children}</button>,
    },
  ];

  const secondaryActions: NatuSidebarAction[] = [
    {
      id: 'staff',
      label: 'Staff',
      icon: <NatuIcon>🧪</NatuIcon>,
      items: [
        {
          id: 'staff/general-info',
          label: 'General Info',
          render: (children) => <a href="/">{children}</a>,
        },
        {
          id: 'staff/records',
          label: 'Records',
          render: (children) => <a href="/">{children}</a>,
        },
      ],
    },
    {
      id: 'culture2',
      label: 'Culture',
      icon: <NatuIcon>🧪</NatuIcon>,
      render: (children) => <a href="/">{children}</a>,
    },
    {
      id: 'activities2',
      label: 'Activities',
      icon: <NatuIcon>🧪</NatuIcon>,
      render: (children) => <button type="button">{children}</button>,
    },
  ];

  const view = render(
    <NatuSidebar
      actions={actions}
      secondaryActions={secondaryActions}
      {...props}
      onExpandedChange={onExpandedChangeSpy}
    />,
  );

  return { ...view, onExpandedChangeSpy };
}
