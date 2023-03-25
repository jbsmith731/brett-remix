import type { LinkProps } from '@remix-run/react';
import { cx } from 'cva';
import * as React from 'react';
import { Link } from './Link';

const Root = ({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...rest} className={cx(className, 'relative linkbox')}>
      {children}
    </div>
  );
};

const Target = ({ to, children, className, ...rest }: LinkProps) => {
  return (
    <Link to={to} className={cx('linkbox-target', className)}>
      {children}
    </Link>
  );
};

export const Linkbox = {
  Root,
  Target,
};
