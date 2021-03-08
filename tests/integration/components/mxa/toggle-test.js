import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | mxa/toggle', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    this.set('toggleAction', sinon.spy());
    await render(hbs`<Mxa::Toggle @toggleAction={{this.toggleAction}} @label='Paradis' />`);
  });

  test('it displays the label', function(assert) {
    assert.dom('[data-test-toggle-label]').containsText('Paradis');
  });

  module('on toggle click', function(hooks) {
    hooks.beforeEach(async function() {
      await click('[data-test-toggle]');
    });

    test('it switches the toggle', async function(assert) {
      assert.true(this.toggleAction.calledOnce);
    });


    test('it triggers the toggleAction', async function(assert) {
      assert.true(this.toggleAction.calledOnce);
    });
  });
});
