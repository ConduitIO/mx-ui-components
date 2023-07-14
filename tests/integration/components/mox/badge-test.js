import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/badge', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the badge with the default color', async function (assert) {
    await render(hbs`<Mox::Badge>Badge text</Mox::Badge>`);

    assert.strictEqual(this.element.textContent.trim(), 'Badge text');
    assert.dom('[data-test-badge]').hasClass('bg-gray-600');
    assert.dom('[data-test-badge]').hasClass('text-white');
  });

  test('it renders a healthy badge', async function (assert) {
    await render(hbs`<Mox::Badge @status='healthy'>Healthy</Mox::Badge>`);

    assert.dom('[data-test-badge]').hasClass('bg-green-600');
    assert.dom('[data-test-badge]').hasClass('text-white');
  });

  test('it renders a caution badge', async function (assert) {
    await render(hbs`<Mox::Badge @status='caution'>Caution</Mox::Badge>`);

    assert.dom('[data-test-badge]').hasClass('bg-yellow-300');
    assert.dom('[data-test-badge]').hasClass('text-orange-800');
  });

  test('it renders a danger badge', async function (assert) {
    await render(hbs`<Mox::Badge @status='danger'>Danger</Mox::Badge>`);

    assert.dom('[data-test-badge]').hasClass('bg-red-600');
    assert.dom('[data-test-badge]').hasClass('text-white');
  });

  test('it renders a neutral badge', async function (assert) {
    await render(hbs`<Mox::Badge @status='neutral'>Neutral</Mox::Badge>`);

    assert.dom('[data-test-badge]').hasClass('bg-gray-600');
    assert.dom('[data-test-badge]').hasClass('text-white');
  });
});
