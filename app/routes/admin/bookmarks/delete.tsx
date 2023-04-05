import type { ActionArgs } from '@vercel/remix';
import { json, redirect } from '@vercel/remix';
import { z } from 'zod';
import { createServerClient } from '~/utils/supabase.server';

export const action = async ({ request }: ActionArgs) => {
  console.log('action');
  const response = new Response();
  const supabase = createServerClient({ request, response });
  const formData = Object.fromEntries(await request.formData());
  const deleteData = deleteSchema.safeParse(formData);

  if (!deleteData.success) {
    return json(
      { validationError: deleteData.error.format() },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from('Bookmarks')
    .delete()
    .eq('id', deleteData.data.id);

  if (error) {
    return json({ error }, { status: 400 });
  }

  return redirect('/admin', { status: 302 });
};

const deleteSchema = z.object({
  id: z.coerce.number(),
});
