/*global module require*/

module.exports = {
  content: [
    './index.html',
    './addon/components/**/*.hbs',
    './addon/components/**/*.js',
    './stories/**/*.js',
  ],
  safelist: [
    {
      pattern: /(mxa-btn\S*|\S*cyan\S*|\S*red\S*)/,
      variants: ['active', 'disabled'],
    },
  ],
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
  plugins: [require('@meroxa/ui-base')],
};
