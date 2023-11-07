import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bloxberg: ['var(--font-montserrat)'],
      },
      colors: {
        'bloxberg-black': '#000',
        'bloxberg-white': '#fff',
        'bloxberg-blue': {
          100: '#BAD5D8',
          200: '#9DC2CA',
          300: '#7CA9AF',
          400: '#6D9EA5',
          500: '#5C8C98',
          600: '#40727B',
          700: '#2A5963',
          800: '#29404f',
          900: '#133944',
          950: '#1c2b36',
        },
        'bloxberg-red': '#e01d6c',
        'bloxberg-grey': '#EBE9E9',
        'bloxberg-blue-grey': '#50626E'
      },
    },
  },
  plugins: [],
}
export default config
