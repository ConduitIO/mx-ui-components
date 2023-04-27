'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
      },
    },
    {
      files: '*.hbs',
      options: {
        singleQuote: false,
        printWidth: 100,
      },
    },
  ],
};
