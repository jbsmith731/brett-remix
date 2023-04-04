import { cva } from 'cva';

export const button = cva(
  'inline-block disabled:cursor-not-allowed rounded transition-colors',
  {
    variants: {
      type: {
        solid: 'h-[40px] px-3 bg-coal text-white hover:bg-blue-600',
        outline:
          'h-[40px] px-3 border border-coal text-coal hover:bg-coal hover:text-white',
      },
    },
    defaultVariants: {
      type: 'outline',
    },
  },
);
