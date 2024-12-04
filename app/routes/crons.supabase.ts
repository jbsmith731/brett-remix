import { json, LoaderFunctionArgs } from '@remix-run/node';
import { createServerClient } from '~/utils/supabase.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const { data } = await supabase
    .from('Bookmarks')
    .select('title, url, description')
    .order('id', { ascending: false });

  return json({ data });
};
