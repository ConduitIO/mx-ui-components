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

  test('it displays an accessible input if a label text and an id is provded', async function(assert) {
    this.set('onInput', () => {});
    this.set('label', 'Address');

    await render(hbs`<Mxa::UnboundInput @label={{this.label}} @id="address-field" @onInput={{this.onInput}}/>`);

    assert.dom('[data-test-label]').includesText('Address');
    assert.dom('[data-test-label]').hasAttribute('for', 'address-field');
    assert.dom('[data-test-unbound-input]').hasAttribute('id', 'address-field');
  });

  test('it allows disabling the input', async function(assert) {
    this.set('onInput', () => {});

    await render(hbs`<Mxa::UnboundInput @onInput={{this.onInput}} disabled />`);

    assert.dom('[data-test-unbound-input]').isDisabled();
  });
});
