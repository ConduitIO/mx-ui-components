import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/modal-dialog', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('dummyAction', () => {});
  });

  test('it renders', async function(assert) {
    await render(hbs`
      <Mxa::ModalDialog @onDismiss={{this.dummyAction}}>
        template block text
      </Mxa::ModalDialog>
    `);

    assert.dom('[data-test-modal-dialog]').exists();
    assert.dom('[data-test-modal-dialog-content]').includesText('template block text');
  });

  test('it triggers the onDismiss action when clicking the closing control', async function(assert) {
    assert.expect(1);

    this.set('onDismiss', () => {
      assert.ok(true);
    });

    await render(hbs`
      <Mxa::ModalDialog @onDismiss={{this.onDismiss}}>
        template block text
      </Mxa::ModalDialog>
    `);

    await click('[data-test-modal-dialog-close]');
  });
});
