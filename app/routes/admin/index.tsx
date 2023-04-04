import { Form } from '@remix-run/react';
import type { ActionArgs } from '@vercel/remix';
import { container } from '~/style/container';
import { createServerClient } from '~/utils/supabase.server';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const formData = await request.formData();

  const { data, error } = await supabase.from('Bookmarks').insert([
    {
      title: formData.get('title') as string | null,
      url: formData.get('url') as string | null,
      description: formData.get('description') as string | null,
    },
  ]);

  return { data, error };
};

const Admin = () => {
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

export default Admin;
