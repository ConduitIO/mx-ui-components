import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  click,
  find,
  resetOnerror,
  setupOnerror,
  waitUntil,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/toggle', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('toggleAction', sinon.spy());
    this.set('label', 'Paradis');
  });

  hooks.afterEach(function () {
    resetOnerror();
  });

  test('it displays the label', async function (assert) {
    await render(
      hbs`<Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} />`
    );
    assert.dom('[data-test-mox-toggle-label]').containsText('Paradis');
  });

  test('it throws an error if it is not configured in an accessible way', async function (assert) {
    assert.expect(2);

    setupOnerror((error) => {
      assert.ok(error.message.includes(`Assertion Failed`));
      assert.ok(
        error.message.includes(
          `To render an accessible checkbox element, you must pass a @label argument`
        )
      );
    });

    await render(hbs`<Mox::Toggle @toggleAction={{this.toggleAction}} />`);
  });

  module('on toggle click', function (hooks) {
    hooks.beforeEach(async function () {
      await render(
        hbs`<Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} />`
      );
      await click('[data-test-mox-toggle]');
    });

    test('it switches the toggle', async function (assert) {
      assert.true(this.toggleAction.calledOnce);
    });

    test('it triggers the toggleAction', async function (assert) {
      assert.true(this.toggleAction.calledOnce);
    });
  });

  module('dark mode', function () {
    test('it renders correctly (off)', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );

      assert.dom('[data-test-mox-toggle]').hasClass('dark:bg-gray-400');
      assert.dom('[data-test-mox-toggle]').hasStyle({
        color: 'rgb(37, 99, 235)',
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgb(156, 163, 175)',
      });
      assert.dom('[data-test-mox-toggle-label]').hasStyle({
        color: 'rgb(209, 213, 219)',
      });
    });

    test('it renders correctly (on)', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} @isChecked={{true}} /></div>`
      );

      assert.dom('[data-test-mox-toggle]').hasClass('dark:checked:bg-cyan-500');
      assert.dom('[data-test-mox-toggle]').hasStyle({
        color: 'rgb(6, 182, 212)',
        backgroundColor: 'rgb(6, 182, 212)',
      });
      assert.dom('[data-test-mox-toggle-label]').hasStyle({
        color: 'rgb(209, 213, 219)',
      });
    });

    test('it is accessible with the default label (off)', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('it is accessible with the default label (on)', async function (assert) {
      await render(
        hbs`<div class="dark bg-gray-900"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );

      let toggle = find('[data-test-mox-toggle]');
      await click(toggle);
      await waitUntil(
        () => getComputedStyle(toggle).backgroundColor === 'rgb(6, 182, 212)'
      );

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('it is accessible with an external label', async function (assert) {
      await render(hbs`
        <div class="dark bg-gray-900">
          <label class="text-gray-300" for="my-field-id">Toggle 1</label>
          <Mox::Toggle @toggleAction={{this.toggleAction}} @id="my-field-id" />
        </div>
      `);
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });

  module('light mode', function () {
    test('it renders correctly (off)', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );
      assert.dom('[data-test-mox-toggle]').hasClass('dark:bg-gray-400');
      assert.dom('[data-test-mox-toggle]').hasStyle({
        color: 'rgb(37, 99, 235)',
        borderColor: 'rgb(209, 213, 219)',
        backgroundColor: 'rgb(209, 213, 219)',
      });
      assert.dom('[data-test-mox-toggle-label]').hasStyle({
        color: 'rgb(55, 65, 81)',
      });
    });

    test('it renders correctly (on)', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} @isChecked={{false}} /></div>`
      );

      assert.dom('[data-test-mox-toggle]').hasClass('dark:checked:bg-cyan-500');
      assert.dom('[data-test-mox-toggle]').hasStyle({
        backgroundColor: 'rgb(209, 213, 219)',
        color: 'rgb(37, 99, 235)',
      });
      assert.dom('[data-test-mox-toggle-label]').hasStyle({
        color: 'rgb(55, 65, 81)',
      });
    });

    test('it is accessible with the default label (off)', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('it is accessible with the default label (on)', async function (assert) {
      await render(
        hbs`<div class="bg-gray-50"><Mox::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} /></div>`
      );

      let toggle = find('[data-test-mox-toggle]');
      await click(toggle);
      await waitUntil(
        () => getComputedStyle(toggle).backgroundColor === 'rgb(16, 185, 129)'
      );

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('it is accessible with an external label', async function (assert) {
      await render(hbs`
        <div class="bg-gray-50">
          <label class="text-gray-700" for="my-field-id">Toggle 1</label>
          <Mox::Toggle @toggleAction={{this.toggleAction}} @id="my-field-id" />
        </div>
      `);
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
