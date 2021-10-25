import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { rawTimeout, timeout } from 'ember-concurrency';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import sinon from 'sinon';

module('Integration | Component | mxa/async-button', function (hooks) {
  setupRenderingTest(hooks);

  module('has all style formats as default button controls', function () {
    test('it renders the primary button by default', async function (assert) {
      await render(hbs`<Mxa::AsyncButton />`);

      assert.dom('button').hasClass('mxa-btn-primary');
    });

    test('it renders the primary button', async function (assert) {
      await render(hbs`<Mxa::AsyncButton @buttonType='primary' />`);

      assert.dom('button').hasClass('mxa-btn-primary');
    });

    test('it renders the secondary button', async function (assert) {
      await render(hbs`<Mxa::AsyncButton @buttonType='secondary' />`);

      assert.dom('button').hasClass('mxa-btn-secondary');
    });

    test('it renders the tertiary button', async function (assert) {
      await render(hbs`<Mxa::AsyncButton @buttonType='tertiary' />`);

      assert.dom('button').hasClass('mxa-btn-tertiary');
    });

    test('it renders the danger button', async function (assert) {
      await render(hbs`<Mxa::AsyncButton @buttonType='danger' />`);

      assert.dom('button').hasClass('bg-saffron-100');
    });
  });

  module('loading states', function (hooks) {
    hooks.beforeEach(function () {
      this.onClick = function () {
        return timeout(600);
      };
    });

    test('it hides the loading spinner by default', async function (assert) {
      await render(
        hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>Synth</Mxa::AsyncButton>`
      );

      assert.dom('[data-test-async-button-loading]').doesNotExist();
      assert.dom('[data-test-async-button]').hasText('Synth');
    });

    test('it displays the loading spinner', async function (assert) {
      await render(
        hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>Synth</Mxa::AsyncButton>`
      );
      click('[data-test-async-button]');
      await waitFor('[data-test-async-button-loading]');

      assert.dom('[data-test-async-button-loading]').exists({ count: 1 });
      assert
        .dom('[data-test-async-button-loading] svg')
        .hasClass('animate-spin');
    });

    test('it hides the loading spinner once the loading task has finished', async function (assert) {
      await render(
        hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>Synth</Mxa::AsyncButton>`
      );
      click('[data-test-async-button]');

      await waitFor('[data-test-async-button-loading]');
      await waitUntil(
        function () {
          return find('[data-test-async-button]').textContent.includes('Synth');
        },
        { timeout: 2000 }
      );

      assert.dom('[data-test-async-button-loading]').doesNotExist();
      assert.dom('[data-test-async-button]').hasText('Synth');
    });

    test('it retains element width regardless of loading state', async function (assert) {
      await render(
        hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>Synthetic Background Music</Mxa::AsyncButton>`
      );

      const buttonElement = find('[data-test-async-button]');
      const initialWidth = buttonElement.offsetWidth;

      // button has the same width initially...
      assert.equal(buttonElement.offsetWidth, initialWidth);

      click('[data-test-async-button]');
      await waitFor('[data-test-async-button-loading]');

      // ...as it has while loading...
      assert.equal(buttonElement.offsetWidth, initialWidth);

      await waitUntil(
        function () {
          return find('[data-test-async-button]').textContent.includes(
            'Synthetic Background Music'
          );
        },
        { timeout: 2000 }
      );

      // ...as it has after it finished loading.
      assert.equal(buttonElement.offsetWidth, initialWidth);
    });
  });

  module('async test waiting', async function () {
    hooks.beforeEach(async function () {
      const fakeTimeout = () => {
        // Add some lag time
        // and use rawTimeout which does not signal to test waiters
        return rawTimeout(600);
      };

      this.onClick = sinon.spy(fakeTimeout);

      await render(
        hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>Synth</Mxa::AsyncButton>`
      );
    });

    test('the async action is settled internally by the test helpers', async function (assert) {
      // Use click wait helper which calls settled() internally
      await click('[data-test-async-button]');

      // Ensure the action actually happened
      assert.ok(this.onClick.calledOnce);
      assert.dom('[data-test-async-button]').hasText('Synth');
    });
  });

  test('it is accessible', async function (assert) {
    await render(
      hbs`<Mxa::AsyncButton @onClick={{this.onClick}}>accessibility</Mxa::AsyncButton>`
    );

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
