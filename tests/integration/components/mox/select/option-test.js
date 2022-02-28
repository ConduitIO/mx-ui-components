import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/select/option', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('option', { name: 'hey', value: 'hi' });
    this.set('otherOption', { name: 'sayonara', value: 'bye' });
    this.set('setSelectedOption', sinon.spy());
  });

  test('it displays as checked when the selected option is the option', async function (assert) {
    await render(hbs`<Mox::Select::Option
      @option={{this.option}}
      @selectedOption={{this.option}}
      @setSelectedOption={{this.setSelectedOption}}
      @optionNameKey='name'
      @optionValueKey='value'
    />`);

    assert.dom('[data-test-select-option-selected]').exists();
  });

  test('it displays as not checked when the selected option is not the option', async function (assert) {
    await render(hbs`<Mox::Select::Option
      @option={{this.option}}
      @selectedOption={{this.otherOption}}
      @setSelectedOption={{this.setSelectedOption}}
      @optionNameKey='name'
      @optionValueKey='value'
    />`);

    assert.dom('[data-test-select-option-selected]').doesNotExist();
  });

  test('it calls the set selected option action when clicked', async function (assert) {
    await render(hbs`<Mox::Select::Option
      @option={{this.option}}
      @selectedOption={{this.option}}
      @setSelectedOption={{this.setSelectedOption}}
      @optionNameKey='name'
      @optionValueKey='value'
    />`);

    await click('[data-test-select-option-button]');

    assert.ok(this.setSelectedOption.calledOnce);
  });

  test('it does not call the set selected option action when clicked but disabled', async function (assert) {
    await render(hbs`<Mox::Select::Option
      @option={{this.option}}
      @selectedOption={{this.option}}
      @setSelectedOption={{this.setSelectedOption}}
      @optionNameKey='name'
      @optionValueKey='value'
      @isDisabled={{true}}
    />`);

    await click('[data-test-select-option-button]');

    assert.ok(this.setSelectedOption.notCalled);
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
      <label id="label-id">Option List</label>
      <ul role="listbox" aria-labelledby="label-id">
        <Mox::Select::Option
        @option={{this.option}}
        @selectedOption={{this.option}}
        @setSelectedOption={{this.setSelectedOption}}
        @optionNameKey='name'
        @optionValueKey='value'
      />
      </ul>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
