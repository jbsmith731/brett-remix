import * as Form from '@radix-ui/react-form';
import { json, redirect } from '@remix-run/node';
import { Form as RemixForm, useActionData } from '@remix-run/react';
import type { ActionArgs, MetaFunction } from '@vercel/remix';
import { cx } from 'cva';
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
  const loginData = loginSchema.safeParse(formData);

  if (!loginData.success) {
    return json(
      {
        validationError: loginData.error.format(),
        submitError: null,
      },
      {
        status: 400,
      },
    );
  }

  const { error: submitError } = await supabase.auth.signInWithPassword(
    loginData.data,
  );

  if (submitError) {
    return json({ submitError, validationError: null }, { status: 400 });
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

export const headers = () => {
  return {
    'x-robots-tag': 'noindex,nofollow',
  };
};

const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { submitError, validationError } = useActionData<typeof action>() ?? {};

  return (
    <div className={cx(container, 'flex h-screen')}>
      <div className="m-auto w-full md:w-[400px]">
        <h1 className={headingText({ className: 'mb-2', level: '3' })}>
          Login
        </h1>
        <Form.Root asChild>
          <RemixForm method="post" className={form}>
            <Form.Field name="email">
              <Form.Label className={formLabel}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                required
                className={input}
              />
            </Form.Field>

            <Form.Field name="password">
              <Form.Label className={formLabel}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                required
                className={input}
              />
            </Form.Field>
            <Form.Submit type="submit" className={button()}>
              Login
            </Form.Submit>
          </RemixForm>
        </Form.Root>
        {/* TODO: Improve error/validation handling */}
        {submitError || validationError ? (
          <p className={errorMessage}>
            An error has ocurred. Please try again.
          </p>
        ) : null}
      </div>
    </div>
  );
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default Login;
