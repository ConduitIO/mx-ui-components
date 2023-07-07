import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/article/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders (default)', async function (assert) {
    await render(hbs`
      <Mox::Article::Header>
        deine lakeien
      </Mox::Article::Header>
    `);

    assert.dom('[data-test-mox-article-header-title]').hasText('deine lakeien');
    assert.dom('[data-test-mox-article-header-title]').hasTagName('h2');
  });

  test('it renders (title + subtitle)', async function (assert) {
    await render(hbs`
      <Mox::Article::Header>
        <:title>
          deine lakeien
        </:title>
        <:subtitle>
          dark star
        </:subtitle>
      </Mox::Article::Header>
    `);

    assert.dom('[data-test-mox-article-header-title]').hasText('deine lakeien');
    assert.dom('[data-test-mox-article-header-title]').hasTagName('h2');
    assert.dom('[data-test-mox-article-header-subtitle]').hasText('dark star');
    assert.dom('[data-test-mox-article-header-subtitle]').hasTagName('p');
  });


  test('it is accessible (light mode)', async function (assert) {
    await render(hbs`
      <Mox::Article::Header>
        <:title>
          deine lakeien
        </:title>
        <:subtitle>
          dark star
        </:subtitle>
      </Mox::Article::Header>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });

  test('it is accessible (dark mode)', async function (assert) {
    await render(hbs`
      <div class="dark bg-gray-900 p-4">
        <Mox::Article::Header>
          <:title>
            deine lakeien
          </:title>
          <:subtitle>
            dark star
          </:subtitle>
        </Mox::Article::Header>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });
});
