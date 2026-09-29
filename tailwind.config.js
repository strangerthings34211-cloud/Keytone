/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        ocean: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#0B3D91',
          800: '#0a3480',
          900: '#061D4A',
          950: '#030f2a',
        },
        teal: {
          50:  '#f0fdfe',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0EA5C4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        seafoam: {
          500: '#22C55E',
          600: '#16a34a',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem',  { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.15', fontWeight: '700' }],
        'display-md': ['2.75rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, #061D4A 0%, #0B3D91 100%)',
        'gradient-teal':  'linear-gradient(135deg, #0B3D91 0%, #0EA5C4 100%)',
        'gradient-hero':  'linear-gradient(to right, rgba(6,29,74,0.92) 0%, rgba(6,29,74,0.60) 60%, rgba(6,29,74,0.20) 100%)',
        'gradient-card':  'linear-gradient(to bottom, transparent 40%, rgba(6,29,74,0.85) 100%)',
      },
      boxShadow: {
        'card':    '0 2px 12px rgba(0,0,0,0.06), 0 8px 24px rgba(11,61,145,0.08)',
        'card-hover': '0 8px 32px rgba(11,61,145,0.18)',
        'btn':     '0 4px 16px rgba(11,61,145,0.30)',
        'nav':     '0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'slide-in':   'slideIn 0.3s ease-out forwards',
        'marquee':    'marquee 30s linear infinite',
        'count-up':   'countUp 1.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
