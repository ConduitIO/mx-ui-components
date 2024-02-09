import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/list/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::List::Header>
        header item
      </Mox::List::Header>
      `);

    assert.dom('[data-test-mox-list-header]').includesText('header item');
    assert.dom('[data-test-mox-list-header] tr').hasClass('border-b');
  });

  test('it is accessible (dark background)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::List::Header>
          header item
        </Mox::List::Header>
      </div>
      `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
