import { type Config } from 'tailwindcss';

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)'
      },
      borderRadius: {
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        '2xl': 'var(--radius-xl)'
      },
      transitionDuration: {
        base: 'var(--transition)'
      },
      container: {
        center: true,
        padding: '2rem',
        screens: { '2xl': '1280px' }
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
