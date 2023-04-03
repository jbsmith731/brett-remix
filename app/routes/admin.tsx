import { Outlet, useFetcher, useLoaderData } from '@remix-run/react';
import { createBrowserClient } from '@supabase/auth-helpers-remix';
import { json } from '@vercel/remix';
import { useEffect, useState } from 'react';
import { createServerClient } from '~/utils/supabase.server';

import type { Session, SupabaseClient } from '@supabase/auth-helpers-remix';
import type { LoaderArgs } from '@vercel/remix';
import type { Database } from '~/types/supabase';

export type TypedSupabaseClient = SupabaseClient<Database>;
export type MaybeSession = Session | null;

export type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
};

export const loader = async ({ request }: LoaderArgs) => {
  // environment variables may be stored somewhere other than
  // `process.env` in runtimes other than node
  // we need to pipe these Supabase environment variables to the browser
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  // We can retrieve the session on the server and hand it to the client.
  // This is used to make sure the session is available immediately upon rendering
  const response = new Response();

  const supabase = createServerClient({ request, response });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // in order for the set-cookie header to be set,
  // headers must be returned as part of the loader response
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

export default function Admin() {
  const { env, session } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  // it is important to create a single instance of Supabase
  // to use across client components - outlet context 👇
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
        fetcher.submit(null, {
          method: 'post',
          action: '/handle-supabase-auth',
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, supabase, fetcher]);
  console.log('session', session);

  return (
    <>
      <Outlet context={{ supabase, session }} />
    </>
  );
}
