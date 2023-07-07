'use strict';

module.exports = {
  name: require('./package').name,

  included: function (appOrAddon) {
    let app = appOrAddon.app || appOrAddon;
    this._super.included.apply(this, arguments);
    app.import('vendor/mx-ui-components.css');
  },
};
