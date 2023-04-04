import * as Form from '@radix-ui/react-form';
import { Form as RemixForm, useActionData } from '@remix-run/react';
import type { ActionArgs } from '@vercel/remix';
import { json } from '@vercel/remix';
import { z } from 'zod';
import { container } from '~/style/container';
import { createServerClient } from '~/utils/supabase.server';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const formData = Object.fromEntries(await request.formData());

  const validation = bookmarkSchema.safeParse(formData);

  if (!validation.success) {
    return json(
      {
        validationError: validation.error.format(),
        submitError: null,
      },
      {
        status: 400,
      },
    );
  }

  try {
    const bookmark = bookmarkSchema.parse(formData);

    await supabase.from('Bookmarks').insert([bookmark]);

    return json({ submitError: null, validationError: null }, { status: 201 });
  } catch (error) {
    return json({ submitError: error, validationError: null }, { status: 400 });
  }
};

const Admin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { submitError, validationError } = useActionData<typeof action>() ?? {};
  console.log(Boolean(validationError?.title));

  return (
    <main className={container}>
      <h1>Admin</h1>

      <Form.Root asChild>
        <RemixForm method="post">
          <Form.Field
            name="title"
            serverInvalid={Boolean(validationError?.title)}
          >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" />
            <Form.Message
              match="valueMissing"
              forceMatch={Boolean(validationError?.title)}
            >
              {validationError?.title
                ? validationError.title._errors.join(', ')
                : null}
            </Form.Message>
          </Form.Field>

          <Form.Field name="url" serverInvalid={Boolean(validationError?.url)}>
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" placeholder="URL" />
            <Form.Message
              match="valueMissing"
              forceMatch={Boolean(validationError?.url)}
            >
              {validationError?.url
                ? validationError.url._errors.join(', ')
                : null}
            </Form.Message>
          </Form.Field>

          <Form.Field
            name="description"
            serverInvalid={Boolean(validationError?.url)}
          >
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder="Description" asChild>
              <textarea />
            </Form.Control>
            <Form.Message
              match="valueMissing"
              forceMatch={Boolean(validationError?.description)}
            >
              {validationError?.description
                ? validationError.description._errors.join(', ')
                : null}
            </Form.Message>
          </Form.Field>

          <Form.Submit type="submit">Submit</Form.Submit>
        </RemixForm>
      </Form.Root>
    </main>
  );
};

const bookmarkSchema = z.object({
  title: z.string().max(240).trim(),
  url: z.string().url().trim(),
  description: z.string().trim().optional(),
});

export default Admin;
