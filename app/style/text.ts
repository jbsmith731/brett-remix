import { cva } from 'cva';

export const text = cva('', {
  variants: {
    size: {
      '-1': '-text-1',
      '0': 'text-0',
      '1': 'text-1',
    },
    color: {
      primary: 'text-coal',
      secondary: 'text-carbon',
    },
    leading: {
      '0': 'leading-none',
      '1': 'leading-tight',
      '2': 'leading-normal',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: '0',
    leading: '2',
    weight: 'regular',
  },
});

export const headingText = cva('leading-none font-bold', {
  variants: {
    level: {
      mega: 'font-display text-7 uppercase',
      '1': 'font-display text-6 uppercase tracking-wide',
      '2': 'font-display text-5 uppercase tracking-wider',
      '3': 'text-4',
      '4': 'text-3',
      '5': 'text-2',
      '6': '-text-2 uppercase tracking-widest',
    },
    color: {
      primary: 'text-coal',
      secondary: 'text-carbon',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const formulaSpaceReset = 'mt-[.06em] mb-[-.24em]';
