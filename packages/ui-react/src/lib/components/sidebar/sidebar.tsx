import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { HTMLAttributes, ReactElement, ReactNode, forwardRef, useState } from 'react';
import { Except, MergeExclusive, SetOptional } from 'type-fest';
import CaretRightIcon from '@natu/assets/svg/caret-right.svg?react';
import CaretDownIcon from '@natu/assets/svg/caret-down.svg?react';
import DotsThreeVerticalIcon from '@natu/assets/svg/dots-three-vertical.svg?react';
import { NatuIcon } from '../icon/icon';
import { NatuTooltip, NatuTooltipContent, NatuTooltipTrigger } from '../tooltip/tooltip';
import {
  NatuCardPopover,
  NatuCardPopoverContent,
  NatuCardPopoverContentBody,
  NatuCardPopoverContentHeader,
  NatuCardPopoverTrigger,
} from '../card-popover/card-popover';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useControllableState } from '../../hooks';
import { mergeProps, useFocusRing } from 'react-aria';

/* TODO: docs */

export interface NatuSidebarProps extends UseSidebarOptions {
  children?: ReactNode;
  /**
   * Actions to be placed in the main navigation bar of the sidebar.
   *
   * Should be used to place most links and actions of the app.
   */
  actions?: NatuSidebarAction[];
  /**
   * Actions to be placed in the secondary navigation bar of the sidebar.
   *
   * It's purpose should be mainly for less important actions or external links to the app.
   */
  secondaryActions?: NatuSidebarAction[];
  /** Action that is currently active (ex: current active link) */
  activeAction?: string | null;
}

export type NatuSidebarAction = NatuSidebarIndividualAction | NatuSidebarGroupAction;

interface NatuSidebarIndividualAction {
  id: string;
  icon: ReactNode;
  label: ReactNode;
  /**
   * Render props to customize the item element. Item should be an either an anchor for links or a button for actions.
   *
   * @example
   * { render: (children) => <a href="/">{children}</a> }
   */
  render: (children: ReactNode) => ReactElement;
}

interface NatuSidebarGroupAction {
  id: string;
  icon: ReactNode;
  label: ReactNode;
  items: Except<NatuSidebarIndividualAction, 'icon'>[];
}

type SidebarAction = SetOptional<NatuSidebarIndividualAction, 'icon'>;

interface SidebarListProps {
  activeAction: string | null;
  isExpanded: boolean;
  items: MergeExclusive<SidebarAction, NatuSidebarGroupAction>[];
}

interface SidebarItemProps {
  isActive: boolean;
  isExpanded: boolean;
  item: SetOptional<NatuSidebarIndividualAction, 'icon'>;
}

interface SidebarGroupProps {
  activeAction: string | null;
  isExpanded: boolean;
  group: NatuSidebarGroupAction;
}

interface CollapsedSidebarGroupProps {
  activeAction: string | null;
  group: NatuSidebarGroupAction;
}

interface ExpandedSidebarGroupProps {
  activeAction: string | null;
  group: NatuSidebarGroupAction;
}

interface SidebarIconProps {
  children?: ReactNode;
}

interface SidebarLabelProps {
  children?: ReactNode;
}

interface UseSidebarOptions {
  /** Controlled expanded state. */
  isExpanded?: boolean;

  /** Default value for uncontrolled expanded state. */
  defaultIsExpanded?: boolean;

  /** Controlled expanded state handler. */
  onExpandedChange?: (isOpen: boolean) => void;
}

export function NatuSidebar(props: NatuSidebarProps) {
  const { actions = [], secondaryActions = [], activeAction = null } = props;
  const { isExpanded, onToggleExpansion } = useSidebar({
    isExpanded: props.isExpanded,
    defaultIsExpanded: props.defaultIsExpanded,
    onExpandedChange: props.onExpandedChange,
  });

  return (
    <div
      className={clsx('natu-sidebar', {
        'natu-sidebar--expanded': isExpanded,
        'natu-sidebar--collapsed': !isExpanded,
      })}
    >
      <div className="natu-sidebar__header">{props.children}</div>

      {/* TODO: add i18n once implemented  */}
      {actions.length > 0 && (
        <nav aria-label="Main">
          <SidebarList items={actions} isExpanded={isExpanded} activeAction={activeAction} />
        </nav>
      )}

      <div className="natu-sidebar__footer">
        {/* TODO: add i18n once implemented  */}
        {secondaryActions.length > 0 && (
          <nav aria-label="Secondary">
            <SidebarList
              items={secondaryActions}
              isExpanded={isExpanded}
              activeAction={activeAction}
            />
          </nav>
        )}

        <button type="button" className="natu-sidebar__toggle-button" onClick={onToggleExpansion}>
          {/* TODO: add i18n once implemented */}
          <span className="natu-visually-hidden">{isExpanded ? 'Collapse' : 'Expand'}</span>

          <NatuIcon className="natu-sidebar__toggle-button-icon" aria-hidden="true">
            <CaretRightIcon />
          </NatuIcon>
        </button>
      </div>
    </div>
  );
}

/* TODO: check rerenders */
function SidebarList(props: SidebarListProps) {
  const listItems = props.items.map((item) => (
    <li key={item.id} className="natu-sidebar__list-item">
      {item.items ? (
        <SidebarGroup
          group={item}
          isExpanded={props.isExpanded}
          activeAction={props.activeAction}
        />
      ) : (
        <SidebarItem
          item={item}
          isExpanded={props.isExpanded}
          isActive={props.activeAction === item.id}
        />
      )}
    </li>
  ));

  return <ul className="natu-sidebar__list">{listItems}</ul>;
}

