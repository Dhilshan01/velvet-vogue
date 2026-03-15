/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        outfit:   ['"Outfit"', 'sans-serif'],
      },
      colors: {
        gold:     '#C9A84C',
        'gold-l': '#E8C97A',
        'gold-d': '#8A6F2E',
        dark:     '#0A0A0A',
        surface:  '#111111',
        s2:       '#1A1A1A',
        s3:       '#242424',
        border:   '#2A2A2A',
        ink:      '#F0EDE8',
        dim:      '#9A9590',
        muted:    '#6B6560',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
    },
  },
  plugins: [],
};
