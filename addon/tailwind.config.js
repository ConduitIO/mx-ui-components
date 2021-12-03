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
    extend: {},
  },
  plugins: [require('@meroxa/ui-base')],
};
