import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | mxa/modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the onDismiss action when clicking outside the modal', async function (assert) {
    this.set('onDismiss', sinon.spy());

    await render(hbs`
      <Mxa::Modal @onDismiss={{this.onDismiss}}>
        MUDA MUDA MUDA
      </Mxa::Modal>
    `);

    await click('[data-test-modal-outside-trigger]');
    assert.ok(this.onDismiss.calledOnce);
  });
});
