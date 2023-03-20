import { text as textStyle } from '~/style/text';
import { Link } from './Link';

export const Nav = () => {
  return (
    <nav>
      <ul className="grid grid-flow-col justify-end gap-3">
        {NAV_LINKS.map(({ to, text }) => (
          <li key={to} className={textStyle({ size: '1', leading: '0' })}>
            <Link to={to}>{text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const NAV_LINKS = [
  // {
  //   text: 'Bookmarks',
  //   to: '/bookmarks',
  // },
  {
    text: 'Connect',
    to: 'mailto:hi@brettsmith.me',
  },
  {
    text: 'Github',
    to: 'https://github.com/jbsmith731',
  },
];
