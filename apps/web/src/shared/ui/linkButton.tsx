import * as React from 'react'
import { createLink } from '@tanstack/react-router'
import { baseActionClassName, primaryActionClassName, secondaryActionClassName } from './buttonStyles'

type LinkButtonProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: 'primary' | 'secondary';
  };

const LinkButtonComponent = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`
          ${baseActionClassName}
          ${variant === 'secondary'
            ? secondaryActionClassName
            : primaryActionClassName}
          ${className ?? ''}`
        }
        {...props}
      />
    )
  }
)

export const LinkButton = createLink(LinkButtonComponent)