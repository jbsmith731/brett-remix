import { headingText, text } from '~/style/text';
import { formulaSpaceReset } from '~/style/text';
import data from '~/data/bookmarks.json';
import { Linkbox } from '~/components/Linkbox';

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
              className="[&:not(:first-of-type)]:border-t border-gray"
            >
              <Linkbox.Root className="py-3">
                <h2 className={headingText({ className: 'mb-0', level: '4' })}>
                  <Linkbox.Target to={url}>{title}</Linkbox.Target>
                </h2>
                <p className={text({ size: '1' })}>{description}</p>
              </Linkbox.Root>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
