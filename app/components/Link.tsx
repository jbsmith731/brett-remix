import type { LinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';
import { cx } from 'cva';

export const Link = ({ to, children, className, ...rest }: LinkProps) => {
  let isExternal = false;

  if (typeof to === 'string') {
    isExternal = to.startsWith('http');
  }

  return (
    <RemixLink {...rest} to={to} className={cx(className, styledLink)}>
      {children}
      {isExternal ? <span aria-hidden="true">&nbsp;&#8599;</span> : null}
    </RemixLink>
  );
};

export const styledLink = 'text-coal hover:text-blue-600 transition-colors';
