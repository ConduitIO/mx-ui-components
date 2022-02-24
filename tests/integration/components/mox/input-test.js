import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/input', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls the onInput action on input', async function(assert) {
    this.set('onInput', sinon.spy());
    await render(hbs`<Mox::Input @onInput={{this.onInput}}/>`);

    await fillIn('[data-test-mox-input]', 'brett and james rule');

    assert.ok(this.onInput.called);
  });

  test('it displays an accessible input if a label text and an id is provded', async function(assert) {
    this.set('onInput', () => {});
    this.set('label', 'Address');

    await render(hbs`<Mox::Input @label={{this.label}} @id="address-field" @onInput={{this.onInput}} />`);

    assert.dom('[data-test-mox-label]').includesText('Address');
    assert.dom('[data-test-mox-label]').hasAttribute('for', 'address-field');
    assert.dom('[data-test-mox-input]').hasAttribute('id', 'address-field');
  });

  test('it allows disabling the input', async function(assert) {
    this.set('onInput', () => {});

    await render(hbs`<Mox::Input @onInput={{this.onInput}} disabled />`);

    assert.dom('[data-test-mox-input]').isDisabled();
  });

  test('the disabled input state is accessible', async function(assert) {
    this.set('onInput', () => {});

    await render(hbs`<Mox::Input @onInput={{this.onInput}} @label="Address" @id="address-field" disabled />`);
    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });

  test('the disabled input state used together with an external label is accessible', async function(assert) {
    this.set('onInput', () => {});

    await render(hbs`
      <label for="address-field">Address</label>
      <Mox::Input @onInput={{this.onInput}} id="address-field" disabled />
    `);
    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });
});
