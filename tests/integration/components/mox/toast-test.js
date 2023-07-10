import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/toast', function (hooks) {
  setupRenderingTest(hooks);

  module('styling: dark mode', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        <div class="dark bg-gray-900 p-4">
          <Mox::Toast @toastType={{this.type}}>
            <:body>This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.</:body>
            <:controls as |controls|>
              <controls.dismissAction>
                Dismiss
              </controls.dismissAction>
            </:controls>
          </Mox::Toast>
        </div>
      `);
    });

    test('it is accessible', async function (assert) {
      await a11yAudit();
      assert.ok(true, 'no a11y errors detected');
    });

    test('it renders a success toast', async function (assert) {
      this.set('type', 'success');

      assert.dom('[data-test-toast-title]').hasText('success!');
      assert.dom('[data-test-toast-title]').hasClass('text-green-500');
      assert.dom('[data-test-toast-marker]').hasClass('bg-green-500');
    });

    test('it renders an error toast', async function (assert) {
      this.set('type', 'error');

      assert.dom('[data-test-toast-title]').hasText('action required');
      assert.dom('[data-test-toast-title]').hasClass('text-red-500');
      assert.dom('[data-test-toast-marker]').hasClass('bg-red-500');
    });

    test('it renders a warning toast', async function (assert) {
      this.set('type', 'warning');

      assert.dom('[data-test-toast-title]').hasText('heads up');
      assert.dom('[data-test-toast-title]').hasClass('text-yellow-400');
      assert.dom('[data-test-toast-marker]').hasClass('bg-yellow-400');
    });

    test('it renders an info toast', async function (assert) {
      this.set('type', 'info');

      assert.dom('[data-test-toast-title]').hasText('heads up');
      assert.dom('[data-test-toast-title]').hasClass('text-cyan-500');
      assert.dom('[data-test-toast-marker]').hasClass('bg-cyan-500');
    });
  });

  test('it renders the content', async function (assert) {
    await render(hbs`
    <Mox::Toast>
      <:body>This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.</:body>
      <:controls>
        <Mox::Button @buttonType="secondary" @small={{true}}>
          Dismiss
        </Mox::Button>
      </:controls>
    </Mox::Toast>
    `);

    assert
      .dom('[data-test-toast]')
      .containsText(
        'This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.'
      );

    assert.dom('[data-test-toast-controls] button').hasText('Dismiss');
  });
});
