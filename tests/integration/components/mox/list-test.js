import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
});
