import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/tabs/item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item]').hasText('Tab One');
    assert.dom('[data-test-mox-tab-item] a').exists();
  });

  test('it is rendered as inactive by default', async function(assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasStyle({ color: 'rgb(209, 213, 219)' });
  });

  test('it is rendered as active when the `@isActive` argument is set', async function(assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application" @isActive={{true}}>
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('active');
    assert.dom('[data-test-mox-tab-item] a').hasStyle({ color: 'rgb(6, 182, 212)' });
  });

  test('it is rendered as active when the `active` class was applied to the link', async function(assert) {
    await render(hbs`
      <Mox::Tabs::Item @route="application" class="active">
        Tab One
      </Mox::Tabs::Item>
    `);

    assert.dom('[data-test-mox-tab-item] a').hasClass('active');
    assert.dom('[data-test-mox-tab-item] a').hasStyle({ color: 'rgb(6, 182, 212)' });
  });
});
