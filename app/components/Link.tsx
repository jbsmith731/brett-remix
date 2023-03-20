import { Link as RemixLink } from '@remix-run/react';
import type { LinkProps } from '@remix-run/react';
import { cx } from 'cva';

export const Link = ({ to, children, className, ...rest }: LinkProps) => {
  let isExternal = false;

  if (typeof to === 'string') {
    isExternal = to.startsWith('http');
  }

  return (
    <RemixLink
      {...rest}
      to={to}
      className={cx(className, 'hover:text-blue-600 transition-colors')}
    >
      {children}
      {isExternal ? <span aria-hidden="true"> &#8599;</span> : null}
    </RemixLink>
  );
};
