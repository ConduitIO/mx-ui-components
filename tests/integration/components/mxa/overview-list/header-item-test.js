import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/overview-list/header-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList::HeaderItem>Hola</Mxa::OverviewList::HeaderItem>`
    );

    assert.dom('[data-test-mxa-overview-list-header-item]').includesText('Hola');
  });

  test('it can be hidden', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList::HeaderItem @isDisabled={{true}}>Que tal</Mxa::OverviewList::HeaderItem>`
    );

    assert.dom('[data-test-mxa-overview-list-header-item]').doesNotExist();
  });
});
