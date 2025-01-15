/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        radar81: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        radar81: 'radar81 2s linear infinite',
      },
      boxShadow: {
        'inner-':
          'inset -5px -5px 25px rgba(0,0,0,0.25), inset 5px 5px 35px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
