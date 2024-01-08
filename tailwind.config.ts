import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      primary: 'var(--primary-color)',
      'text-color': 'var(--text-color)',
      'text-color-secondary': 'var(--text-color-secondary)',
      'surface-card': 'var(--surface-card)',
      'surface-border': 'var(--surface-border)',
      'surface-overlay': 'var(--surface-overlay)',
      'surface-a': 'var(--surface-a)',
      'surface-b': 'var(--surface-b)',
      'surface-c': 'var(--surface-c)',
      'surface-d': 'var(--surface-d)',
      'primary-color-text': 'var(--primary-color-text)',
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(90deg, var(--surface-d), transparent)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
