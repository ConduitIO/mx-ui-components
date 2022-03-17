import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, click } from '@ember/test-helpers';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Unit | Component | mox/global-header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the header correctly', async function (assert) {
    await render(hbs`
	<Mox::GlobalHeader>
		<:env-switcher>
            <div>Env switcher</div>
		</:env-switcher>
		<:help-menu>
            <div>Help menu</div>
		</:help-menu>
		<:user-menu>
            <div>User menu</div>
		</:user-menu>
	</Mox::GlobalHeader>
    `);

    assert.dom('[data-test-global-header]').hasTagName('header');
    assert.dom('[data-test-global-header]').containsText('Env switcher');
    assert.dom('[data-test-global-header]').containsText('Help menu');
    assert.dom('[data-test-global-header]').containsText('User menu');
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::GlobalHeader>
          <:env-switcher>
            <div>Env switcher</div>
          </:env-switcher>
          <:help-menu>
            <div>Help menu</div>
          </:help-menu>
          <:user-menu>
            <div>User menu</div>
          </:user-menu>
        </Mox::GlobalHeader>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
    assert.dom('[data-test-global-header-logo]').hasAttribute('aria-label', 'Go to Homepage');
  });
});
