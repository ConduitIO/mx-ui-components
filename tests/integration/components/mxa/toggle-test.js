import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/toggle', function (hooks) {
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
      hbs`<Mxa::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} />`
    );
    assert.dom('[data-test-toggle-label]').containsText('Paradis');
  });

  test('it is accessible with the default label', async function (assert) {
    await render(
      hbs`<Mxa::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} />`
    );
    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it is accessible with an external label', async function (assert) {
    await render(hbs`
      <label for="my-field-id">Toggle 1</label>
      <Mxa::Toggle @toggleAction={{this.toggleAction}} @id="my-field-id" />
    `);
    await a11yAudit();
    assert.ok(true, 'no a11y detected');
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

    await render(hbs`<Mxa::Toggle @toggleAction={{this.toggleAction}} />`);
  });

  module('on toggle click', function (hooks) {
    hooks.beforeEach(async function () {
      await render(
        hbs`<Mxa::Toggle @toggleAction={{this.toggleAction}} @label={{this.label}} />`
      );
      await click('[data-test-toggle]');
    });

    test('it switches the toggle', async function (assert) {
      assert.true(this.toggleAction.calledOnce);
    });

    test('it triggers the toggleAction', async function (assert) {
      assert.true(this.toggleAction.calledOnce);
    });
  });
});
