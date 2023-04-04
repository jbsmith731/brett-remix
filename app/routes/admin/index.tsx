import { Form, useActionData } from '@remix-run/react';
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
    bookmarkSchema.parse(formData);

    await supabase.from('Bookmarks').insert([formData]);

    return json({ submitError: null, validationError: null }, { status: 201 });
  } catch (error) {
    return json({ submitError: error, validationError: null }, { status: 400 });
  }
};

const Admin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { submitError, validationError } = useActionData<typeof action>() ?? {};

  return (
    <main className={container}>
      <h1>Admin</h1>

      <Form method="post">
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="url" placeholder="url" />
        <textarea name="description" placeholder="description" />
        <button type="submit">Submit</button>
      </Form>
    </main>
  );
};

const bookmarkSchema = z.object({
  title: z.string().max(240),
  url: z.string().url(),
  description: z.string().optional(),
});

export default Admin;
