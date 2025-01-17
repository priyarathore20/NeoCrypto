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
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      animation: {
        radar81: 'radar81 2s linear infinite',
        'star-movement-bottom':
          'star-movement-bottom 1s linear infinite alternate',
        'star-movement-top': 'star-movement-top 1s linear infinite alternate',
      },
      boxShadow: {
        'inner-':
          'inset -5px -5px 25px rgba(0,0,0,0.25), inset 5px 5px 35px rgba(0,0,0,0.25)',
      },
      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [],
};

export default config;
