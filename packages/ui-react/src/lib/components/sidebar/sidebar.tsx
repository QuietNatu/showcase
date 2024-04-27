import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { MergeExclusive } from 'type-fest';
import CaretRightIcon from '@natu/assets/svg/caret-right.svg?react';
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

export interface NatuSidebarIndividualAction {
  icon?: ReactNode;
  label: ReactNode;
  itemWrapper: (children: ReactNode) => ReactNode;
}

interface NatuSidebarGroupAction {
  icon?: ReactNode;
  label: ReactNode;
  items: NatuSidebarIndividualAction[];
}

export interface NatuSidebarProps {
  children?: ReactNode;
  actions?: NatuSidebarAction[];
  secondaryActions?: NatuSidebarAction[];
}

interface NatuSidebarListProps {
  isSidebarExpanded: boolean;
  items: MergeExclusive<NatuSidebarIndividualAction, NatuSidebarGroupAction>[];
}

interface NatuSidebarItemProps {
  isSidebarExpanded: boolean;
  item: NatuSidebarIndividualAction;
}

interface NatuSidebarGroupProps {
  isSidebarExpanded: boolean;
  group: NatuSidebarGroupAction;
}

interface NatuSidebarIconProps {
  children?: ReactNode;
}

export function NatuSidebar(props: NatuSidebarProps) {
  const { actions = [], secondaryActions = [] } = props;

  /* TODO: create hook */
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx('natu-sidebar', {
        'natu-sidebar--expanded': isExpanded,
        'natu-sidebar--collapsed': !isExpanded,
      })}
    >
      {props.children}

      {/* TODO: add i18n once implemented  */}
      {actions.length > 0 && (
        <nav aria-label="Main">
          <NatuSidebarList items={actions} isSidebarExpanded={isExpanded} />
        </nav>
      )}

      <div className="natu-sidebar__footer">
        {/* TODO: add i18n once implemented  */}
        {secondaryActions.length > 0 && (
          <nav aria-label="Secondary">
            <NatuSidebarList items={secondaryActions} isSidebarExpanded={isExpanded} />
          </nav>
        )}

        <button
          type="button"
          className="natu-sidebar__toggle-button"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
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

export function NatuSidebarHeader({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}

/* TODO: check rerenders */
export function NatuSidebarList(props: NatuSidebarListProps) {
  const listItems = props.items.map((item, index) => (
    <li key={index} className="natu-sidebar__list-item">
      {item.items ? (
        <NatuSidebarGroup group={item} isSidebarExpanded={props.isSidebarExpanded} />
      ) : (
        <NatuSidebarItem item={item} isSidebarExpanded={props.isSidebarExpanded} />
      )}
    </li>
  ));

  return <ul className="natu-sidebar__list">{listItems}</ul>;
}

export function NatuSidebarItem(props: NatuSidebarItemProps) {
  const { item, isSidebarExpanded } = props;

  /* TODO: slot should not be needed */
  return (
    <NatuTooltip isDisabled={isSidebarExpanded} placement="right">
      <NatuTooltipTrigger>
        <Slot className="natu-sidebar__item">
          {item.itemWrapper(
            <>
              <NatuSidebarIcon>{item.icon}</NatuSidebarIcon>
              <NatuSidebarLabel>{item.label}</NatuSidebarLabel>
            </>,
          )}
        </Slot>
      </NatuTooltipTrigger>

      <NatuTooltipContent>{item.label}</NatuTooltipContent>
    </NatuTooltip>
  );
}

export function NatuSidebarGroup(props: NatuSidebarGroupProps) {
  const { group, isSidebarExpanded } = props;

  /* TODO: create hook */
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // TODO: triggers not stacking

  return (
    <>
      <NatuCardPopover
        isDisabled={isSidebarExpanded}
        placement="right"
        isOpen={isPopoverOpen}
        onOpenChange={(isOpen) => setIsPopoverOpen(isOpen)}
      >
        <NatuTooltip isDisabled={isSidebarExpanded || isPopoverOpen} placement="right">
          <NatuCardPopoverTrigger>
            <NatuTooltipTrigger>
              <button type="button" className="natu-sidebar__item">
                <NatuSidebarIcon>{group.icon}</NatuSidebarIcon>
                <NatuSidebarLabel>{group.label}</NatuSidebarLabel>
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

      <div className="natu-sidebar__group-list">
        {/* TODO */}
        {/* <NatuSidebarList items={group.items} /> */}
      </div>
    </>
  );
}

export function NatuSidebarGroupItem({ children }: { children?: ReactNode }) {
  return <button type="button">{children}</button>;
}

export function NatuSidebarGroupList({ children }: { children?: ReactNode }) {
  return <ul>{children}</ul>;
}

export function NatuSidebarIcon(props: NatuSidebarIconProps) {
  return (
    <Slot className="natu-sidebar__item-icon" aria-hidden="true">
      {props.children}
    </Slot>
  );
}

export function NatuSidebarLabel({ children }: { children?: ReactNode }) {
  return <div className="natu-sidebar__item-label">{children}</div>;
}
