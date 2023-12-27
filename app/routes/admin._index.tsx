import * as Form from '@radix-ui/react-form';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@vercel/remix';
import { json } from '@vercel/remix';
import * as cheerio from 'cheerio';
import * as React from 'react';
import { z } from 'zod';
import { Linkbox } from '~/components/Linkbox';
import { button } from '~/style/button';
import { errorMessage, form, formLabel, input } from '~/style/forms';
import { headingText, text } from '~/style/text';
import { createServerClient } from '~/utils/supabase.server';

type FormAction = 'create' | 'delete';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const { _action, ...values } = Object.fromEntries(await request.formData());

  if (_action === 'create') {
    const bookmark = bookmarkSchema.safeParse(values);

    if (!bookmark.success) {
      return json(
        {
          error: bookmark.error.format(),
        },
        {
          status: 400,
        },
      );
    }

    let metaDescription = null;

    if (!bookmark.data.description) {
      const bookmarkMarkup = await fetch(bookmark.data.url).then((res) =>
        res.text(),
      );

      const $ = cheerio.load(bookmarkMarkup);
      metaDescription = $('meta[name="description"]')?.attr('content');
    }

    const { error, status } = await supabase.from('Bookmarks').insert([
      {
        ...bookmark.data,
        ...(metaDescription ? { description: metaDescription } : {}),
      },
    ]);

    if (error) {
      return json({ error: error.message }, { status });
    }

    return json({ error: null }, { status });
  }

  if (_action === 'delete') {
    const deleteData = deleteSchema.safeParse(values);

    if (!deleteData.success) {
      return json({ error: deleteData.error.format() }, { status: 400 });
    }

    const { error, status } = await supabase
      .from('Bookmarks')
      .delete()
      .eq('id', deleteData.data.id);

    if (error) {
      return json({ error: error.message }, { status });
    }

    return json({ error: null });
  }

  return json({ error: '_action method not supported' });
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data, error } = await supabase
    .from('Bookmarks')
    .select('id, title, url, description')
    .order('id', { ascending: false });

  return json({ data, error });
};

const Admin = () => {
  const { data } = useLoaderData<typeof loader>();
  const { error } = useActionData<typeof action>() ?? {};
  const { state, formData } = useNavigation();
  const formAction = formData?.get('_action') as FormAction | null;
  const isCreating = state === 'submitting' && formAction === 'create';

  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isCreating && !error) {
      formRef.current?.reset();
      firstInputRef.current?.focus();
    }
  }, [isCreating, error]);

  return (
    <>
      <h2
        className={headingText({
          className: 'mb-2 pb-0 border-b-2 border-current',
          level: '6',
        })}
      >
        Bookmarks
      </h2>

      <div className="grid gap-y-5 gap-x-8 items-start lg:grid-cols-[auto_1fr]">
        <Form.Root asChild>
          <RemixForm
            method="post"
            className={form}
            replace
            ref={formRef}
            name="create"
          >
            <Form.Field name="title">
              <Form.Label className={formLabel}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                className={input}
                ref={firstInputRef}
                required
                autoComplete="off"
                autoCapitalize="words"
              />
              <Form.Message match="valueMissing" className={errorMessage}>
                Please enter a title
              </Form.Message>
            </Form.Field>

            <Form.Field name="url">
              <Form.Label className={formLabel}>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL"
                className={input}
                required
                autoComplete="off"
              />
              <Form.Message
                match={(value) => isInvalidCreateField('url', value)}
                className={errorMessage}
              >
                Invalid URL
              </Form.Message>
            </Form.Field>

            <Form.Field name="description">
              <Form.Label className={formLabel}>Description</Form.Label>
              <Form.Control placeholder="Description" asChild className={input}>
                <textarea />
              </Form.Control>
            </Form.Field>

            <Form.Submit
              className={button()}
              type="submit"
              disabled={isCreating}
              name="_action"
              value="create"
            >
              {isCreating ? 'Submitting' : 'Submit'}
            </Form.Submit>
          </RemixForm>
        </Form.Root>

        <ul>
          {data?.map(({ id, url, title, description }) => (
            <li
              key={id}
              className="[&:not(:first-of-type)]:border-t border-gray"
            >
              <Linkbox.Root className="py-2 grid grid-cols-[1fr_auto] gap-2-3">
                <div>
                  <h3
                    className={headingText({
                      className: 'mb-[4px]',
                      level: '5',
                    })}
                  >
                    {url ? (
                      <Linkbox.Target
                        to={url}
                        target="_blank"
                        rel="noreferrer,nofollow"
                      >
                        {title}
                      </Linkbox.Target>
                    ) : (
                      title
                    )}
                  </h3>
                  <p className={text({ size: '0', leading: '2' })}>
                    {description}
                  </p>
                </div>

                <RemixForm method="post" replace>
                  <input type="hidden" name="id" value={id} />
                  <button
                    type="submit"
                    name="_action"
                    value="delete"
                    className={text({
                      className:
                        'hover:text-red-600 transition-colors p-0 -m-0 text-opacity-80',
                      size: '-1',
                      leading: '0',
                      color: 'secondary',
                    })}
                  >
                    Delete
                  </button>
                </RemixForm>
              </Linkbox.Root>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const bookmarkSchema = z.object({
  title: z.string().max(240).trim(),
  url: z.string().url().trim(),
  description: z.string().trim().optional(),
});

type CreateKeys = keyof typeof bookmarkSchema.shape;

const isInvalidCreateField = (key: CreateKeys, value: unknown) => {
  const field = bookmarkSchema
    .pick({ [key]: true })
    .safeParse({ [key]: value });

  return !field.success;
};

const deleteSchema = z.object({
  id: z.coerce.number(),
});

export default Admin;
