import * as Form from '@radix-ui/react-form';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@vercel/remix';
import { json } from '@vercel/remix';
import * as React from 'react';
import { z } from 'zod';
import { Linkbox } from '~/components/Linkbox';
import { button } from '~/style/button';
import { form, formLabel, input } from '~/style/forms';
import { headingText, text } from '~/style/text';
import { createServerClient } from '~/utils/supabase.server';

type FormAction = 'create' | 'delete';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

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

    const { error, status } = await supabase
      .from('Bookmarks')
      .insert([bookmark.data]);

    if (error) {
      return json({ error: error.message }, { status });
    }

    return json({ error: null }, { status });
  }

  if (_action === 'delete') {
    const deleteData = deleteSchema.safeParse(formData);

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

    return json({ error: null }, { status });
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
              />
              {/* <Form.Message
                match="valueMissing"
                forceMatch={Boolean(validationError?.title)}
                className={errorMessage}
              >
                {validationError?.title
                  ? validationError.title._errors.join(', ')
                  : null}
              </Form.Message> */}
            </Form.Field>

            <Form.Field name="url">
              <Form.Label className={formLabel}>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL"
                className={input}
                required
              />
              {/* <Form.Message
                match="patternMismatch"
                forceMatch={Boolean(validationError?.url)}
                className={errorMessage}
              >
                {validationError?.url
                  ? validationError.url._errors.join(', ')
                  : null}
              </Form.Message> */}
            </Form.Field>

            <Form.Field name="description">
              <Form.Label className={formLabel}>Description</Form.Label>
              <Form.Control placeholder="Description" asChild className={input}>
                <textarea />
              </Form.Control>
              {/* <Form.Message
                match="valueMissing"
                forceMatch={Boolean(validationError?.description)}
                className={errorMessage}
              >
                {validationError?.description
                  ? validationError.description._errors.join(', ')
                  : null}
              </Form.Message> */}
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
                  <h3 className={headingText({ level: '5' })}>
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
                  <p>{description}</p>
                </div>

                <RemixForm
                  method="post"
                  action="/admin/bookmarks/delete"
                  replace
                >
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

const deleteSchema = z.object({
  id: z.coerce.number(),
});

export default Admin;
