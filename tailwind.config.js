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
    colors: {
      main: {
        50: '#F2F7F5',
        100: '#E5F0EA',
        200: '#CFE3D8',
        300: '#B5D3C4',
        400: '#9FC6B2',
        500: '#85B79D',
        600: '#5FA07E',
        700: '#46775E',
        800: '#2F503F',
        900: '#17261E',
        950: '#0B130F',
      },
      decoration: {
        50: '#F8E8EE',
        100: '#EFCDDB',
        200: '#E09EBA',
        300: '#D16C96',
        400: '#C23D74',
        500: '#8F2D56',
        600: '#742546',
        700: '#551B33',
        800: '#3A1223',
        900: '#1B0910',
        950: '#100509',
      },
      neutral: {
        50: '#FEFDFB',
        100: '#FCFBF8',
        200: '#F9F7F0',
        300: '#F6F4E9',
        400: '#F4F0E2',
        500: '#F0EBD8',
        600: '#D7CA98',
        700: '#BEA756',
        800: '#857333',
        900: '#42391A',
        950: '#211D0D',
      },
      success: '#555B6E',
      warning: '#eab308',
      error: '#e75f68',
    },

    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  daisyui: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
