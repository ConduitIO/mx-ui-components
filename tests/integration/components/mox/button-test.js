import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render, waitFor, waitUntil } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { rawTimeout, timeout } from 'ember-concurrency';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import sinon from 'sinon';

module('Integration | Component | mox/button', function (hooks) {
  setupRenderingTest(hooks);

  module('default button', function () {
    test('it renders the primary button by default', async function (assert) {
      await render(hbs`<Mox::Button />`);

      assert.dom('[data-test-mox-button]').exists();
      assert.dom('button').hasClass('border-cyan-500');
      assert.dom('button').hasClass('active:text-cyan-500');
      assert.dom('button').hasClass('text-white');
    });

    test('it renders the primary button', async function (assert) {
      await render(hbs`<Mox::Button @buttonType='primary' />`);

      assert.dom('button').hasClass('border-cyan-500');
      assert.dom('button').hasClass('active:text-cyan-500');
      assert.dom('button').hasClass('text-white');
    });

    test('it renders the secondary button', async function (assert) {
      await render(hbs`<Mox::Button @buttonType='secondary' />`);

      assert.dom('button').hasClass('border-white');
      assert.dom('button').hasClass('active:text-gray-300');
      assert.dom('button').hasClass('active:border-gray-300');
      assert.dom('button').hasClass('text-white');
    });

    test('it renders the danger button', async function (assert) {
      await render(hbs`<Mox::Button @buttonType='danger' />`);

      assert.dom('button').hasClass('border-red-500');
      assert.dom('button').hasClass('active:text-white');
      assert.dom('button').hasClass('text-red-500');
    });

    test('it renders the the button in its disabled state', async function (assert) {
      await render(hbs`<Mox::Button @isDisabled={{true}} />`);

      assert.dom('button').hasStyle({
        backgroundColor: 'rgb(31, 41, 55)',
        color: 'rgb(209, 213, 219)',
      });
    });

    test('it renders the the button - small', async function (assert) {
      await render(hbs`<Mox::Button @small={{true}} />`);

      assert.dom('button').hasClass('mxa-btn-small');
    });

    test('it renders the content on block invocation', async function (assert) {
      await render(hbs`<Mox::Button>Upload</Mox::Button>`);

      assert.dom('button').hasText('Upload');
    });

    test('it renders text that is passed via the @title argument', async function (assert) {
      await render(hbs`<Mox::Button @title="Download" />`);

      assert.dom('button').hasText('Download');
    });

    test('it renders default text when no content is provided', async function (assert) {
      await render(hbs`<Mox::Button />`);

      assert.dom('button').hasText('Submit');
    });

    module('color accessibility', function () {
      test('default', async function (assert) {
        await render(hbs`<Mox::Button />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });

      test('primary', async function (assert) {
        await render(hbs`<Mox::Button @buttonType="primary" />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });

      test('secondary', async function (assert) {
        await render(hbs`<Mox::Button @buttonType="secondary" />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });

      test('tertiary', async function (assert) {
        await render(hbs`<Mox::Button @buttonType="tertiary" />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });

      test('danger', async function (assert) {
        await render(hbs`<Mox::Button @buttonType="danger" />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });

      test('disabled', async function (assert) {
        await render(hbs`<Mox::Button @isDisabled={{true}} />`);

        await a11yAudit();
        assert.ok(true, 'no a11y detected');
      });
    });
  });

  module('async button (@onClick argument is set)', function (hooks) {
    hooks.beforeEach(function () {
      this.dummyAction = () => {};
    });

    module('has all style formats as default button controls', function () {
      test('it renders the primary button by default', async function (assert) {
        await render(hbs`<Mox::Button @onClick={{this.dummyAction}} />`);

        assert.dom('[data-test-mox-button]').exists();
        assert.dom('button').hasClass('border-cyan-500');
        assert.dom('button').hasClass('active:text-cyan-500');
        assert.dom('button').hasClass('text-white');
      });

      test('it renders the primary button', async function (assert) {
        await render(
          hbs`<Mox::Button @buttonType='primary' @onClick={{this.dummyAction}} />`
        );

        assert.dom('button').hasClass('border-cyan-500');
        assert.dom('button').hasClass('active:text-cyan-500');
        assert.dom('button').hasClass('text-white');
      });

      test('it renders the secondary button', async function (assert) {
        await render(
          hbs`<Mox::Button @buttonType='secondary' @onClick={{this.dummyAction}} />`
        );

        assert.dom('button').hasClass('border-white');
        assert.dom('button').hasClass('active:text-gray-300');
        assert.dom('button').hasClass('active:border-gray-300');
        assert.dom('button').hasClass('text-white');
      });

      test('it renders the danger button', async function (assert) {
        await render(
          hbs`<Mox::Button @buttonType='danger' @onClick={{this.dummyAction}} />`
        );

        assert.dom('button').hasClass('border-red-500');
        assert.dom('button').hasClass('active:text-white');
        assert.dom('button').hasClass('text-red-500');
      });

      test('it renders the the button in its disabled state', async function (assert) {
        await render(
          hbs`<Mox::Button @isDisabled={{true}} @onClick={{this.dummyAction}} />`
        );

        assert.dom('button').hasStyle({
          backgroundColor: 'rgb(31, 41, 55)',
          color: 'rgb(209, 213, 219)',
        });
      });

      test('it renders the the button - small', async function (assert) {
        await render(
          hbs`<Mox::Button @small={{true}} @onClick={{this.dummyAction}} />`
        );

        assert.dom('button').hasClass('mxa-btn-small');
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
          hbs`<Mox::Button @onClick={{this.onClick}}>Synth</Mox::Button>`
        );

        assert.dom('[data-test-mox-button-loading]').doesNotExist();
        assert.dom('[data-test-mox-button]').hasText('Synth');
      });

      test('it displays the loading spinner', async function (assert) {
        await render(
          hbs`<Mox::Button @onClick={{this.onClick}}>Synth</Mox::Button>`
        );
        click('[data-test-mox-button]');
        await waitFor('[data-test-mox-button-loading]');

        assert.dom('[data-test-mox-button-loading]').exists({ count: 1 });
        assert
          .dom('[data-test-mox-button-loading] svg')
          .hasClass('animate-spin');
      });

      test('it hides the loading spinner once the loading task has finished', async function (assert) {
        await render(
          hbs`<Mox::Button @onClick={{this.onClick}}>Synth</Mox::Button>`
        );
        click('[data-test-mox-button]');

        await waitFor('[data-test-mox-button-loading]');
        await waitUntil(
          function () {
            return find('[data-test-mox-button]').textContent.includes('Synth');
          },
          { timeout: 2000 }
        );

        assert.dom('[data-test-mox-button-loading]').doesNotExist();
        assert.dom('[data-test-mox-button]').hasText('Synth');
      });

      test('it retains element width regardless of loading state', async function (assert) {
        await render(
          hbs`<Mox::Button @onClick={{this.onClick}}>Synthetic Background Music</Mox::Button>`
        );

        const buttonElement = find('[data-test-mox-button]');
        const initialWidth = buttonElement.offsetWidth;

        // button has the same width initially...
        assert.equal(buttonElement.offsetWidth, initialWidth);

        click('[data-test-mox-button]');
        await waitFor('[data-test-mox-button-loading]');

        // ...as it has while loading...
        assert.equal(buttonElement.offsetWidth, initialWidth);

        await waitUntil(
          function () {
            return find('[data-test-mox-button]').textContent.includes(
              'Synthetic Background Music'
            );
          },
          { timeout: 2000 }
        );

        // ...as it has after it finished loading.
        assert.equal(buttonElement.offsetWidth, initialWidth);
      });
    });

    module('async test waiting', function (hooks) {
      hooks.beforeEach(async function () {
        const fakeTimeout = () => {
          // Add some lag time
          // Use rawTimeout which does not signal to test waiters
          return rawTimeout(600);
        };

        this.onClick = sinon.spy(fakeTimeout);

        await render(
          hbs`<Mox::Button @onClick={{this.onClick}}>Synth</Mox::Button>`
        );
      });

      test('the async action is settled internally by the test helpers', async function (assert) {
        // Use click wait helper which calls settled() internally
        await click('[data-test-mox-button]');

        // Ensure the action was actually called
        assert.ok(this.onClick.calledOnce);
        assert.dom('[data-test-mox-button]').hasText('Synth');
      });
    });

    test('it is accessible', async function (assert) {
      await render(
        hbs`<Mox::Button @onClick={{this.onClick}}>accessibility</Mox::Button>`
      );

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
