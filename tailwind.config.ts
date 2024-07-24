import createFluidValue from './createFluidValue';
import type { Config } from "tailwindcss";

export default {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        display: 'Formula, -apple-system, BlinkMacSystemFont, sans-serif',
        body: 'NeueMontreal, -apple-system, BlinkMacSystemFont, sans-serif',
      },
      letterSpacing: {
        wide: '.02em',
        wider: '.04em',
        widest: '.12em',
      },
      lineHeight: {
        normal: '1.4',
      },
      fontSize: {
        7: createFluidValue(64, 224),
        6: createFluidValue(48, 96),
        5: createFluidValue(32, 48),
        4: createFluidValue(32, 40),
        3: createFluidValue(20, 24),
        2: '1.25rem',
        1: createFluidValue(16, 18),
        0: '1rem',
        '-1': createFluidValue(14, 16),
        '-2': '.75rem',
      },
      spacing: {
        none: '0',
        0: '8px',
        1: createFluidValue(12, 16),
        2: createFluidValue(16, 24),
        3: createFluidValue(24, 32),
        4: createFluidValue(32, 40),
        5: createFluidValue(40, 48),
        6: createFluidValue(56, 64),
        7: createFluidValue(72, 80),
        8: createFluidValue(80, 104),
        9: createFluidValue(96, 126),

        '0-1': createFluidValue(8, 16),
        '1-2': createFluidValue(12, 24),
        '2-3': createFluidValue(16, 32),
        '3-4': createFluidValue(24, 40),
        '4-5': createFluidValue(32, 48),
        '5-6': createFluidValue(40, 64),
        '6-7': createFluidValue(56, 80),
        '7-8': createFluidValue(72, 104),
        '8-9': createFluidValue(80, 126),
        '3-6': createFluidValue(24, 64),
      },
      colors: {
        coal: '#222',
        carbon: '#4A4B4C',
        gray: '#B7B9BB',
        'light-gray': '#ECF0F2',
        current: 'currentColor',
      },
    },
  },
  plugins: [],
  corePlugins: {
    float: false,
  },
} satisfies Config;
