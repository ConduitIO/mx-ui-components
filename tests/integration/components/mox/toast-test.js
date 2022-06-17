import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/toast', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
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

  test('it is accessible', async function (assert) {
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

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it renders a success toast', async function (assert) {
    await render(hbs`
    <Mox::Toast @toastType="success">
      <:body>This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.</:body>
      <:controls>
        <Mox::Button @buttonType="secondary" @small={{true}}>
          Dismiss
        </Mox::Button>
      </:controls>
    </Mox::Toast>
    `);

    assert.dom('[data-test-toast-title]').hasText('success!');
    assert.dom('[data-test-toast-title]').hasClass('text-green-500');
    assert.dom('[data-test-toast-marker]').hasClass('bg-green-500');
  });

  test('it renders an error toast', async function (assert) {
    await render(hbs`
    <Mox::Toast @toastType="error">
      <:body>This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.</:body>
      <:controls>
        <Mox::Button @buttonType="secondary" @small={{true}}>
          Dismiss
        </Mox::Button>
      </:controls>
    </Mox::Toast>
    `);

    assert.dom('[data-test-toast-title]').hasText('action required');
    assert.dom('[data-test-toast-title]').hasClass('text-red-500');
    assert.dom('[data-test-toast-marker]').hasClass('bg-red-500');
  });
});
