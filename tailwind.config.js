module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'admin-page': 'minmax(8rem, 1fr) minmax(auto, 7fr) minmax(14rem, 2fr)',
        // cards: 'repeat(auto-fill, minmax(16rem, 1fr))',
        // 'collection-table': '50px repeat(6, minmax(75px, auto))',
      },
      gridTemplateRows: {
        'admin-page': 'auto minmax(300px, 10fr) auto',
        'side-left': 'repeat(auto-fit, minmax(2rem, 1fr))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
