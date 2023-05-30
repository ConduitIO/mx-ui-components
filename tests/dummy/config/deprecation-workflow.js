/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    /* Ember deprecations 4.x */
    { handler: 'throw', matchId: 'remove-owner-inject' },
    { handler: 'throw', matchId: 'ember-polyfills.deprecate-assign' },
    { handler: 'throw', matchId: 'implicit-injections' },
    { handler: 'throw', matchId: 'deprecate-auto-location' },
    { handler: 'throw', matchId: 'setting-on-hash' },
    { handler: 'throw', matchId: 'deprecate-ember-error' },
    { handler: 'throw', matchId: 'ember-string.from-ember-module' },
    /* Ember CLI deprecations 4.x */
    {
      handler: 'throw',
      matchId: 'ember-cli.blueprint.add-bower-package-to-project',
    },
    {
      handler: 'throw',
      matchId: ' ember-cli.blueprint.add-bower-packages-to-project',
    },
    { handler: 'throw', matchId: 'ember-cli.building-bower-packages' },
    { handler: 'throw', matchId: 'ember-cli.project.bower-dependencies' },
    { handler: 'throw', matchId: 'ember-cli.project.bower-directory' },
    {
      handler: 'throw',
      matchId: 'ember-cli.blacklist-whitelist-build-options',
    },
    { handler: 'throw', matchId: 'ember-cli.ember-cli-jshint-support' },
    { handler: 'throw', matchId: 'ember-cli.vendor-shim-blueprint' },
    /* Ember Data deprecations 4.x */
    { handler: 'throw', matchId: 'ember-data:deprecate-array-like' },
    { handler: 'throw', matchId: 'ember-data:deprecate-early-static' },
    {
      handler: 'throw',
      matchId: 'ember-data:deprecate-non-strict-relationships',
    },
    {
      handler: 'throw',
      matchId: 'ember-data:deprecate-promise-many-array-behaviors',
    },
    { handler: 'throw', matchId: 'ember-data:deprecate-store-find' },
    { handler: 'throw', matchId: 'ember-data:deprecate-promise-proxies' },
  ],
};
