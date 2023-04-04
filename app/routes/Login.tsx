import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import type { ActionArgs, MetaFunction } from '@vercel/remix';
import { createServerClient } from '~/utils/supabase.server';

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerClient({ request, response });

  const form = await request.formData();
  const email = form.get('email');
  const password = form.get('password');

  if (!email) {
    return json({ error: 'Email is required' });
  }

  if (!password) {
    return json({ error: 'Password is required' });
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email as string,
    password: password as string,
  });

  if (error) {
    return json({ error: error.message });
  }

  return redirect('/admin', {
    headers: response.headers,
  });
};

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  };
};

// TODO: improve auth flow
const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error } = useLoaderData() ?? {};

  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
