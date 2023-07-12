import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/input', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the onInput action on input', async function (assert) {
    this.set('onInput', sinon.spy());
    await render(hbs`<Mox::Input @onInput={{this.onInput}}/>`);

    await fillIn('[data-test-mox-input]', 'brett and james rule');

    assert.ok(this.onInput.called);
  });

  test('it displays an accessible input if a label text and an id is provded', async function (assert) {
    this.set('onInput', () => {});
    this.set('label', 'Address');

    await render(
      hbs`<Mox::Input @label={{this.label}} @id="address-field" @onInput={{this.onInput}} />`
    );

    assert.dom('[data-test-mox-label]').includesText('Address');
    assert.dom('[data-test-mox-label]').hasAttribute('for', 'address-field');
    assert.dom('[data-test-mox-input]').hasAttribute('id', 'address-field');
  });

  test('it allows disabling the input', async function (assert) {
    this.set('onInput', () => {});

    await render(hbs`<Mox::Input @onInput={{this.onInput}} disabled />`);

    assert.dom('[data-test-mox-input]').isDisabled();
  });

  test('it may display a validation error alongside the field', async function (assert) {
    this.set('onInput', () => {});

    await render(
      hbs`<Mox::Input @onInput={{this.onInput}} @error="Name can't be blank" />`
    );

    assert
      .dom('[data-test-mox-input-error]')
      .includesText(`Name can't be blank`);
  });

  test('validation errors do not impact the subsequent form layout', async function (assert) {
    this.set('onInput', () => {});
    this.set('error', null);

    await render(hbs`
      <div class="flex flex-col">
        <Mox::Input
          @onInput={{this.onInput}} @error={{this.error}} data-test-first-field />
        <Mox::Input @onInput={{this.inputAction}} data-test-second-field />
      </div>

      `);

    let secondField = await find('[data-test-second-field]');
    assert
      .dom('[data-test-first-field] [data-test-mox-input-error]')
      .doesNotExist();
    assert.equal(secondField.offsetTop, 54);

    this.set('error', 'message1');

    assert
      .dom('[data-test-first-field] + [data-test-mox-input-error]')
      .includesText('message1');
    assert.equal(
      secondField.offsetTop,
      54,
      'the second field does not change its position relative to the top'
    );
  });

  module('light mode', function () {
    // Style tests
    test('it highlights the field if it is invalid', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<Mox::Input @onInput={{this.onInput}} @isValid={{false}} />`
      );

      assert.dom('[data-test-mox-input]').hasClass('border-red-500');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(239, 68, 68)',
      });
    });

    test('it renders the read-only mode', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`<Mox::Input @onInput={{this.onInput}} readonly />`);

      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(229, 231, 235)',
        backgroundColor: 'rgb(229, 231, 235)',
        color: 'rgb(31, 41, 55)',
      });
    });

    test('it allows to validate and invalidate the field after rendering', async function (assert) {
      this.set('onInput', () => {});
      this.set('isValid', null);

      await render(
        hbs`<Mox::Input @onInput={{this.onInput}} @isValid={{this.isValid}} />`
      );

      assert.dom('[data-test-mox-input]').doesNotHaveClass('border-red-500');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(243, 244, 246)',
      });

      this.set('isValid', false);

      assert.dom('[data-test-mox-input]').hasClass('border-red-500');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(239, 68, 68)',
      });

      this.set('isValid', true);

      assert.dom('[data-test-mox-input]').doesNotHaveClass('border-red-500');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(243, 244, 246)',
      });
    });

    // Accessibility tests
    test('the disabled input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<Mox::Input @onInput={{this.onInput}} @label="Address" @id="address-field" disabled />`
      );
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the disabled input state used together with an external label is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
        <label for="address-field">Address</label>
        <Mox::Input @onInput={{this.onInput}} id="address-field" disabled />
      `);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the invalid input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="bg-gray-50"><Mox::Input @onInput={{this.onInput}} @label="Address" @id="address-field" @isValid={{false}} @error="Missing something?" /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });
  });

  module('dark mode', function () {
    // Style tests
    test('it highlights the field if it is invalid', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
      <div class="dark bg-gray-900 p-4">
        <Mox::Input @onInput={{this.onInput}} @isValid={{false}} />
      </div>`);

      assert.dom('[data-test-mox-input]').hasClass('border-red-500');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(153, 27, 27)',
      });
    });

    test('it renders the read-only mode', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
      <div class="dark bg-gray-900 p-4">
      <Mox::Input @onInput={{this.onInput}} readonly />
      </div>`);

      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(55, 65, 81)',
        backgroundColor: 'rgb(55, 65, 81)',
        color: 'rgb(255, 255, 255)',
      });
    });

    test('it allows to validate and invalidate the field after rendering', async function (assert) {
      this.set('onInput', () => {});
      this.set('isValid', null);

      await render(hbs`
      <div class="dark bg-gray-900 p-4">
      <Mox::Input @onInput={{this.onInput}} @isValid={{this.isValid}} />
      </div>`);

      assert
        .dom('[data-test-mox-input]')
        .doesNotHaveClass('dark:border-red-800');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(107, 114, 128)',
      });

      this.set('isValid', false);

      assert.dom('[data-test-mox-input]').hasClass('dark:border-red-800');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(153, 27, 27)',
      });

      this.set('isValid', true);

      assert
        .dom('[data-test-mox-input]')
        .doesNotHaveClass('dark:border-red-800');
      assert.dom('[data-test-mox-input]').hasStyle({
        borderColor: 'rgb(107, 114, 128)',
      });
    });

    // Accessibility tests
    test('the disabled input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
      <div class="dark bg-gray-900 p-4">
      <Mox::Input @onInput={{this.onInput}} @label="Address" @id="address-field" disabled />
      </div>`);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the disabled input state used together with an external label is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(hbs`
      <div class="dark bg-gray-900 p-4">
        <label for="address-field">Address</label>
        <Mox::Input @onInput={{this.onInput}} id="address-field" disabled />
      </div>
      `);
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });

    test('the invalid input state is accessible', async function (assert) {
      this.set('onInput', () => {});

      await render(
        hbs`<div class="bg-gray-900 dark p-4"><Mox::Input @onInput={{this.onInput}} @label="Address" @id="address-field" @isValid={{false}} @error="Missing something?" /></div>`
      );
      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });
  });
});