function SidebarItem(props: SidebarItemProps) {
  const { item, isExpanded, isActive } = props;

  return (
    <NatuTooltip isDisabled={isExpanded} placement="right">
      <NatuTooltipTrigger>
        {/* This must be a render prop, if it was a component it would require it's ref to be forwarded. */}
        {/* TODO: check if this is not needed with React 19 ref changes */}
        <SidebarItemTrigger className={clsx({ 'natu-sidebar__item--active': isActive })}>
          {item.render(
            <>
              {item.icon && <SidebarIcon>{item.icon}</SidebarIcon>}
              <SidebarLabel>{item.label}</SidebarLabel>
            </>,
          )}
        </SidebarItemTrigger>
      </NatuTooltipTrigger>

      <NatuTooltipContent>{item.label}</NatuTooltipContent>
    </NatuTooltip>
  );
}

const SidebarItemTrigger = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function SidebarItemTrigger(props, forwardedRef) {
    const { focusProps, isFocusVisible } = useFocusRing({ autoFocus: true });

    return (
      <Slot
        ref={forwardedRef}
        {...mergeProps(props, focusProps)}
        className={clsx(
          'natu-sidebar__item',
          { 'natu-sidebar__item--focus': isFocusVisible },
          props.className,
        )}
      >
        {props.children}
      </Slot>
    );
  },
);

function SidebarGroup(props: SidebarGroupProps) {
  const Group = props.isExpanded ? ExpandedSidebarGroup : CollapsedSidebarGroup;
  return <Group group={props.group} activeAction={props.activeAction} />;
}

function CollapsedSidebarGroup(props: CollapsedSidebarGroupProps) {
  const { group, activeAction } = props;
  const { isPopoverOpen, onPopoverOpenChange } = useSidebarCollapsedGroup();

  return (
    <NatuCardPopover placement="right" isOpen={isPopoverOpen} onOpenChange={onPopoverOpenChange}>
      <NatuTooltip isDisabled={isPopoverOpen} placement="right">
        <NatuCardPopoverTrigger>
          <NatuTooltipTrigger>
            <SidebarItemTrigger>
              <button type="button">
                <SidebarIcon>{group.icon}</SidebarIcon>
                <SidebarLabel>{group.label}</SidebarLabel>

                <NatuIcon className="natu-sidebar__item-collapsed-group-icon" aria-hidden="true">
                  <DotsThreeVerticalIcon />
                </NatuIcon>
              </button>
            </SidebarItemTrigger>
          </NatuTooltipTrigger>
        </NatuCardPopoverTrigger>

        <NatuTooltipContent>{group.label}</NatuTooltipContent>
      </NatuTooltip>

      <NatuCardPopoverContent>
        <NatuCardPopoverContentHeader>{group.label}</NatuCardPopoverContentHeader>
        <NatuCardPopoverContentBody className="natu-sidebar__popover">
          <SidebarList items={group.items} isExpanded={true} activeAction={activeAction} />
        </NatuCardPopoverContentBody>
      </NatuCardPopoverContent>
    </NatuCardPopover>
  );
}

function ExpandedSidebarGroup(props: ExpandedSidebarGroupProps) {
  const { group, activeAction } = props;
  const { isGroupOpen, onGroupOpenChange } = useSidebarExpandedGroup();

  return (
    <Collapsible.Root
      className={clsx('natu-sidebar__group', {
        'natu-sidebar__group--expanded': isGroupOpen,
        'natu-sidebar__group--collapsed': !isGroupOpen,
      })}
      open={isGroupOpen}
      onOpenChange={onGroupOpenChange}
    >
      <SidebarItemTrigger>
        <Collapsible.Trigger>
          <SidebarIcon>{group.icon}</SidebarIcon>
          <SidebarLabel>{group.label}</SidebarLabel>

          <span className="natu-sidebar__item-group-icon-area" aria-hidden="true">
            <NatuIcon className="natu-sidebar__item-group-icon">
              <CaretDownIcon />
            </NatuIcon>
          </span>
        </Collapsible.Trigger>
      </SidebarItemTrigger>

      <Collapsible.Content className="natu-sidebar__group-content">
        <SidebarList items={group.items} isExpanded={true} activeAction={activeAction} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function SidebarIcon(props: SidebarIconProps) {
  return (
    <Slot className="natu-sidebar__item-icon" aria-hidden="true">
      {props.children}
    </Slot>
  );
}

function SidebarLabel(props: SidebarLabelProps) {
  return <div className="natu-sidebar__item-label">{props.children}</div>;
}

function useSidebar(options: UseSidebarOptions) {
  const [isExpanded, setIsExpanded] = useControllableState({
    value: options.isExpanded,
    defaultValue: options.defaultIsExpanded,
    finalValue: false,
    onChange: options.onExpandedChange,
  });

  const handleToggleExpansion = () => setIsExpanded((isExpanded) => !isExpanded);

  return { isExpanded, onToggleExpansion: handleToggleExpansion };
}

function useSidebarCollapsedGroup() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return { isPopoverOpen, onPopoverOpenChange: setIsPopoverOpen };
}

function useSidebarExpandedGroup() {
  const [isGroupOpen, setIsGroupOpen] = useState(false);

  return { isGroupOpen: isGroupOpen, onGroupOpenChange: setIsGroupOpen };
}
