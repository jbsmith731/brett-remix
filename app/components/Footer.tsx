import { cx } from 'cva';
import { container } from '~/style/container';
import { text } from '~/style/text';
import { Link } from './Link';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cx(
        'pt-5 flex flex-wrap justify-between gap-2 sm:flex-row-reverse',
        container,
      )}
    >
      <ul className="flex gap-2 max-sm:basis-[100%]">
        {SOCIAL.map(({ url, name }) => (
          <li key={url}>
            <Link
              className={text()}
              to={url}
              target="_blank"
              rel="nofollow,noreferrer"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={text()}>Nashville, TN &mdash; &copy; {year}</div>
    </footer>
  );
};

const SOCIAL = [
  {
    url: 'https://github.com/jbsmith731',
    name: 'GitHub',
  },
  {
    url: 'https://twitter.com/_brettsmith',
    name: 'Twitter',
  },
  {
    url: 'https://www.linkedin.com/in/brett--smith/',
    name: 'LinkedIn',
  },
  {
    url: 'https://instagram.com/jbsmith731',
    name: 'Instagram',
  },
];
