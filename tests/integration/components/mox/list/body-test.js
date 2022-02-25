import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/list/body', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Mox::List::Body>
        list item
      </Mox::List::Body>
      `);

    assert.dom('[data-test-mox-list-body]').includesText('list item');
  });


  test('it is accessible (when displayed on dark background)', async function(assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::List::Body>
          header item
        </Mox::List::Body>
      </div>
      `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
