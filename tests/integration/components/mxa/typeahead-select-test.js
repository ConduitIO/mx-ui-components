import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/typeahead-select', function (hooks) {
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
    <Mxa::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    assert.dom('[data-test-typeahead-select-input]').hasValue('Piano');
  });

  test('it can be disabled', async function (assert) {
    await render(hbs`
    <Mxa::TypeaheadSelect
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
    />`);

    assert.dom('[data-test-typeahead-select-input]').isDisabled();
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
    <Mxa::Select
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  module('when focused', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mxa::TypeaheadSelect
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
  });

  module('when selecting an option', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mxa::TypeaheadSelect
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
});
