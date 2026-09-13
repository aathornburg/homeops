import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps
} from "@mantine/core";
import React from "react";
import { baseActionClassName, primaryActionClassName, secondaryActionClassName } from "./buttonStyles";

type ButtonProps =
  Omit<MantineButtonProps, 'variant'> &
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'secondary';
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, ...props}, ref) => {
    return (
    <MantineButton
      {...props}
      ref={ref}
      unstyled
      className={`
        ${baseActionClassName}
        ${variant === 'secondary'
          ? secondaryActionClassName
          : primaryActionClassName}
        font-bold!
        disabled:cursor-not-allowed disabled:opacity-60
        ${className ?? ''}
      `}
    />
  )
  }
);