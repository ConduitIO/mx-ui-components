import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | mxa/select/option/category',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(
        hbs`<Mxa::Select::Option::Category @name="Hello" @category="World" />`
      );

      assert.dom('[data-test-select-option-category]').includesText('Hello');
      assert.dom('[data-test-select-option-category]').includesText('World');
    });
  }
);
