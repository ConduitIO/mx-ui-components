import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/text-area', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the onInput action on input', async function (assert) {
    this.set('onInput', sinon.spy());
    await render(hbs`<Mox::TextArea @onInput={{this.onInput}}/>`);

    await fillIn('[data-test-mox-text-area]', 'brett and james rule');

    assert.ok(this.onInput.called);
  });

  test('it displays an accessible input if a label text and an id is provded', async function (assert) {
    this.set('onInput', () => {});
    this.set('label', 'Address');

    await render(
      hbs`<Mox::TextArea @label={{this.label}} @id="address-field" @onInput={{this.onInput}} />`
    );

    assert.dom('[data-test-mox-label]').includesText('Address');
    assert.dom('[data-test-mox-label]').hasAttribute('for', 'address-field');
    assert.dom('[data-test-mox-text-area]').hasAttribute('id', 'address-field');
  });

  test('it allows disabling the input', async function (assert) {
    this.set('onInput', () => {});

    await render(hbs`<Mox::TextArea @onInput={{this.onInput}} disabled />`);

    assert.dom('[data-test-mox-text-area]').isDisabled();
  });

  test('it may display a validation error alongside the field', async function (assert) {
    this.set('onInput', () => {});

    await render(
      hbs`<Mox::TextArea @onInput={{this.onInput}} @error="Name can't be blank" />`
    );

    assert
      .dom('[data-test-mox-text-area-error]')
      .includesText(`Name can't be blank`);
  });

  module('dark mode', function () {
    test('the disabled input state is accessible (dark mode)', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
        <div class="dark bg-gray-900 p-4">
        <Mox::TextArea @onInput={{this.onInput}} @label="Address" @id="address-field" disabled />
        </div>`);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the disabled input state used together with an external label is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
        <div class="dark bg-gray-900 p-4">
        <label for="address-field">Address</label>
        <Mox::TextArea @onInput={{this.onInput}} id="address-field" disabled />
        </div>
      `);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the invalid input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="dark bg-gray-900 p-4"><Mox::TextArea @onInput={{this.onInput}} @label="Address" @id="address-field" @isValid={{false}} @error="Missing something?" /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('it highlights the field if it is invalid', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="dark bg-gray-900 p-4"><Mox::TextArea @onInput={{this.onInput}} @isValid={{false}} /></div>`
      );

      assert.dom('[data-test-mox-text-area]').hasClass('dark:border-red-800');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(153, 27, 27)' });
    });

    test('it allows to validate and invalidate the field after rendering', async function (assert) {
      this.set('onInput', () => {});
      this.set('isValid', null);

      await render(
        hbs`<div class="dark bg-gray-900 p-4"><Mox::TextArea @onInput={{this.onInput}} @isValid={{this.isValid}} /></div>`
      );

      assert
        .dom('[data-test-mox-text-area]')
        .doesNotHaveClass('dark:border-red-800');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(107, 114, 128)' });

      this.set('isValid', false);

      assert.dom('[data-test-mox-text-area]').hasClass('dark:border-red-800');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(153, 27, 27)' });

      this.set('isValid', true);

      assert
        .dom('[data-test-mox-text-area]')
        .doesNotHaveClass('dark:border-red-800');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(107, 114, 128)' });
    });
  });

  module('light mode', function () {
    test('the disabled input state is accessible (light mode)', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
        <div class="bg-gray-50 p-4">
          <Mox::TextArea @onInput={{this.onInput}} @label="Address" @id="address-field" disabled />
        </div>`);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the disabled input state used together with an external label is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
        <div class="bg-gray-50 p-4">
          <label for="address-field">Address</label>
          <Mox::TextArea @onInput={{this.onInput}} id="address-field" disabled />
        </div>
      `);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the invalid input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="bg-gray-50 p-4"><Mox::TextArea @onInput={{this.onInput}} @label="Address" @id="address-field" @isValid={{false}} @error="Missing something?" /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('it highlights the field if it is invalid', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="bg-gray-50 p-4"><Mox::TextArea @onInput={{this.onInput}} @isValid={{false}} /></div>`
      );

      assert.dom('[data-test-mox-text-area]').hasClass('border-red-500');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(239, 68, 68)' });
    });

    test('it allows to validate and invalidate the field after rendering', async function (assert) {
      this.set('onInput', () => {});
      this.set('isValid', null);

      await render(
        hbs`<div class="bg-gray-50 p-4"><Mox::TextArea @onInput={{this.onInput}} @isValid={{this.isValid}} /></div>`
      );

      assert
        .dom('[data-test-mox-text-area]')
        .doesNotHaveClass('border-red-500');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(156, 163, 175)' });

      this.set('isValid', false);

      assert.dom('[data-test-mox-text-area]').hasClass('border-red-500');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(239, 68, 68)' });

      this.set('isValid', true);

      assert
        .dom('[data-test-mox-text-area]')
        .doesNotHaveClass('border-red-500');
      assert
        .dom('[data-test-mox-text-area]')
        .hasStyle({ borderColor: 'rgb(156, 163, 175)' });
    });
  });
});
