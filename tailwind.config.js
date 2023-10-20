/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      mytheme: {
        primary: '#82AC9F',
        secondary: '#BEE3DB',
        accent: '#FFD6BA',
        neutral: '#1c1e26',
        'base-100': '#FAF9F9',
        info: '#FBC2B5',
        success: '#555B6E',
        warning: '#eab308',
        error: '#e75f68',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
