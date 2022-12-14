import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/search-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('onInput', () => {
      /* noop */
    });

    await render(
      hbs`<Mxa::SearchInput @onInput={{this.onInput}} @placeholder="Astro Boy" />`
    );
    assert.dom('[data-test-mxa-search-input]').exists();
    assert.dom('[data-test-mxa-search-input-label]').exists();
    assert
      .dom('[data-test-mxa-search-input]')
      .hasAttribute('placeholder', 'Astro Boy');
  });

  test('it allows triggering searches on user input', async function (assert) {
    assert.expect(1);

    this.set('onInput', (event) => {
      assert.equal(event.target.value, 'Lady Oscar');
    });

    await render(hbs`<Mxa::SearchInput @onInput={{this.onInput}} />`);
    await fillIn('[data-test-mxa-search-input]', 'Lady Oscar');
  });

  test('it is accessible', async function (assert) {
    this.set('onInput', () => {
      /* noop */
    });

    await render(hbs`<Mxa::SearchInput @onInput={{this.onInput}} />`);

    // the input field is labelled correctly
    let inputId = find('[data-test-mxa-search-input]').id;
    assert
      .dom('[data-test-mxa-search-input-label]')
      .hasAttribute('for', inputId);

    await a11yAudit();
    assert.ok(true, 'no other accessibility errors detected');
  });
});
