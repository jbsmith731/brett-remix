import { cva } from 'cva';

export const button = cva(
  'inline-block disabled:cursor-not-allowed rounded transition-colors',
  {
    variants: {
      type: {
        solid: 'bg-coal text-white hover:bg-blue-600',
        outline: 'border border-coal text-coal hover:bg-coal hover:text-white',
      },
      size: {
        sm: 'h-[32px] px-2 text-0',
        md: 'h-[40px] px-3 -text-1',
      },
    },
    defaultVariants: {
      type: 'outline',
      size: 'md',
    },
  },
);
