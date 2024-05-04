/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src/**/*',
    '.src/Components/*',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

