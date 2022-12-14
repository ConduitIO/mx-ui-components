import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/typeahead-select', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    const options = [
      { name: 'Piano', value: 'piano' },
      { name: 'Guitar', value: 'guitar' },
      { name: 'Bass', value: 'bass' },
      { name: 'Drums', value: 'drums' },
    ];

    const selectedOption = options[0];

    this.set('options', options);
    this.set('selectedOption', selectedOption);
    this.set('onChange', sinon.spy());
  });

  test('it displays the selected option', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    assert.dom('[data-test-typeahead-select-input]').hasValue('Piano');
  });

  test('it can be disabled', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
    />`);

    assert.dom('[data-test-typeahead-select-input]').isDisabled();
  });

  test('it highlights the field if it is invalid', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
      @isValid={{false}}
    />`);

    assert.dom('[data-test-mox-input]').hasClass('border-red-800');
  });

  test('it allows to validate and invalidate the field after rendering', async function (assert) {
    this.set('isValid', null);

    await render(hbs`
    <Mox::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
      @isValid={{this.isValid}}
    />`);

    assert.dom('[data-test-mox-input]').doesNotHaveClass('border-red-800');

    this.set('isValid', false);

    assert.dom('[data-test-mox-input]').hasClass('border-red-800');

    this.set('isValid', true);

    assert.dom('[data-test-mox-input]').doesNotHaveClass('border-red-800');
  });

  test('it may display a validation error alongside the field', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
      @error="Name can't be blank"
    />`);

    assert
      .dom('[data-test-mox-input-error]')
      .includesText(`Name can't be blank`);
  });

  test('it is accessible (with embedded label)', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @id="my-random-id"
      @label="Your Instrument"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it is accessible (with external label)', async function (assert) {
    await render(hbs`
    <label for="my-random-id">My external label</label>
    <Mox::TypeaheadSelect
      @id="my-random-id"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it is accessible (disabled)', async function (assert) {
    await render(hbs`
    <label for="my-random-id">My external label</label>
    <Mox::TypeaheadSelect
      @id="my-random-id"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
    />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it is accessible (validation error)', async function (assert) {
    await render(hbs`
    <div class="bg-gray-900">
      <Mox::TypeaheadSelect
        @id="my-random-id"
        @label="Your Instrument"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
        @isValid={{false}}
        @error="Missing something?"
      />
    </div>`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it hides the option list when not focused', async function (assert) {
    await render(hbs`
    <Mox::TypeaheadSelect
      @id="my-random-id"
      @label="Your Instrument"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    assert.dom('[data-test-typeahead-matches]').hasClass('hidden');
  });

  module('when focused', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mox::TypeaheadSelect
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-typeahead-select-input]');
    });

    test('it displays the options', function (assert) {
      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );
      assert.dom('[data-test-typeahead-matches]').doesNotHaveClass('hidden');
      assert.dom('[data-test-select-option]').exists({ count: 4 });
      assert.dom(options[0]).containsText('Piano');
      assert.dom(options[1]).containsText('Guitar');
      assert.dom(options[2]).containsText('Bass');
      assert.dom(options[3]).containsText('Drums');
    });

    test('it marks the selected option', function (assert) {
      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );
      assert
        .dom(options[0].querySelector('[data-test-select-option-selected]'))
        .exists();
    });

    test('it filters the options according to the search query', async function (assert) {
      await fillIn('[data-test-typeahead-select-input]', 'a');

      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );

      assert.dom('[data-test-select-option]').exists({ count: 3 });
      assert.dom(options[0]).containsText('Piano');
      assert.dom(options[1]).containsText('Guitar');
      assert.dom(options[2]).containsText('Bass');
    });

    test('it displays the options list when focused', function (assert) {
      assert.dom('[data-test-typeahead-matches]').doesNotHaveClass('hidden');
    });

    test('it allows keyboard navigation', async function (assert) {
      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );
      assert.dom(options[0]).hasClass('bg-gray-700');

      await triggerKeyEvent(
        '[data-test-typeahead-select-input]',
        'keydown',
        'ArrowDown'
      );
      assert.dom(options[0]).doesNotHaveClass('bg-gray-700');
      assert.dom(options[1]).hasClass('bg-gray-700');

      await triggerKeyEvent(
        '[data-test-typeahead-select-input]',
        'keydown',
        'ArrowUp'
      );
      assert.dom(options[0]).hasClass('bg-gray-700');
      assert.dom(options[1]).doesNotHaveClass('bg-gray-700');
    });

    test('it hides the options when the escape key is pressed', async function (assert) {
      assert.dom('[data-test-typeahead-matches]').doesNotHaveClass('hidden');
      await triggerKeyEvent(
        '[data-test-typeahead-select-input]',
        'keydown',
        'Escape'
      );
      assert.dom('[data-test-typeahead-matches]').hasClass('hidden');
      assert.dom('[data-test-typeahead-select-input]').isFocused();
    });
  });

  module('when selecting an option by click', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mox::TypeaheadSelect
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-typeahead-select-input]');
      await click(
        this.element.querySelectorAll('[data-test-select-option-button]')[1]
      );
    });

    test('it calls the onChange action with the selected option', function (assert) {
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Guitar', value: 'guitar' })
        )
      );
    });
  });

  module('when selecting an option by keyboard', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mox::TypeaheadSelect
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-typeahead-select-input]');

      await triggerKeyEvent(
        '[data-test-typeahead-select-input]',
        'keydown',
        'Enter'
      );
    });

    test('it calls the onChange action with the selected option', function (assert) {
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Piano', value: 'piano' })
        )
      );
    });
  });
});
