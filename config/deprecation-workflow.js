/* eslint-disable no-undef */
self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  /* eslint-enable no-undef */
  workflow: [
    { handler: 'throw', matchId: 'ember-global' },
    { handler: 'throw', matchId: 'ember.component.reopen' },
    { handler: 'throw', matchId: 'ember.built-in-components.import' },
    { handler: 'throw', matchId: 'ember.built-in-components.reopen' },
    {
      handler: 'throw',
      matchId: 'deprecated-run-loop-and-computed-dot-access',
    },
    { handler: 'throw', matchId: 'implicit-injections' },
    { handler: 'throw', matchId: 'route-render-template' },
    { handler: 'throw', matchId: 'manager-capabilities.modifiers-3-13' },
    {
      handler: 'throw',
      matchId: 'ember.built-in-components.legacy-arguments',
    },
    { handler: 'throw', matchId: 'ember-modifier.use-modify' },
    { handler: 'throw', matchId: 'ember-modifier.no-args-property' },
    { handler: 'throw', matchId: 'ember-modifier.no-element-property' },
    { handler: 'throw', matchId: 'autotracking.mutation-after-consumption' },
    { handler: 'throw', matchId: 'ember-modifier.function-based-options' },
    {
      handler: 'throw',
      matchId: 'ember-keyboard.keyboard-first-responder-on-focus-mixin',
    },
    {
      handler: 'silence',
      matchId: 'ember-data:method-calls-on-destroyed-store',
    },
    { handler: 'throw', matchId: 'ember-keyboard.first-responder-inputs' },
    { handler: 'throw', matchId: 'ember-keyboard.ember-keyboard-mixin' },
    { handler: 'throw', matchId: 'manager-capabilities.modifiers-3-13' },
    { handler: 'throw', matchId: 'autotracking.mutation-after-consumption' },
    { handler: 'throw', matchId: 'this-property-fallback' },
    { handler: 'throw', matchId: 'routing.transition-methods' },
    { handler: 'throw', matchId: 'ember-data:method-calls-on-destroyed-store' },
  ],
};
