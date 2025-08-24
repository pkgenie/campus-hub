/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#324376',
          DEFAULT: '#1a2e5a',
          dark: '#0e1a38'
        },
        secondary: {
          light: '#6278a6',
          DEFAULT: '#4a5e87',
          dark: '#33415e'
        }
      }
    }
  },
  plugins: []
};