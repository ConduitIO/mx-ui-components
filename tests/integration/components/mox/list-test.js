import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      hbs`<Mox::List>
        <:header>
          A table header
        </:header>
        <:body>
          The actual list
        </:body>
      </Mox::List>`
    );

    assert.dom('[data-test-mox-list]').includesText('A table header');
    assert.dom('[data-test-mox-list]').includesText('The actual list');
    assert
      .dom('[data-test-mox-list-body]')
      .includesText('The actual list');
  });

  test('it is accessible (dark background)', async function(assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::List>
          <:header>
            <Mox::List::Item @isHeader={{true}}>
              Name
            </Mox::List::Item>
          </:header>
          <:body>
            <Mox::List::Row>
              <Mox::List::Item>
                Cheesecake
              </Mox::List::Item>
            </Mox::List::Row>
          </:body>
        </Mox::List>
      </div>
      `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  module('sortable list', function(hooks) {
    hooks.beforeEach(async function() {
      this.listItems = [
        { name: 'Lunar Curtain', description: 'Casts [MBarrier] on the party.', id: 1, price: 1 },
        { name: 'Fire Veil', description: 'Uses "Fire3" on all opponents', id: 2, price: 800 },
        { name: 'Stardust', description: 'Uses "Comet2" on all opponents', id: 3, price: 8000 },
        { name: 'Hi-Potion', description: 'Restores HP by 500', id: 4, price: 0 },
      ];

      await render(
        hbs`
        <Mox::List @items={{this.listItems}}>
          <:header as |s|>
            <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "name"}} @sort={{fn s.sortByColumn "name"}} data-test-name>
              Name
            </Mox::List::Item>
            <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "description"}} @sort={{fn s.sortByColumn "description"}} data-test-description>
              Description
            </Mox::List::Item>
            <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "damage"}} @sort={{fn s.sortByColumn "id"}} data-test-id>
              ID
            </Mox::List::Item>
            <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "price"}} @sort={{fn s.sortByColumn "price"}} data-test-price>
              Price
            </Mox::List::Item>
          </:header>
          <:body as |sortedItems|>
            {{#each sortedItems as |item|}}
              <Mox::List::Row>
                <Mox::List::Item>
                  {{item.name}}
                </Mox::List::Item>
                <Mox::List::Item>
                  {{item.description}}
                </Mox::List::Item>
                <Mox::List::Item>
                  {{item.id}}
                </Mox::List::Item>
                <Mox::List::Item>
                  {{item.price}}
                </Mox::List::Item>
              </Mox::List::Row>
            {{/each}}
          </:body>
        </Mox::List>
      `);
    });

    test('it renders', function (assert) {
      assert.dom('[data-test-mox-list-header]').includesText('Name');
      assert.dom('[data-test-mox-list-header]').includesText('Description');
      assert.dom('[data-test-mox-list-header]').includesText('ID');
      assert.dom('[data-test-mox-list-header]').includesText('Price');
      assert.dom('[data-test-mox-list-body]').includesText('Lunar Curtain');
      assert.dom('[data-test-mox-list-body]').includesText('Casts [MBarrier] on the party.');
      assert.dom('[data-test-mox-list-body]').includesText('1');
      assert.dom('[data-test-mox-list-body]').includesText('0');
      assert.dom('[data-test-mox-list-row]').exists({ count: 4 });
    });

    test('it renders the active state for the currently selected column', async function (assert) {
      // precondition: none of the header columns are marked as active by default
      assert.dom('[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('text-white');
      assert.dom('[data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('font-semibold');

      assert.dom('[data-test-name][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('text-white');
      assert.dom('[data-test-name][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('font-semibold');

      await click('[data-test-name] [data-test-mox-list-header-sort-desc]');

      // it only marks the name column as active
      assert.dom('[data-test-name][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').hasClass('text-white');
      assert.dom('[data-test-name][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').hasClass('font-semibold');
      assert.dom('[data-test-name][data-test-mox-list-header-item] [data-test-mox-list-header-sort-asc]').hasStyle({ color: 'rgb(107, 114, 128)' });

      assert.dom('[data-test-description][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('text-white');
      assert.dom('[data-test-description][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('font-semibold');
      assert.dom('[data-test-id][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('text-white');
      assert.dom('[data-test-id][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('font-semibold');
      assert.dom('[data-test-price][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('text-white');
      assert.dom('[data-test-price][data-test-mox-list-header-item] [data-test-mox-list-header-item-label]').doesNotHaveClass('font-semibold');
    });

    test('it sorts list entries by column (descending)', async function (assert) {
      let listItems = await findAll('[data-test-mox-list-row]');

      assert.dom(listItems[0]).includesText('Lunar Curtain');
      assert.dom(listItems[1]).includesText('Fire Veil');
      assert.dom(listItems[2]).includesText('Stardust');
      assert.dom(listItems[3]).includesText('Hi-Potion');

      await click('[data-test-price] [data-test-mox-list-header-sort-desc]');

      let updatedListItems = await findAll('[data-test-mox-list-row]');

      assert.dom(updatedListItems[0]).includesText('Stardust');
      assert.dom(updatedListItems[1]).includesText('Fire Veil');
      assert.dom(updatedListItems[2]).includesText('Lunar Curtain');
      assert.dom(updatedListItems[3]).includesText('Hi-Potion');
    });

    test('it sorts list entries by column (ascending)', async function (assert) {
      let listItems = await findAll('[data-test-mox-list-row]');

      assert.dom(listItems[0]).includesText('Lunar Curtain');
      assert.dom(listItems[1]).includesText('Fire Veil');
      assert.dom(listItems[2]).includesText('Stardust');
      assert.dom(listItems[3]).includesText('Hi-Potion');

      await click('[data-test-description] [data-test-mox-list-header-sort-asc]');

      let updatedListItems = await findAll('[data-test-mox-list-row]');

      assert.dom(updatedListItems[0]).includesText('Lunar Curtain');
      assert.dom(updatedListItems[1]).includesText('Hi-Potion');
      assert.dom(updatedListItems[2]).includesText('Stardust');
      assert.dom(updatedListItems[3]).includesText('Fire Veil');
    });
  });
});
