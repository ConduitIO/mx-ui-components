import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  fillIn,
  find,
  click,
  resetOnerror,
  setupOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/tags-input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    const availableTags = ['attack', 'beast', 'colossal'];
    this.set('availableTags', availableTags);
  });

  module('with label block', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        <Mxa::TagsInput @availableTags={{this.availableTags}} @placeholder="e.g. Florist">
          <:label-main>Profession</:label-main>
          <:label-extra>Describe what you do for a living or as a volunteer</:label-extra>
        </Mxa::TagsInput>
      `);
    });

    test('it renders', async function (assert) {
      assert.dom('[data-test-tags-input').exists();
      assert
        .dom('[data-test-tags-input')
        .hasAttribute('placeholder', 'e.g. Florist');
      assert.dom('[data-test-tags-input-label').exists();
      assert.dom('[data-test-tags-input-label-main').includesText('Profession');
      assert
        .dom('[data-test-tags-input-label-extra')
        .includesText('what you do for a living');
    });

    test('it displays no tags when there are none that match the input', async function (assert) {
      await fillIn('[data-test-tags-input]', 'founding');
      assert.dom('[data-test-tags-found]').doesNotExist();
    });

    test('it displays tag results when they match the input', async function (assert) {
      await fillIn('[data-test-tags-input]', 'att');
      assert.dom('[data-test-tags-found="attack"]').exists();
    });

    test('it adds the matched tag to the input when clicked', async function (assert) {
      await fillIn('[data-test-tags-input]', 'att');
      await click('[data-test-tags-found="attack"]');
      assert.dom('[data-test-tags-selected="attack"]').exists();
    });

    test('it removes the tag when the selected tag x is clicked', async function (assert) {
      await fillIn('[data-test-tags-input]', 'att');
      await click('[data-test-tags-found="attack"]');
      await click(
        '[data-test-tags-selected="attack"] [data-test-tags-remove-button]'
      );
      assert.dom('[data-test-tags-selected="attack"]').doesNotExist();
    });

    test('it allows to readd a tag that has been removed previously', async function (assert) {
      await fillIn('[data-test-tags-input]', 'att');
      await click('[data-test-tags-found="attack"]');
      await fillIn('[data-test-tags-input]', 'bea');
      await click('[data-test-tags-found="beast"]');

      assert.dom('[data-test-tags-selected="attack"]').exists();
      assert.dom('[data-test-tags-selected="beast"]').exists();

      await click(
        '[data-test-tags-selected="attack"] [data-test-tags-remove-button]'
      );
      await fillIn('[data-test-tags-input]', 'att');
      await click('[data-test-tags-found="attack"]');

      assert.dom('[data-test-tags-selected="attack"]').exists();
      assert.dom('[data-test-tags-selected="beast"]').exists();
    });

    test('it is accessible', async function (assert) {
      await a11yAudit();
      // the input field is labelled correcly
      let inputId = find('[data-test-tags-input]').id;
      assert.dom('[data-test-tags-input-label').hasAttribute('for', inputId);
      // no other a11y issues have been detected
      assert.ok(true, 'no a11y detected');
    });
  });

  module('without label block', function (hooks) {
    hooks.beforeEach(async function (assert) {
      setupOnerror((error) => {
        assert.ok(error.message.includes(`Assertion Failed`));
        assert.ok(
          error.message.includes(
            `To render an accessible input element, you must pass at least a <:label-main> block`
          )
        );
      });
    });

    hooks.afterEach(function () {
      resetOnerror();
    });

    test('it issues an accessibility warning', async function (assert) {
      assert.expect(2);

      await render(hbs`
        <Mxa::TagsInput @availableTags={{this.availableTags}} />
      `);
    });
  });
});
