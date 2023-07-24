/*global module require*/

module.exports = {
  content: [
    './index.html',
    './addon/components/**/*.hbs',
    './addon/components/**/*.js',
    './stories/**/*.js',
    './tests/**/*.js',
  ],
  safelist: [
    {
      pattern: /(mxa-btn\S*|\S*cyan\S*|\S*red\S*)/,
      variants: [
        'active',
        'checked',
        'dark',
        'dark:active',
        'dark:checked',
        'dark:checked:after',
        'dark:disabled',
        'dark:focus',
        'dark:hover',
        'dark:read-only',
        'dark:read-only:focus',
        'disabled',
        'focus',
        'hover',
        'read-only',
        'read-only:focus',
      ],
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
  plugins: [require('@tailwindcss/forms'), require('@meroxa/ui-base')],
  darkMode: 'class',
};
