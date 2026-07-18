import * as React from 'react'
import { createLink } from '@tanstack/react-router'

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const LinkButtonComponent = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => {
    return (
      <a ref={ref} {...props} />
    )
  }
)

export const LinkButton = createLink(LinkButtonComponent)