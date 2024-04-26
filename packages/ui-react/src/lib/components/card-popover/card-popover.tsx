import { forwardRef, useEffect, useId, useMemo, useState } from 'react';
import {
  NatuPopover,
  NatuPopoverContent,
  NatuPopoverContentProps,
  NatuPopoverProps,
  NatuPopoverTrigger,
  NatuPopoverTriggerProps,
} from '../popover/popover';
import type { Except } from 'type-fest';
import {
  NatuCard,
  NatuCardBody,
  NatuCardBodyProps,
  NatuCardHeader,
  NatuCardHeaderProps,
} from '../card/card';
import { usePopoverContext } from '../popover/use-popover';
import { createContext } from '../../hooks';

export type NatuCardPopoverProps = NatuPopoverProps;
export type NatuCardPopoverTriggerProps = NatuPopoverTriggerProps;
export type NatuCardPopoverContentProps = Except<NatuPopoverContentProps, 'hasEmbeddedContent'>;
export type NatuCardPopoverContentHeaderProps = Except<NatuCardHeaderProps, 'size'>;
export type NatuCardPopoverContentBodyProps = NatuCardBodyProps;

interface CardPopoverContext {
  setLabelId: (id: string | undefined) => void;
  setDescriptionId: (id: string | undefined) => void;
}

const [CardPopoverProvider, useCardPopoverContext] = createContext<CardPopoverContext>({
  name: 'CardPopoverContext',
});

export const NatuCardPopover = NatuPopover;

export const NatuCardPopoverTrigger = NatuPopoverTrigger;

export const NatuCardPopoverContent = forwardRef<HTMLDivElement, NatuCardPopoverContentProps>(
  function NatuCardPopoverContent(props, forwardedRef) {
    const popover = usePopoverContext();
    const cardPopover = useCardPopover();

    return (
      <NatuPopoverContent
        ref={forwardedRef}
        {...props}
        hasEmbeddedContent={true}
        aria-labelledby={cardPopover.labelId}
        aria-describedby={cardPopover.descriptionId}
      >
        <NatuCard isEmbedded={true} isDismissable={true} onDismiss={popover.onDismiss}>
          <CardPopoverProvider value={cardPopover.context}>{props.children}</CardPopoverProvider>
        </NatuCard>
      </NatuPopoverContent>
    );
  },
);

export function NatuCardPopoverContentHeader(props: NatuCardPopoverContentHeaderProps) {
  const { setLabelId } = useCardPopoverContext();

  const defaultId = useId();
  const id = props.id ?? defaultId;

  useEffect(() => {
    setLabelId(id);

    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return <NatuCardHeader {...props} size="small" id={id} />;
}

export function NatuCardPopoverContentBody(props: NatuCardPopoverContentBodyProps) {
  const { setDescriptionId } = useCardPopoverContext();

  const defaultId = useId();
  const id = props.id ?? defaultId;

  useEffect(() => {
    setDescriptionId(id);

    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <NatuCardBody {...props} id={id} />;
}

function useCardPopover() {
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const context: CardPopoverContext = useMemo(() => ({ setLabelId, setDescriptionId }), []);

  return { labelId, descriptionId, context };
}
