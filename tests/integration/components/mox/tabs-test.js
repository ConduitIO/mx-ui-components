import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/tabs', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::Tabs>
        <li>template block text</li>
      </Mox::Tabs>
    `);

    assert.dom('[data-test-mox-tabs]').hasText('template block text');
  });

  test('it is accessible (dark mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::Tabs>
          <Mox::Tabs::Item>Item One</Mox::Tabs::Item>
          <Mox::Tabs::Item>Item Two</Mox::Tabs::Item>
        </Mox::Tabs>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Tabs>
        <Mox::Tabs::Item>Item One</Mox::Tabs::Item>
        <Mox::Tabs::Item>Item Two</Mox::Tabs::Item>
      </Mox::Tabs>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });
});
