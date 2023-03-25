import { headingText, text } from '~/style/text';
import { formulaSpaceReset } from '~/style/text';
import data from '~/data/bookmarks.json';

export default function Bookmarks() {
  return (
    <>
      <section>
        <h1
          className={headingText({
            className: formulaSpaceReset,
            level: 'mega',
          })}
        >
          Bookmarks
        </h1>

        <ul className="mt-6 md:mt-8-9">
          {data.bookmarks.map(({ title, url, description }, index) => (
            <li
              key={index}
              className="py-3 [&:not(:first-of-type)]:border-t border-gray"
            >
              <h2 className={headingText({ className: 'mb-0', level: '4' })}>
                {title}
              </h2>
              <p className={text({ size: '1' })}>{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
