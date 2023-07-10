import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/status-ball', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the status with the default color', async function (assert) {
    await render(hbs`<Mox::StatusBall/>`);

    assert.dom('[data-test-status-ball]').hasClass('bg-red-600');
  });

  test('it renders a healthy status', async function (assert) {
    await render(hbs`<Mox::StatusBall @status="healthy"/>`);

    assert.dom('[data-test-status-ball]').hasClass('bg-green-600');
  });

  test('it renders a caution status', async function (assert) {
    await render(hbs`<Mox::StatusBall @status="caution"/>`);

    assert.dom('[data-test-status-ball]').hasClass('bg-yellow-300');
  });

  test('it renders a danger status', async function (assert) {
    await render(hbs`<Mox::StatusBall @status="danger"/>`);

    assert.dom('[data-test-status-ball]').hasClass('bg-red-600');
  });
});
