import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/search-input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('onInput', () => {
      /* noop */
    });
  });

  test('it renders', async function (assert) {
    await render(hbs`<Mox::SearchInput @onInput={{this.onInput}} />`);
    assert.dom('[data-test-mox-search-input]').exists();
    assert.dom('[data-test-mox-search-input-label]').exists();
    assert
      .dom('[data-test-mox-search-input]')
      .hasAttribute('placeholder', 'Search...');
  });

  test('it allows placeholder customization', async function (assert) {
    await render(
      hbs`<Mox::SearchInput @onInput={{this.onInput}} @placeholder="Astro Boy" />`
    );
    assert
      .dom('[data-test-mox-search-input]')
      .hasAttribute('placeholder', 'Astro Boy');
  });

  test('it allows triggering searches on user input', async function (assert) {
    assert.expect(1);

    this.set('onInput', (value) => {
      assert.strictEqual(value, 'Lady Oscar');
    });

    await render(hbs`<Mox::SearchInput @onInput={{this.onInput}} />`);
    await fillIn('[data-test-mox-search-input]', 'Lady Oscar');
  });

  module('dark mode', function () {
    test('it renders', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900 p-4"><Mox::SearchInput @onInput={{this.onInput}} @placeholder="Astro Boy" /></div>`
      );
      assert.dom('[data-test-mox-search-input]').hasStyle({
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(31, 41, 55)',
        borderColor: 'rgb(107, 114, 128)',
      });
      assert.dom('[data-test-mox-search-input-label] span').hasClass('sr-only');
      assert.dom('[data-test-mox-search-input-icon]').hasStyle({
        color: 'rgb(255, 255, 255)',
      });
    });

    test('it is accessible', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900 p-4"><Mox::SearchInput @onInput={{this.onInput}} /></div>`
      );

      // the input field is labelled correctly
      let inputId = find('[data-test-mox-search-input]').id;
      assert
        .dom('[data-test-mox-search-input-label]')
        .hasAttribute('for', inputId);

      await a11yAudit();
      assert.ok(true, 'no other accessibility errors detected');
    });
  });

  module('light mode', function () {
    test('it renders', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50 p-4"><Mox::SearchInput @onInput={{this.onInput}} @placeholder="Astro Boy" /></div>`
      );
      assert.dom('[data-test-mox-search-input]').hasStyle({
        color: 'rgb(31, 41, 55)',
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(156, 163, 175)',
      });
      assert.dom('[data-test-mox-search-input-label] span').hasClass('sr-only');
      assert.dom('[data-test-mox-search-input-icon]').hasStyle({
        color: 'rgb(31, 41, 55)',
      });
    });

    test('it is accessible', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50 p-4"><Mox::SearchInput @onInput={{this.onInput}} /></div>`
      );

      // the input field is labelled correctly
      let inputId = find('[data-test-mox-search-input]').id;
      assert
        .dom('[data-test-mox-search-input-label]')
        .hasAttribute('for', inputId);

      await a11yAudit();
      assert.ok(true, 'no other accessibility errors detected');
    });
  });
});
