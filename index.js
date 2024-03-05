'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      // eslint-disable-next-line n/no-unpublished-require
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin()],
    },
  },

  included: function (appOrAddon) {
    let app = appOrAddon.app || appOrAddon;
    this._super.included.apply(this, arguments);
    app.import('vendor/mx-ui-components.css');
  },
};
