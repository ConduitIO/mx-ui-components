import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/form-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('toggleAction', () => {});
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::FormField @id="form-field-example">
        <:icon>
          replace me with an icon
        </:icon>
        <:title>
          Encrypt connecting with SSL/TLS
        </:title>
        <:description>
          We recommend encrypting connections to your Resources.
        </:description>
        <:controls>
          <Mox::Toggle
            @id="form-field-example"
            @toggleAction={{this.toggleAction}}
          />
        </:controls>
      </Mox::FormField>
    `);

    assert
      .dom('[data-test-mox-form-field]')
      .includesText('replace me with an icon');
    assert
      .dom('[data-test-mox-form-field]')
      .includesText('Encrypt connecting with SSL/TLS');
    assert
      .dom('[data-test-mox-form-field]')
      .includesText('We recommend encrypting');
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::FormField @id="form-field-example">
          <:icon>
            replace me with an icon
          </:icon>
          <:title>
            Encrypt connecting with SSL/TLS
          </:title>
          <:description>
            We recommend encrypting connections to your Resources.
          </:description>
          <:controls>
            <Mox::Toggle
              @id="form-field-example"
              @toggleAction={{this.toggleAction}}
            />
          </:controls>
        </Mox::FormField>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
