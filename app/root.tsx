import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@vercel/remix';
import { Link } from './components/Link';
import { formulaSpaceReset, headingText } from './style/text';

import style from './style/style.css?url';
import tw from './style/tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'preload', as: 'style', href: tw },
  { rel: 'stylesheet', href: tw },
  { rel: 'stylesheet', href: style },
  {
    rel: 'preload',
    href: './fonts/PPFormulaCondensed-Bold.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: './fonts/PPNeueMontreal-Book.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

const TITLE = 'Brett Smith - Frontend Engineer';
const SOCIAL_IMAGE = 'https://brettsmith.me/images/social.png';
const DESCRIPTION =
  'Software engineer interested in TypeScript, React, and Design Systems. Currently working as Technical Director at Elegant Seagulls';

export const meta: MetaFunction = () => {
  return [
    {
      title: TITLE,
      description: DESCRIPTION,
      'og:title': TITLE,
      'twitter:title': TITLE,
      'og:image': SOCIAL_IMAGE,
      'twitter:image': SOCIAL_IMAGE,
      'og:description': DESCRIPTION,
      'twitter:description': DESCRIPTION,
      'twitter:card': 'summary_large_image',
      'twitter:site': '@_brettsmith',
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-body bg-light-gray min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message: string | number = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    message = error.status;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="font-body bg-light-gray min-h-screen flex">
        <div className="m-auto text-center grid gap-0 justify-items-center">
          <h1
            className={headingText({
              className: formulaSpaceReset,
              level: 'mega',
            })}
          >
            {message}
          </h1>

          <Link to="/" className="underline text-1 my-1 inline-block w-max">
            Go back home &rarr;
          </Link>
        </div>
      </body>
    </html>
  );
}

const FONTS = `
@font-face {
  font-family: 'Formula';
  src: url('./fonts/PPFormulaCondensed-Bold.woff2') format('woff2');
  font-weight: 700;
}
@font-face {
  font-family: 'NeueMontreal';
  src: url('./fonts/PPNeueMontreal-Book.woff2') format('woff2');
  font-weight: 400;
}
@font-face {
  font-family: 'NeueMontreal';
  src: url('./fonts/PPNeueMontreal-Bold.woff2') format('woff2');
  font-weight: 700;
}
`;
