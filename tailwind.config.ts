import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts,tsx}',
    './components/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card:      'var(--bg-card)',
          hover:     'var(--bg-hover)',
          border:    'var(--bg-border)',
        },
        accent: {
          amber:     '#10b981', // Strategic Emerald 500 (5% Accent)
          gold:      '#34d399', // Mint / Light Emerald 400
          warm:      '#059669', // Deep Emerald 600
          terracotta:'#047857', // Forest Emerald 700
          emerald:   '#10b981',
          mint:      '#34d399',
          green:     '#10b981',
          blue:      '#10b981',
          cyan:      '#34d399',
          purple:    '#059669',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          dark:      '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Tajawal', 'monospace'],
        arabic: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
        badge: '0.5rem',
      },
      animation: {
        'scroll-left':  'scrollLeft 30s linear infinite',
        'scroll-right': 'scrollRight 30s linear infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':      'fadeIn 0.6s ease-out',
        'slide-up':     'slideUp 0.6s ease-out',
      },
      keyframes: {
        scrollLeft: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRight: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        card:        '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'card-hover':'0 12px 30px -10px rgba(0,0,0,0.7), 0 0 20px -5px rgba(16,185,129,0.18)',
        glow:        '0 0 25px rgba(16,185,129,0.18)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
} satisfies Config
