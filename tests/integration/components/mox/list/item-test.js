import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/list/item', function (hooks) {
  setupRenderingTest(hooks);

  module('item in header', function () {
    test('it renders', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isHeader={{true}}>Hola</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-item]').includesText('Hola');
      assert.dom('[data-test-mox-list-item]').doesNotExist();
      assert
        .dom(
          '[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]'
        )
        .hasClass('text-gray-800');
      assert
        .dom(
          '[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]'
        )
        .hasClass('dark:text-gray-300');
      assert.dom('[data-test-mox-list-header-sort-asc]').doesNotExist();
      assert.dom('[data-test-mox-list-header-sort-desc]').doesNotExist();
    });

    test('it can be hidden', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isDisabled={{true}} @isHeader={{true}}>Que tal</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-item]').doesNotExist();
    });

    test('it renders the active state', async function (assert) {
      await render(
        hbs`<Mox::List::Item @isHeader={{true}} @isActive={{true}}>Hola</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-item]').includesText('Hola');
      assert.dom('[data-test-mox-list-item]').doesNotExist();
      assert
        .dom(
          '[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]'
        )
        .hasClass('text-white');
      assert
        .dom(
          '[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]'
        )
        .hasClass('font-semibold');
    });

    test('it renders sorting controls', async function (assert) {
      this.dummyAction = () => {};

      await render(
        hbs`<Mox::List::Item @isHeader={{true}} @sort={{this.dummyAction}}>Hola</Mox::List::Item>`
      );

      assert.dom('[data-test-mox-list-header-sort-asc]').exists();
      assert.dom('[data-test-mox-list-header-sort-desc]').exists();
    });

    test('it sends the "desc" attribute when sorting and focusses the control (descending sort direction)', async function (assert) {
      assert.expect(2);

      this.dummyAction = (prop) => {
        assert.strictEqual(prop, 'desc');
      };

      await render(
        hbs`<Mox::List::Item @isHeader={{true}} @sort={{this.dummyAction}}>Hola</Mox::List::Item>`
      );

      await click('[data-test-mox-list-header-sort-desc]');

      assert
        .dom('[data-test-mox-list-header-sort-desc]')
        .hasStyle({ color: 'rgb(6, 182, 212)' });
    });

    test('it sends the "asc" attribute when sorting and focusses the control (ascending sort direction)', async function (assert) {
      assert.expect(2);

      this.dummyAction = (prop) => {
        assert.strictEqual(prop, 'asc');
      };

      await render(
        hbs`<Mox::List::Item @isHeader={{true}} @sort={{this.dummyAction}}>Hola</Mox::List::Item>`
      );

      await click('[data-test-mox-list-header-sort-asc]');

      assert
        .dom('[data-test-mox-list-header-sort-asc]')
        .hasStyle({ color: 'rgb(6, 182, 212)' });
    });

    test('it renders the sort controls accordingly when the header item is active', async function (assert) {
      this.dummyAction = () => {};

      await render(
        hbs`<Mox::List::Item @isHeader={{true}} @isActive={{true}} @sort={{this.dummyAction}}>Hola</Mox::List::Item>`
      );

      assert
        .dom('[data-test-mox-list-header-sort-desc]')
        .hasClass('text-gray-500');
      assert
        .dom('[data-test-mox-list-header-sort-asc]')
        .hasClass('text-gray-500');
    });
  });

  module('item in body', function () {
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
