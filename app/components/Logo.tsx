import * as React from 'react';

export const Logo = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 33"
    >
      <path
        fill="currentColor"
        d="M11.56 15.08c1.88-.88 3.28-2.6 3.28-6.16v-.48C14.84 2.16 12.96 0 6.32 0H.6v32h5.72c6.8-.04 9-2.28 9-8.28v-1.64c0-4.04-1.68-6.04-3.76-7ZM9.52 9.6c0 2.68-.72 3.12-3.16 3.12h-.44v-7.4h.44c2.68 0 3.16.44 3.16 3.12V9.6Zm-3.16 8.44c2.68 0 3.64.68 3.64 3.36v1.96c0 2.76-.8 3.32-3.64 3.32h-.44v-8.64h.44ZM20.14 32.4a2.8 2.8 0 0 0 2.88-2.88 2.8 2.8 0 0 0-2.88-2.92 2.81 2.81 0 0 0-2.92 2.92 2.8 2.8 0 0 0 2.92 2.88Z"
      />
    </svg>
  );
};
