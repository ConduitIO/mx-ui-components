import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/overview-list/row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Mxa::OverviewList::Row>
        Cheesecake Factory
      </Mxa::OverviewList::Row>
    `);

    assert.dom('[data-test-mxa-overview-list-row]').hasText('Cheesecake Factory');
    assert.dom('[data-test-mxa-overview-list-row]').hasClass('border-gray-200');
    assert.dom('[data-test-mxa-overview-list-row]').hasTagName('tr');
  });
});
