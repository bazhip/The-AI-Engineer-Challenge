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
        mario: {
          red: '#E60012',
          blue: '#0066CC',
          yellow: '#FFD700',
          green: '#00AA00',
          brown: '#8B4513',
          orange: '#FF8C00',
          purple: '#8A2BE2',
          pink: '#FF69B4',
        },
        background: {
          primary: '#87CEEB',
          secondary: '#98FB98',
          tertiary: '#FFE4B5',
        }
      },
      fontFamily: {
        'mario': ['Comic Sans MS', 'cursive', 'sans-serif'],
      },
      animation: {
        'bounce-mario': 'bounce 1s infinite',
        'pulse-glow': 'pulse 2s infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        }
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
} 