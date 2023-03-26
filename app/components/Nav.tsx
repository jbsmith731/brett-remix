import { NavLink } from '@remix-run/react';
import { cx } from 'cva';
import { text as textStyle } from '~/style/text';
import { styledLink } from './Link';

export const Nav = () => {
  return (
    <nav>
      <ul className="grid justify-end grid-flow-col gap-3 md:max-lg:grid-flow-row md:max-lg:gap-1 md:max-lg:text-right">
        {NAV_LINKS.map(({ to, text }) => (
          <li key={to} className={textStyle({ size: '1', leading: '0' })}>
            <NavLink
              to={to}
              className={cx(
                styledLink,
                'navlink relative before:bg-blue-600 before:transition-opacity',
              )}
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NAV_LINKS = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'Bookmarks',
    to: '/bookmarks',
  },
  {
    text: 'Connect',
    to: 'mailto:hi@brettsmith.me',
  },
];
