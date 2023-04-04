import * as Form from '@radix-ui/react-form';
import {
  Form as RemixForm,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import type { ActionArgs, LoaderArgs } from '@vercel/remix';
import { json } from '@vercel/remix';
import { cx } from 'cva';
import * as React from 'react';
import { z } from 'zod';
import { button } from '~/style/button';
import { container } from '~/style/container';
import { errorMessage, form, formLabel, input } from '~/style/forms';
import { headingText } from '~/style/text';
import { createServerClient } from '~/utils/supabase.server';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const formData = Object.fromEntries(await request.formData());
  const bookmark = bookmarkSchema.safeParse(formData);

  if (!bookmark.success) {
    return json(
      {
        validationError: bookmark.error.format(),
        submitError: null,
      },
      {
        status: 400,
      },
    );
  }

  try {
    await supabase.from('Bookmarks').insert([bookmark.data]);

    return json({ submitError: null, validationError: null }, { status: 201 });
  } catch (error) {
    return json({ submitError: error, validationError: null }, { status: 400 });
  }
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data, error } = await supabase.from('Bookmarks').select('*');

  return json({ data, error });
};

const Admin = () => {
  const { data } = useLoaderData<typeof loader>();
  const { submitError, validationError } = useActionData<typeof action>() ?? {};
  const { state } = useNavigation();
  const isSubmitting = state === 'submitting';

  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!isSubmitting && !submitError && !validationError) {
      formRef.current?.reset();
      firstInputRef.current?.focus();
    }
  }, [isSubmitting, submitError, validationError]);

  return (
    <main className={cx(container, 'py-4')}>
      <h1 className={headingText({ level: '3' })}>Admin</h1>

      <h2
        className={headingText({
          className: 'mt-5 mb-2 pb-0 border-b-2 border-current',
          level: '6',
        })}
      >
        Bookmarks
      </h2>

      <div className="grid gap-y-5 gap-x-8 items-start lg:grid-cols-[auto_1fr]">
        <Form.Root asChild>
          <RemixForm method="post" className={form} replace ref={formRef}>
            <Form.Field
              name="title"
              serverInvalid={Boolean(validationError?.title)}
            >
              <Form.Label className={formLabel}>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                className={input}
                ref={firstInputRef}
              />
              <Form.Message
                match="valueMissing"
                forceMatch={Boolean(validationError?.title)}
                className={errorMessage}
              >
                {validationError?.title
                  ? validationError.title._errors.join(', ')
                  : null}
              </Form.Message>
            </Form.Field>

            <Form.Field
              name="url"
              serverInvalid={Boolean(validationError?.url)}
            >
              <Form.Label className={formLabel}>URL</Form.Label>
              <Form.Control type="text" placeholder="URL" className={input} />
              <Form.Message
                match="patternMismatch"
                forceMatch={Boolean(validationError?.url)}
                className={errorMessage}
              >
                {validationError?.url
                  ? validationError.url._errors.join(', ')
                  : null}
              </Form.Message>
            </Form.Field>

            <Form.Field
              name="description"
              serverInvalid={Boolean(validationError?.description)}
            >
              <Form.Label className={formLabel}>Description</Form.Label>
              <Form.Control placeholder="Description" asChild className={input}>
                <textarea />
              </Form.Control>
              <Form.Message
                match="valueMissing"
                forceMatch={Boolean(validationError?.description)}
                className={errorMessage}
              >
                {validationError?.description
                  ? validationError.description._errors.join(', ')
                  : null}
              </Form.Message>
            </Form.Field>

            <Form.Submit
              className={button()}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Form.Submit>
          </RemixForm>
        </Form.Root>

        <div>
          <ul>
            {data?.map((bookmark) => (
              <li
                key={bookmark.id}
                className="[&:not(:first-of-type)]:border-t border-gray py-2"
              >
                <h3 className={headingText({ level: '5' })}>
                  {bookmark.title}
                </h3>
                <p>{bookmark.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

const bookmarkSchema = z.object({
  title: z.string().max(240).trim(),
  url: z.string().url().trim(),
  description: z.string().trim().optional(),
});

export default Admin;
