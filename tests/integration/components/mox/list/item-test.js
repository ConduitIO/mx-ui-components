import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/list/item', function(hooks) {
  setupRenderingTest(hooks);

  module('item in header', function(hooks) {
    test('it renders', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isHeader={{true}}>Hola</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-item]').includesText('Hola');
      assert.dom('[data-test-mox-list-item]').doesNotExist();
      assert.dom('[data-test-mox-list-header-item]').hasClass('text-gray-300');
    });

    test('it can be hidden', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isDisabled={{true}} @isHeader={{true}}>Que tal</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-item]').doesNotExist();
    });
  });

  module('item in body', function(hooks) {
    test('it renders', async function (assert) {
      await render(hbs`<Mox::List::Item>Vamos</Mox::List::Item>`);

      assert.dom('[data-test-mox-list-item]').includesText('Vamos');
      assert.dom('[data-test-mox-list-header-item]').doesNotExist();
      assert.dom('[data-test-mox-list-item-content]').hasClass('text-sm');
      assert.dom('[data-test-mox-list-item-link]').doesNotExist();
    });

    test('it renders a link', async function (assert) {
      await render(
        hbs`<Mox::List::Item @route="resources" @model="1">Vamos</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-item]').includesText('Vamos');
      assert.dom('[data-test-mox-list-link] a').exists();
    });

    test('it can be hidden', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isDisabled={{true}}>Vamos</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-item]').doesNotExist();
      assert.dom('[data-test-mox-list-header-item]').doesNotExist();
    });
  });
});
