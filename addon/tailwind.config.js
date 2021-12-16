/*global module require*/

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        container: '846px',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      backgroundColor: ['disabled', 'checked', 'active'],
      borderColor: ['disabled', 'focus-within'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      translate: ['checked'],
    },
  },
  plugins: [require('@meroxa/ui-base')],
};
