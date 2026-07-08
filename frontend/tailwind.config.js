/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1526',
        slate: {
          450: '#7A8AA0',
        },
        brand: {
          50: '#EEF4FF',
          100: '#DCE8FF',
          200: '#B3CFFF',
          300: '#7FADFF',
          400: '#4A87F5',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1A3FAE',
          800: '#173985',
          900: '#122A63',
        },
        teal: {
          50: '#EFFCFA',
          100: '#D6F5EF',
          200: '#AEEBDF',
          300: '#79DBCB',
          400: '#3EC2AE',
          500: '#0D9488',
          600: '#0B7C72',
          700: '#0A655E',
          800: '#0A4F4A',
          900: '#08403C',
        },
        vital: '#0D9488',
      },
      fontFamily: {
        display: ['"Lexend"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 21, 38, 0.04), 0 8px 24px -8px rgba(11, 21, 38, 0.08)',
        card: '0 1px 3px rgba(11, 21, 38, 0.06), 0 1px 2px rgba(11, 21, 38, 0.04)',
        panel: '0 20px 45px -20px rgba(13, 148, 136, 0.25)',
      },
      backgroundImage: {
        'vital-line': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40'%3E%3Cpath d='M0 20 H140 L155 5 L170 35 L185 10 L200 30 L215 20 H400' fill='none' stroke='%230D9488' stroke-width='2'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        pulseLine: {
          '0%': { strokeDashoffset: '400' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-line': 'pulseLine 2.4s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
