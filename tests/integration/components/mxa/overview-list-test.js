import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/overview-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList>
        <:header>
          A table header
        </:header>
        <:body>
          The actual list
        </:body>
      </Mxa::OverviewList>`
    );

    assert.dom('[data-test-mxa-overview-list]').includesText('A table header');
    assert.dom('[data-test-mxa-overview-list]').includesText('The actual list');
    assert
      .dom('[data-test-mxa-overview-list-body]')
      .includesText('The actual list');
  });
});
