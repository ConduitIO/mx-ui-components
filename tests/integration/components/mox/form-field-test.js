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
      {{!-- template-lint-disable no-duplicate-id  --}}
      <Mox::FormField @id="form-field-example-1">
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
            @id="form-field-example-1"
            @toggleAction={{this.toggleAction}}
          />
        </:controls>
      </Mox::FormField>
      {{!-- template-lint-enable no-duplicate-id  --}}
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

  module('dark mode', function () {
    test('it renders the theme correctly', async function (assert) {
      await render(hbs`
       {{!-- template-lint-disable no-duplicate-id  --}}
        <div class="dark bg-gray-900">
          <Mox::FormField @id="form-field-example-2">
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
                @id="form-field-example-2"
                @toggleAction={{this.toggleAction}}
              />
            </:controls>
          </Mox::FormField>
        </div>
        {{!-- template-lint-enable no-duplicate-id  --}}
      `);

      assert.dom('[data-test-mox-form-field]').hasStyle({
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(31, 41, 55)',
        borderColor: 'rgb(107, 114, 128)',
      });

      assert.dom('[data-test-mox-form-field-icon]').hasStyle({
        backgroundColor: 'rgb(17, 24, 39)',
        color: 'rgb(255, 255, 255)',
      });

      assert.dom('[data-test-mox-form-field-title]').hasStyle({
        color: 'rgb(255, 255, 255)',
      });

      assert.dom('[data-test-mox-form-field-description]').hasStyle({
        color: 'rgb(209, 213, 219)',
      });
    });

    test('it is accessible', async function (assert) {
      await render(hbs`
       {{!-- template-lint-disable no-duplicate-id  --}}
        <div class="dark bg-gray-900">
          <Mox::FormField @id="form-field-example-2">
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
                @id="form-field-example-2"
                @toggleAction={{this.toggleAction}}
              />
            </:controls>
          </Mox::FormField>
        </div>
        {{!-- template-lint-enable no-duplicate-id  --}}
      `);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });

  module('light mode', function () {
    test('it renders the theme correctly', async function (assert) {
      await render(hbs`
       {{!-- template-lint-disable no-duplicate-id  --}}
        <div class="bg-gray-50">
          <Mox::FormField @id="form-field-example-2">
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
                @id="form-field-example-2"
                @toggleAction={{this.toggleAction}}
              />
            </:controls>
          </Mox::FormField>
        </div>
        {{!-- template-lint-enable no-duplicate-id  --}}
      `);

      assert.dom('[data-test-mox-form-field]').hasStyle({
        color: 'rgb(31, 41, 55)',
        backgroundColor: 'rgb(249, 250, 251)',
        borderColor: 'rgb(209, 213, 219)',
      });

      assert.dom('[data-test-mox-form-field-icon]').hasStyle({
        backgroundColor: 'rgb(229, 231, 235)',
        color: 'rgb(31, 41, 55)',
      });

      assert.dom('[data-test-mox-form-field-title]').hasStyle({
        color: 'rgb(31, 41, 55)',
      });

      assert.dom('[data-test-mox-form-field-description]').hasStyle({
        color: 'rgb(107, 114, 128)',
      });
    });

    test('it is accessible', async function (assert) {
      await render(hbs`
       {{!-- template-lint-disable no-duplicate-id  --}}
        <div class="bg-gray-50">
          <Mox::FormField @id="form-field-example-2">
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
                @id="form-field-example-2"
                @toggleAction={{this.toggleAction}}
              />
            </:controls>
          </Mox::FormField>
        </div>
        {{!-- template-lint-enable no-duplicate-id  --}}
      `);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
