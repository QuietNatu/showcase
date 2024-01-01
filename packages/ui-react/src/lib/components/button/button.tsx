import { ButtonHTMLAttributes, FocusEvent, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PressEvent, useFocusable, usePress } from 'react-aria';
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

type NativeProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'type' | 'onFocus' | 'onBlur'
>;

interface CommonProps extends NativeProps {
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

type NatuButtonProps = NatuButtonUnslottedProps | NatuButtonSlottedProps;

export const NatuButton = forwardRef<HTMLButtonElement, NatuButtonProps>(
  function NatuButton(props, forwardedRef) {
    const { asChild, children, className, isDisabled, onPress, variant, size, ...buttonProps } =
      props;

    const ref = useObjectRef(forwardedRef);
    const Component = asChild ? Slot : 'button';

    const { focusableProps } = useFocusable(props, ref);
    const { pressProps, isPressed } = usePress({
      preventFocusOnPress: true,
      isDisabled,
      onPress,
      ref,
    });

    const mergedButtonProps = mergeProps(focusableProps, pressProps, buttonProps);

    return (
      <Component
        {...mergedButtonProps}
        ref={ref}
        className={clsx(
          buttonVariants({ variant, size }),
          isDisabled && 'natu-button--disabled',
          asChild && isPressed && 'natu-button--active',
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
