/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kokyu: {
          beige: '#F9F1E7',
          brown: '#B89B76',
          darkBrown: '#A58B66',
          lightBrown: '#D3BC9B',
          background: '#FDF7F2',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
