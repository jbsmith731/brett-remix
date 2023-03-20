import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import styles from './style/tailwind.css';
import { formulaSpaceReset, headingText } from './style/text';
import { Link } from './components/Link';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Brett Smith - Frontend Engineer',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <Meta />
        <Links />
      </head>
      <body className="font-body bg-light-gray min-h-screen">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: FONTS }} />
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="font-body bg-light-gray min-h-screen flex">
        <div className="m-auto text-center grid gap-0">
          <h1
            className={headingText({
              className: formulaSpaceReset,
              level: 'mega',
            })}
          >
            {caught.status}
          </h1>

          <Link to="/" className="underline text-1">
            Go back home &rarr;
          </Link>
        </div>

        <Scripts />
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
@font-face {
  font-family: 'NeueMontreal';
  src: url('./fonts/PPNeueMontreal-Regular.woff2') format('woff2');
  font-weight: 500;
}
`;
