import { cx } from 'cva';
import { container } from '~/style/container';
// import { Link } from './Link';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cx('pt-5 flex justify-between md:border-t-0', container)}
    >
      <div>Nashville, TN &mdash; &copy; {year}</div>

      {/* <Link to="/" className="underline underline-offset-2">
        Connect
      </Link> */}
    </footer>
  );
};
