import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/select', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    const options = [
      { name: 'Select ship...', value: '' },
      { name: 'Rocinante', value: 'roci' },
      { name: 'Razorback', value: 'razor' },
      { name: 'Pella', value: 'pella' },
    ];

    const selectedOption = options[0];

    this.set('options', options);
    this.set('selectedOption', selectedOption);
    this.set('onChange', sinon.spy());
  });

  test('it displays the selected option', async function (assert) {
    await render(hbs`
    <Mox::Select
      @label="Ship Name"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    assert
      .dom('[data-test-select-display-selected]')
      .containsText('Select ship...');
  });

  test('it can be disabled', async function (assert) {
    await render(hbs`
    <Mox::Select
      @label="Ship Name"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{true}}
    />`);

    await click('[data-test-select-button]');

    assert.dom('[data-test-select-button]').hasClass('bg-gray-700');
    assert.ok(this.onChange.notCalled);
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
    <Mox::Select
      @label="Ship Name"
      @options={{this.options}}
      @selectedOption={{this.selectedOption}}
      @onChange={{this.onChange}}
      @isDisabled={{false}}
    />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  module('when toggled', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-select-button]');
    });

    test('it displays the options', function (assert) {
      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );
      assert.dom('[data-test-select-option]').exists({ count: 4 });
      assert.dom(options[1]).containsText('Rocinante');
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
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}}
      />`);

      await click('[data-test-select-button]');
      await click(
        this.element.querySelectorAll('[data-test-select-option-button]')[1]
      );
    });

    test('it calls the onChange action with the selected option', function (assert) {
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Rocinante', value: 'roci' })
        )
      );
    });
  });

  module('with custom options', function (hooks) {
    hooks.beforeEach(async function () {
      const options = [
        {
          name: 'My environment',
          value: 'my-environment',
          type: 'Self-Hosted',
        },
        {
          name: 'Meroxa environment',
          value: 'meroxa-environment',
          type: 'Private',
        },
        { name: 'Common', value: 'common', type: 'Common' },
      ];

      const selectedOption = options[0];

      this.set('options', options);
      this.set('selectedOption', selectedOption);
      this.set('onChange', sinon.spy());
    });

    test('it displays customized options', async function (assert) {
      await render(hbs`
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}} as |s|>
        {{#each this.options as |option|}}
          <s.option
            @option={{option}}
            @selectedOption={{this.selectedOption}}
            @optionNameKey="name"
            @optionValueKey="value"
            @optionCategoryKey="type" />
        {{/each}}
      </Mox::Select>`);

      await click('[data-test-select-button]');
      assert.dom('[data-test-select-option]').exists({ count: 3 });
      assert
        .dom('[data-test-select-option-button="My environment"]')
        .includesText('My environment');
      assert
        .dom('[data-test-select-option-button="My environment"]')
        .includesText('Self-Hosted');
    });

    test('it allows selecting customized options', async function (assert) {
      await render(hbs`
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}}
        @isDisabled={{false}} as |s|>
        {{#each this.options as |option|}}
          <s.option
            @option={{option}}
            @selectedOption={{this.selectedOption}}
            @optionNameKey="name"
            @optionValueKey="value"
            @optionCategoryKey={{option.type}} />
        {{/each}}
      </Mox::Select>`);

      await click('[data-test-select-button]');
      await click('[data-test-select-option-button="Common"]');
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Common', value: 'common' })
        )
      );
    });
  });

  module('with disabled options', function (hooks) {
    hooks.beforeEach(async function () {
      const options = [
        { name: 'My environment', value: 'my-environment', isDisabled: false },
        {
          name: 'Meroxa environment',
          value: 'meroxa-environment',
          isDisabled: true,
        },
        { name: 'Common', value: 'common', isDisabled: false },
      ];

      const selectedOption = options[0];

      this.set('options', options);
      this.set('selectedOption', selectedOption);
      this.set('onChange', sinon.spy());
    });

    test('it renders disabled options', async function (assert) {
      await render(hbs`
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}} as |s|>
        {{#each this.options as |option|}}
          <s.option
            @option={{option}}
            @selectedOption={{this.selectedOption}}
            @isDisabled={{option.isDisabled}}
            @optionNameKey="name"
            @optionValueKey="value" />
        {{/each}}
      </Mox::Select>`);

      await click('[data-test-select-button]');
      assert.dom('[data-test-select-option]').exists({ count: 3 });
      const options = this.element.querySelectorAll(
        '[data-test-select-option]'
      );

      assert.dom(options[0]).includesText('My environment');
      assert.dom(options[0]).hasClass('text-white');

      assert.dom(options[2]).includesText('Common');
      assert.dom(options[2]).hasClass('text-white');

      assert.dom(options[1]).includesText('Meroxa environment');
      assert.dom(options[1]).hasClass('text-gray-500');
      assert.dom(options[1]).hasClass('bg-gray-700');
    });

    test('it does not allow selecting disabled options', async function (assert) {
      await render(hbs`
      <Mox::Select
        @label="Ship Name"
        @options={{this.options}}
        @selectedOption={{this.selectedOption}}
        @onChange={{this.onChange}} as |s|>
        {{#each this.options as |option|}}
          <s.option
            @option={{option}}
            @selectedOption={{this.selectedOption}}
            @isDisabled={{option.isDisabled}}
            @optionNameKey="name"
            @optionValueKey="value" />
        {{/each}}
      </Mox::Select>`);

      assert.dom('[data-test-select-button]').includesText('My environment');

      // user selects an enabled option
      await click('[data-test-select-button]');
      await click('[data-test-select-option-button="Common"]');
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Common', value: 'common' })
        )
      );

      // user tries selecting a disabled option
      await click('[data-test-select-button]');
      await click('[data-test-select-option-button="Meroxa environment"]');

      // the selected option is left unchanged
      assert.ok(
        this.onChange.calledOnceWith(
          sinon.match({ name: 'Common', value: 'common' })
        )
      );
      assert.ok(
        this.onChange.neverCalledWith(
          sinon.match({
            name: 'Meroxa environment',
            value: 'meroxa-environment',
          })
        )
      );
    });
  });
});
