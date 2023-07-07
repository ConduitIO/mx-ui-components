import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/theme-switch', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('toggleAction', sinon.spy());
    this.set('label', 'Paradis');
  });

  test('it displays a label for screenreader users (set via argument)', async function (assert) {
    await render(
      hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} @label={{this.label}} />`
    );
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Paradis');
  });

  test('it displays a label for screenreader users (fallback)', async function (assert) {
    await render(hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} />`);
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Use dark mode');
  });

  test('it is accessible with an external label', async function (assert) {
    await render(hbs`
      <label for="my-field-id">Toggle 1</label>
      <Mox::ThemeSwitch @toggleAction={{this.toggleAction}} @id="my-field-id" />
    `);
    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it is accessible with the default label', async function (assert) {
    await render(hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} />`);
    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it allows unchecking the component externally', async function (assert) {
    await render(
      hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} @isChecked={{false}} />`
    );

    assert.dom('[data-test-mox-theme-switch-current="dark"]').doesNotExist();
    assert.dom('[data-test-mox-theme-switch-current="light"]').exists();
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Use dark mode');
  });

  test('it allows checking the component externally', async function (assert) {
    await render(
      hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} @isChecked={{true}} />`
    );

    assert.dom('[data-test-mox-theme-switch-current="light"]').doesNotExist();
    assert.dom('[data-test-mox-theme-switch-current="dark"]').exists();
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Use light mode');
  });

  test('it triggers the external action when switching the toggle', async function (assert) {
    await render(hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} />`);
    await click('[data-test-mox-theme-switch]');

    assert.true(this.toggleAction.calledOnce);
  });

  test('it updates the UI when switching the toggle', async function (assert) {
    await render(hbs`<Mox::ThemeSwitch @toggleAction={{this.toggleAction}} />`);

    assert.dom('[data-test-mox-theme-switch-current="dark"]').doesNotExist();
    assert.dom('[data-test-mox-theme-switch-current="light"]').exists();
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Use dark mode');

    await click('[data-test-mox-theme-switch]');

    assert.dom('[data-test-mox-theme-switch-current="light"]').doesNotExist();
    assert.dom('[data-test-mox-theme-switch-current="dark"]').exists();
    assert
      .dom('[data-test-mox-theme-switch]')
      .hasAttribute('aria-label', 'Use light mode');
  });
});
