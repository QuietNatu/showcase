import { ComponentPropsWithoutRef, FocusEvent, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PressEvent, useFocusRing, useFocusable, usePress } from 'react-aria';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva('natu-button', {
  variants: {
    variant: {
      primary: 'natu-button--primary',
      destructive: 'natu-button--destructive',
      outline: 'natu-button--outline',
      'outline-destructive': 'natu-button--outline-destructive',
      ghost: 'natu-button--ghost',
      'ghost-destructive': 'natu-button--ghost-destructive',
      'ghost-muted': 'natu-button--ghost-muted',
    },
    size: {
      small: 'natu-button--small',
      medium: 'natu-button--medium',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type NatuButtonVariants = VariantProps<typeof buttonVariants>;

type ElementProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'disabled' | 'type' | 'onFocus' | 'onBlur'
>;

interface CommonProps extends ElementProps {
  isDisabled?: boolean;
  variant?: NatuButtonVariants['variant'];
  size?: NatuButtonVariants['size'];

  /** Handler that is called when the element is pressed. */
  onPress?: (e: PressEvent) => void;
  onFocus?: (e: FocusEvent<Element, Element>) => void;
  onBlur?: (e: FocusEvent<Element, Element>) => void;
}

export interface NatuButtonUnslottedProps extends CommonProps {
  asChild?: false;
  type: 'button' | 'submit';
}

export interface NatuButtonSlottedProps extends CommonProps {
  asChild: true;
}

export type NatuButtonProps = NatuButtonUnslottedProps | NatuButtonSlottedProps;

export const NatuButton = forwardRef<HTMLButtonElement, NatuButtonProps>(
  function NatuButton(props, forwardedRef) {
    const { asChild, children, className, isDisabled, onPress, variant, size, ...buttonProps } =
      props;

    const ref = useObjectRef(forwardedRef);
    const Component = asChild ? Slot : 'button';

    const { focusProps, isFocusVisible } = useFocusRing();
    const { focusableProps } = useFocusable(props, ref);
    const { pressProps, isPressed } = usePress({
      isDisabled,
      onPress,
      ref,
    });

    return (
      <Component
        {...mergeProps(focusProps, focusableProps, pressProps, buttonProps)}
        ref={ref}
        className={clsx(
          buttonVariants({ variant, size }),
          {
            'natu-button--disabled': isDisabled,
            'natu-button--focus': isFocusVisible && !isDisabled,
            'natu-button--active': asChild && isPressed,
          },
          className,
        )}
        aria-disabled={isDisabled}
        tabIndex={asChild ? 0 : undefined}
        role={asChild ? 'button' : undefined}
      >
        {children}
      </Component>
    );
  },
);
