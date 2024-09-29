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
        animation: {
          fadeIn: 'fadeIn 0.5s ease-in-out',
        },
      },
    },
  
  plugins: [],
}

