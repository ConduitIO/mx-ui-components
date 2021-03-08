import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | mxa/unbound-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls the onInput action on input', async function(assert) {
    this.set('onInput', sinon.spy());
    await render(hbs`<Mxa::UnboundInput @onInput={{this.onInput}}/>`);

    await fillIn('[data-test-unbound-input]', 'james rules');

    assert.ok(this.onInput.called);
  });
});
