/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medblue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        medteal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        darkblue: {
          950: '#040817',
          900: '#080E24',
          850: '#0D1636',
          800: '#121D46',
          750: '#182658',
          700: '#1E2F6C',
          600: '#2A408E',
          500: '#3B59B6',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F9F5EC',
          150: '#F5EFE0',
          200: '#EFE5D2',
          250: '#E8DBC2',
          300: '#DDCDB0',
          400: '#C8B490',
          500: '#B09871',
          700: '#5A4626',
          800: '#3D2F17',
          900: '#22190B',
        },
        gold: {
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
          accent: '#E5C07B',
        },
        clinical: {
          surface: '#ffffff',
          background: '#080E24',
          subtle: '#0D1636',
          border: '#1E2F6C',
          accent: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'medical': '0 4px 20px -2px rgba(2, 132, 199, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'medical-hover': '0 12px 30px -4px rgba(2, 132, 199, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'medical-teal': '0 4px 20px -2px rgba(13, 148, 136, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'warning-soft': '0 4px 20px -2px rgba(245, 158, 11, 0.15)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'scan': 'scanLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
