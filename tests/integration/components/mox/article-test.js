import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/article', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::Article>
        rotersand
      </Mox::Article>
    `);

    assert.dom('[data-test-mox-article]').hasText('rotersand');
  });

  test('it renders in dark mode', async function (assert) {
    await render(hbs`
    <div class="dark bg-gray-900 p-4">
      <Mox::Article>
        <Mox::Article::Header>
          <:title>
            deine lakeien
          </:title>
          <:subtitle>
            dark star
          </:subtitle>
        </Mox::Article::Header>
      </Mox::Article>
    </div>
    `);

    assert.dom('[data-test-mox-article]').hasStyle({ backgroundColor: 'rgb(31, 41, 55)' });
    assert.dom('[data-test-mox-article]').hasStyle({ color: 'rgb(255, 255, 255)' });
    assert.dom('[data-test-mox-article-header-title]').hasStyle({ color: 'rgb(255, 255, 255)' });
    assert.dom('[data-test-mox-article-header-subtitle]').hasStyle({ color: 'rgb(209, 213, 219)' });
  });

  test('it renders in light mode', async function (assert) {
    await render(hbs`
      <Mox::Article>
        <Mox::Article::Header>
          <:title>
            deine lakeien
          </:title>
          <:subtitle>
            dark star
          </:subtitle>
        </Mox::Article::Header>
      </Mox::Article>
    `);

    assert.dom('[data-test-mox-article]').hasStyle({ backgroundColor: 'rgb(255, 255, 255)' });
    assert.dom('[data-test-mox-article]').hasStyle({ color: 'rgb(55, 65, 81)' });
    assert.dom('[data-test-mox-article-header-title]').hasStyle({ color: 'rgb(31, 41, 55)' });
    assert.dom('[data-test-mox-article-header-subtitle]').hasStyle({ color: 'rgb(55, 65, 81)' });
  });

  test('it is accessible (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Article>
        rotersand
      </Mox::Article>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });

  test('it is accessible (dark mode)', async function (assert) {
    await render(hbs`
    <div class="dark bg-gray-900 p-4">
      <Mox::Article>
          rotersand
        </Mox::Article>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });
});
