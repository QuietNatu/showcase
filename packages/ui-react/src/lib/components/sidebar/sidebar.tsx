import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ReactElement, ReactNode, useState } from 'react';
import { Except, MergeExclusive } from 'type-fest';
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

/* TODO: docs */
export type NatuSidebarAction = NatuSidebarIndividualAction | NatuSidebarGroupAction;

interface NatuSidebarIndividualAction {
  icon: ReactNode;
  label: ReactNode;
  // TODO: warn that element used must have forward ref
  render: (props: RenderItemProps) => ReactElement;
}

interface NatuSidebarGroupAction {
  icon: ReactNode;
  label: ReactNode;
  items: Except<NatuSidebarIndividualAction, 'icon'>[];
}

interface RenderItemProps {
  children: ReactNode;
  className: string;
}

export interface NatuSidebarProps {
  children?: ReactNode;
  actions?: NatuSidebarAction[];
  secondaryActions?: NatuSidebarAction[];
}

interface SidebarListProps {
  isSidebarExpanded: boolean;
  items: MergeExclusive<NatuSidebarIndividualAction, NatuSidebarGroupAction>[];
}

interface SidebarItemProps {
  isSidebarExpanded: boolean;
  item: NatuSidebarIndividualAction;
}

interface SidebarGroupProps {
  isSidebarExpanded: boolean;
  group: NatuSidebarGroupAction;
}

interface CollapsedSidebarGroupProps {
  group: NatuSidebarGroupAction;
}

interface ExpandedSidebarGroupProps {
  group: NatuSidebarGroupAction;
}

interface SidebarIconProps {
  children?: ReactNode;
}

interface SidebarLabelProps {
  children?: ReactNode;
}

export function NatuSidebar(props: NatuSidebarProps) {
  const { actions = [], secondaryActions = [] } = props;

  const { isExpanded, onToggleExpansion } = useSidebar();

  return (
    <div
      className={clsx('natu-sidebar', {
        'natu-sidebar--expanded': isExpanded,
        'natu-sidebar--collapsed': !isExpanded,
      })}
    >
      <div>{props.children}</div>

      {/* TODO: add i18n once implemented  */}
      {actions.length > 0 && (
        <nav aria-label="Main">
          <SidebarList items={actions} isSidebarExpanded={isExpanded} />
        </nav>
      )}

      <div className="natu-sidebar__footer">
        {/* TODO: add i18n once implemented  */}
        {secondaryActions.length > 0 && (
          <nav aria-label="Secondary">
            <SidebarList items={secondaryActions} isSidebarExpanded={isExpanded} />
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
  const listItems = props.items.map((item, index) => (
    <li key={index} className="natu-sidebar__list-item">
      {item.items ? (
        <SidebarGroup group={item} isSidebarExpanded={props.isSidebarExpanded} />
      ) : (
        <SidebarItem item={item} isSidebarExpanded={props.isSidebarExpanded} />
      )}
    </li>
  ));

  return <ul className="natu-sidebar__list">{listItems}</ul>;
}

function SidebarItem(props: SidebarItemProps) {
  const { item, isSidebarExpanded } = props;

  return (
    <NatuTooltip isDisabled={isSidebarExpanded} placement="right">
      <NatuTooltipTrigger>
        {/* This must be a render prop, if it was a component it would require it's ref to be forwarded */}
        {item.render({
          className: 'natu-sidebar__item',
          children: (
            <>
              <SidebarIcon>{item.icon}</SidebarIcon>
              <SidebarLabel>{item.label}</SidebarLabel>
            </>
          ),
        })}
      </NatuTooltipTrigger>

      <NatuTooltipContent>{item.label}</NatuTooltipContent>
    </NatuTooltip>
  );
}

export function SidebarGroup(props: SidebarGroupProps) {
  return props.isSidebarExpanded ? (
    <ExpandedSidebarGroup group={props.group} />
  ) : (
    <CollapsedSidebarGroup group={props.group} />
  );
}

function CollapsedSidebarGroup(props: CollapsedSidebarGroupProps) {
  const { group } = props;

  const { isPopoverOpen, onPopoverOpenChange } = useSidebarCollapsedGroup();

  return (
    <NatuCardPopover placement="right" isOpen={isPopoverOpen} onOpenChange={onPopoverOpenChange}>
      <NatuTooltip isDisabled={isPopoverOpen} placement="right">
        <NatuCardPopoverTrigger>
          <NatuTooltipTrigger>
            {/* TODO: base button headless component with just functionality? */}
            <button type="button" className="natu-sidebar__item">
              <SidebarIcon>{group.icon}</SidebarIcon>
              <SidebarLabel>{group.label}</SidebarLabel>

              <NatuIcon className="natu-sidebar__item-collapsed-group-icon" aria-hidden="true">
                <DotsThreeVerticalIcon />
              </NatuIcon>
            </button>
          </NatuTooltipTrigger>
        </NatuCardPopoverTrigger>

        <NatuTooltipContent>{group.label}</NatuTooltipContent>
      </NatuTooltip>

      <NatuCardPopoverContent>
        <NatuCardPopoverContentHeader>Header</NatuCardPopoverContentHeader>
        <NatuCardPopoverContentBody>Body</NatuCardPopoverContentBody>
      </NatuCardPopoverContent>
    </NatuCardPopover>
  );
}

function ExpandedSidebarGroup(props: ExpandedSidebarGroupProps) {
  const { group } = props;

  return (
    <>
      <button type="button" className="natu-sidebar__item">
        <SidebarIcon>{group.icon}</SidebarIcon>
        <SidebarLabel>{group.label}</SidebarLabel>

        <span className="natu-sidebar__item-group-icon-area" aria-hidden="true">
          <NatuIcon className="natu-sidebar__item-group-icon">
            <CaretDownIcon />
          </NatuIcon>
        </span>
      </button>

      <div className="natu-sidebar__group-list">
        {/* TODO */}
        {/* <NatuSidebarList items={group.items} /> */}
      </div>
    </>
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

function useSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => setIsExpanded((isExpanded) => !isExpanded);

  return { isExpanded, onToggleExpansion: handleToggleExpansion };
}

function useSidebarCollapsedGroup() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpenChange = (isOpen: boolean) => setIsPopoverOpen(isOpen);

  return { isPopoverOpen, onPopoverOpenChange: handlePopoverOpenChange };
}
