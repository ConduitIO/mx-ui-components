import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | mxa/select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    const options = [
      { name: 'Select ship...', value: ''},
      { name: 'Rocinante', value: 'roci' },
      { name: 'Razorback', value: 'razor'},
      { name: 'Pella', value: 'pella'}
    ];

    const selectedOption = options[0];

    this.set('options', options);
    this.set('selectedOption', selectedOption);
    this.set('onChange', sinon.spy());
  });

  test('it displays the selected option', async function(assert) {
    await render(hbs`
    <Mxa::Select
      @label="Ship Name"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    assert.dom('[data-test-select-display-selected]').containsText('Select ship...')
  });

  test('it can be disabled', async function(assert) {
    await render(hbs`
    <Mxa::Select
      @label="Ship Name"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
    />`);

    await click('[data-test-select-button]');

    assert.dom('[data-test-select-button]').hasClass('bg-frost-100');
    assert.ok(this.onChange.notCalled);
  });

  module('when toggled', function(hooks) {
    hooks.beforeEach(async function() {
      await render(hbs`
      <Mxa::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-select-button]');
    });

    test('it displays the options', function(assert) {
      const options = this.element.querySelectorAll('[data-test-select-option]');
      assert.dom('[data-test-select-option]').exists({ count: 4 });
      assert.dom(options[1]).containsText('Rocinante');
    });

    test('it marks the selected option', function(assert) {
      const options = this.element.querySelectorAll('[data-test-select-option]');
      assert.dom(options[0].querySelector('[data-test-select-option-selected]')).exists();
    });
  });

  module('when selecting an option', function(hooks) {
    hooks.beforeEach(async function() {
      await render(hbs`
      <Mxa::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-select-button]');
      await click(this.element.querySelectorAll('[data-test-select-option-button]')[1]);
    });

    test('it calls the onChange action with the selected option', function(assert) {
      assert.ok(this.onChange.calledOnceWith(sinon.match({ name: 'Rocinante', value: 'roci' })));
    });
  });
});
