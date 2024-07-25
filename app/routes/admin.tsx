import { Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import { json, redirect } from '@vercel/remix';
import { useEffect, useState } from 'react';
import { createServerClient } from '~/utils/supabase.server';

import type { Session, SupabaseClient } from '@supabase/auth-helpers-remix';
import type { LoaderFunctionArgs } from '@vercel/remix';
import { cx } from 'cva';
import { container } from '~/style/container';
import { headingText, text } from '~/style/text';
import type { Database } from '~/types/supabase';

export type TypedSupabaseClient = SupabaseClient<Database>;
export type MaybeSession = Session | null;

export type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  const response = new Response();
  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect('/', 302);
  }

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    },
  );
};

export const headers = () => {
  return {
    'x-robots-tag': 'noindex,nofollow',
  };
};

export default function Admin() {
  const { env, session } = useLoaderData<typeof loader>();
  const { submit: fetcherSubmit } = useFetcher();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY),
  );

  const serverAccessToken = session?.access_token;

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        // Remix recalls active loaders after actions complete
        fetcherSubmit(null, {
          method: 'post',
          action: '/admin/handle-supabase-auth',
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, fetcherSubmit]);

  return (
    <main className={cx(container, 'py-4')}>
      <div className="flex justify-between items-baseline mb-4">
        <h1 className={headingText({ level: '3' })}>Admin</h1>
        <button
          className={text({
            className: 'hover:text-blue-600 transition-colors',
            size: '-1',
            leading: '0',
          })}
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      </div>

      <Outlet context={{ supabase, session }} />
    </main>
  );
}
