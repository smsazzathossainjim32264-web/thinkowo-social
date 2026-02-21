import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#8b5cf6',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
