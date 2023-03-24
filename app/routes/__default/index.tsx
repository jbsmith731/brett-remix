import { cx } from 'cva';
import { formulaSpaceReset, headingText, text } from '~/style/text';

export default function Index() {
  return (
    <>
      <section>
        <h1
          className={headingText({
            className: formulaSpaceReset,
            level: 'mega',
          })}
        >
          Brett Smith
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 my-6 md:my-8-9">
          <li>
            <h2 className={headingText({ className: 'mb-0', level: '6' })}>
              Role
            </h2>
            <p className={text({ leading: '0', size: '1' })}>
              <abbr title="Technical" className="no-underline">
                Tech.
              </abbr>{' '}
              Director @ Elegant Seagulls
            </p>
          </li>
          <li>
            <h2 className={headingText({ className: 'mb-0', level: '6' })}>
              Interests
            </h2>
            <p className={text({ leading: '0', size: '1' })}>
              React, TypeScript, &amp; Design Systems
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h3
          className={headingText({
            className: 'pb-0 border-b-2 border-current',
            level: '6',
          })}
        >
          Updates
        </h3>

        <ul>
          {UPDATES.map(({ prefix, content, date }, index) => (
            <UpdateItem key={index}>
              <div
                className={cx(
                  'sm:order-2',
                  text({ size: '-1', color: 'secondary' }),
                )}
              >
                {date}
              </div>
              <p className={text({ size: '1' })}>
                {prefix ? (
                  <>
                    <span>{prefix}</span> &rarr;{' '}
                  </>
                ) : null}
                {content}
              </p>
            </UpdateItem>
          ))}
        </ul>
      </section>
    </>
  );
}

const UpdateItem = ({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'li'>) => {
  return (
    <li
      {...rest}
      className="py-3 sm:grid sm:grid-cols-[1fr_auto] [&:not(:first-of-type)]:border-t border-gray"
    >
      {children}
    </li>
  );
};

type Update = {
  prefix?: string;
  content: string;
  date: string;
};

const UPDATES: Update[] = [
  {
    prefix: 'Shipped',
    content: 'Personal website v4.0',
    date: 'Mar. 2023',
  },
  // {
  //   prefix: 'Shipped',
  //   content: 'Audible ACX Blog',
  //   date: 'Mar. 2023',
  // },
  {
    prefix: 'Award',
    content: 'Elegant Seagulls Awwwards Site of The Day',
    date: 'Jul. 2022',
  },
  {
    content: 'Hello World! Charles Robert Smith',
    date: 'May 2022',
  },
  {
    prefix: 'Shipped',
    content: 'Audible Audiobook Recommendation Quiz Platform',
    date: 'Nov. 2021',
  },
  {
    prefix: 'Promoted',
    content: 'Tech. Director @ Elegant Seagulls',
    date: 'Sept. 2020',
  },
  {
    prefix: 'Award',
    content: 'Waves 4 Water Awwwards Honorable Mention',
    date: 'Aug. 2019',
  },
  {
    prefix: 'Award',
    content: 'Tane CSS Design Awards Website of the Day',
    date: 'Aug. 2019',
  },
  {
    prefix: 'Award',
    content: 'Tane Awwwards Honorable Mention',
    date: 'Aug. 2019',
  },
  {
    prefix: 'Award',
    content: 'About Audible Awwwards Honorable Mention',
    date: 'Mar. 2019',
  },
  {
    prefix: 'Promoted',
    content: 'Lead Frontend Developer @ Elegant Seagulls',
    date: 'Oct. 2018',
  },
  {
    prefix: 'Award',
    content: 'InVision Design Leadership Awwwards Honorable Mention',
    date: 'Feb. 2018',
  },
  {
    prefix: 'Award',
    content: 'Elegant Seagulls Awwwards Honorable Mention',
    date: 'Oct. 2017',
  },
];
