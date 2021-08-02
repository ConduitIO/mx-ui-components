import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/tags-input', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    const availableTags = ['attack', 'beast', 'colossal'];
    this.set('availableTags', availableTags);
    await render(hbs`<Mxa::TagsInput @availableTags={{this.availableTags}} />`);
  });

  test('it displays no tags when there are none that match the input', async function(assert) {
    await fillIn('[data-test-tags-input]', 'founding');
    assert.dom('[data-test-tags-found]').doesNotExist();
  });

  test('it displays tag results when they match the input', async function(assert) {
    await fillIn('[data-test-tags-input]', 'att');
    assert.dom('[data-test-tags-found="attack"]').exists();
  });

  test('it adds the matched tag to the input when clicked', async function(assert) {
    await fillIn('[data-test-tags-input]', 'att');
    await click('[data-test-tags-found="attack"]');
    assert.dom('[data-test-tags-selected="attack"]').exists();
  });

  test('it removes the tag when the selected tag x is clicked', async function(assert) {
    await fillIn('[data-test-tags-input]', 'att');
    await click('[data-test-tags-found="attack"]');
    await click('[data-test-tags-selected="attack"] [data-test-tags-remove-button]');
    assert.dom('[data-test-tags-selected="attack"]').doesNotExist();
  });

  skip('it is accessible', async function(assert) {
    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
