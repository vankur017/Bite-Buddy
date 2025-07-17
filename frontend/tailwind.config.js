/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/components/**/*.{html,js,jsx,ts,tsx}',
             './index.html',],
  
    theme: {
      extend: {
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
        theme: {
  extend: {
    colors: {
      orange: {
        500: '#f97316',
        600: '#ea580c',
      },
      yellow: {
        500: '#facc15',
        600: '#eab308',
      },
    },
    backdropBlur: {
      sm: '4px',
      md: '8px',
    },
  },
},

        animation: {
          fadeIn: 'fadeIn 0.5s ease-in-out',
        },
      },
    },
  
  plugins: [],
}

