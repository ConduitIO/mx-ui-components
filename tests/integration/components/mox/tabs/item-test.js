import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/tabs/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item]').hasText('Tab One');
    assert.dom('[data-test-mox-tab-item] a').exists();
  });

  test('it is rendered as inactive by default (dark mode)', async function (assert) {
    await render(hbs`
      <div class="dark bg-gray-900">
        <Mox::Tabs::Item @route="application">
          Tab One
        </Mox::Tabs::Item>
      </div>
    `);

    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(209, 213, 219)' });
  });

  test('it is rendered as inactive by default (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(31, 41, 55)' });
  });

  test('it is rendered as arg-active when the `@isActive` argument is set (dark mode)', async function (assert) {
    await render(hbs`
      <div class="dark bg-gray-900">
        <Mox::Tabs::Item @route="application" @isActive={{true}}>
          Tab One
        </Mox::Tabs::Item>
      </div>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('arg-active');
    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(6, 182, 212)' });
  });

  test('it is rendered as arg-active when the `@isActive` argument is set (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application" @isActive={{true}}>
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('arg-active');
    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(6, 182, 212)' });
  });

  test('it is rendered as active when the `arg-active` class was applied to the link (dark mode)', async function (assert) {
    await render(hbs`
      <div class="dark bg-gray-900">
        <Mox::Tabs::Item @route="application" class="arg-active">
          Tab One
        </Mox::Tabs::Item>
      </div>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('arg-active');
    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(6, 182, 212)' });
  });

  test('it is rendered as active when the `arg-active` class was applied to the link (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application" class="arg-active">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('arg-active');
    assert
      .dom('[data-test-mox-tab-item] a')
      .hasStyle({ color: 'rgb(6, 182, 212)' });
  });
});
