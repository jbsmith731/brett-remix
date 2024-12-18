import { MetaFunction } from '@vercel/remix';
import { cx } from 'cva';
import { cacheHeader } from 'pretty-cache-header';
import { formulaSpaceReset, headingText, text } from '~/style/text';

const TITLE = 'Brett Smith - Frontend Engineer';
const SOCIAL_IMAGE = 'https://brettsmith.me/images/social.png';
const DESCRIPTION =
  'Software engineer interested in TypeScript, React, and Design Systems. Currently working as Technical Director at Elegant Seagulls';

export const meta: MetaFunction = () => {
  return [
    {
      title: TITLE,
      description: DESCRIPTION,
      'og:title': TITLE,
      'twitter:title': TITLE,
      'og:image': SOCIAL_IMAGE,
      'twitter:image': SOCIAL_IMAGE,
      'og:description': DESCRIPTION,
      'twitter:description': DESCRIPTION,
      'twitter:card': 'summary_large_image',
      'twitter:site': '@_brettsmith',
    },
  ];
};

export const headers = () => {
  return {
    'Cache-Control': cacheHeader({
      sMaxage: '30days',
      staleWhileRevalidate: '1day',
    }),
  };
};

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
              Software Engineer @ BDG Partners
            </p>
          </li>
          <li>
            <h2 className={headingText({ className: 'mb-0', level: '6' })}>
              Interests
            </h2>
            <p className={text({ leading: '0', size: '1' })}>
              TypeScript, React, &amp; Design Systems
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
    content: 'New role as Software Engineer @ BDG Partners',
    date: 'Nov. 2024',
  },
  {
    content: 'Launch custom Audible Catalog Figma plugin',
    date: 'Sept. 2024',
  },
  { content: 'Presenter at Contentful Amazon Day', date: 'Jul. 2024' },
  {
    prefix: 'Awwwards',
    content: 'Elegant Seagulls Sauce Honorable Mention',
    date: 'Nov. 2023',
  },
  { content: 'Launch Elegant Seagulls Sauce website', date: 'Nov. 2023' },
  {
    content: 'Launch new Audible Gift Center experience',
    date: 'Oct. 2023',
  },
  {
    content: 'Launch updated global Audible landing page experiments',
    date: 'Oct. 2023',
  },
  {
    content: 'Begin rolling out global Audible About site initiative',
    date: 'Oct. 2023',
  },
  {
    content: 'Audible ACX Blog',
    date: 'Apr. 2023',
  },
  {
    content: 'Launch personal website v4.0',
    date: 'Mar. 2023',
  },
  {
    prefix: 'Awwwards',
    content: 'Elegant Seagulls agency Site of The Day',
    date: 'Jul. 2022',
  },
  {
    content: 'Hello World! Charles Robert Smith',
    date: 'May 2022',
  },
  {
    content: 'Launch Audible landing page experiments',
    date: 'Apr. 2022',
  },
  {
    content: 'Launch Audible Audiobook quiz recommendation  platform',
    date: 'Nov. 2021',
  },
  {
    content: 'Tech. Director @ Elegant Seagulls',
    date: 'Sept. 2020',
  },
  {
    prefix: 'Awwwards',
    content: 'Waves 4 Water Honorable Mention',
    date: 'Aug. 2019',
  },
  {
    prefix: 'CSS Design Awards',
    content: 'Tane Website of the Day',
    date: 'Aug. 2019',
  },
  {
    prefix: 'Awwwards',
    content: 'Tane Honorable Mention & Mobile Excellence Award',
    date: 'Aug. 2019',
  },
  {
    prefix: 'Awwwards',
    content: 'About Audible Honorable Mention',
    date: 'Mar. 2019',
  },
  {
    content: 'Lead Frontend Developer @ Elegant Seagulls',
    date: 'Oct. 2018',
  },
  {
    prefix: 'Awwwards',
    content: 'InVision Design Leadership Honorable Mention',
    date: 'Feb. 2018',
  },
  {
    prefix: 'Awwwards',
    content: 'Elegant Seagulls agency site Honorable Mention',
    date: 'Oct. 2017',
  },
];
