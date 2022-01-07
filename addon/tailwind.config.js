/*global module require*/

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        tiny: '0.625rem',
        double: '2rem',
        big: '1.125rem',
      },
      width: {
        container: '846px',
        box: '500px',
        slim: '8px',
        sidebar: '60px',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      backgroundColor: ['disabled', 'checked', 'active', 'hover'],
      borderColor: ['disabled', 'focus-within'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      translate: ['checked'],
    },
  },
  plugins: [require('@meroxa/ui-base')],
};
