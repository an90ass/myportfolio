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
          blue:  '#3b82f6',
          cyan:  '#06b6d4',
          green: '#10b981',
          purple:'#8b5cf6',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          dark:      '#0f172a',
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
        card:       '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover':'0 8px 32px rgba(0,0,0,0.5)',
        glow:       '0 0 20px rgba(59,130,246,0.15)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
} satisfies Config
