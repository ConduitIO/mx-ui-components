import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/badge', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the badge', async function(assert) {
    await render(hbs`<Mxa::Badge>Badge text</Mxa::Badge>`);

    assert.equal(this.element.textContent.trim(), 'Badge text');
  });

  test('it has a default color', async function(assert) {
    await render(hbs`<Mxa::Badge>Badge text</Mxa::Badge>`);

    assert.dom('[data-test-badge]').hasClass('bg-slate-100');
  });

  test('it can have a different color', async function(assert) {
    await render(
      hbs`<Mxa::Badge @color='bg-saffron-100'>Badge text</Mxa::Badge>`
    );

    assert.dom('[data-test-badge]').hasClass('bg-saffron-100');
  });
});
