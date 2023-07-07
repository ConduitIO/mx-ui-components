import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/overview-list/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Mxa::OverviewList::Item>Vamos</Mxa::OverviewList::Item>`);

    assert.dom('[data-test-mxa-overview-list-item]').includesText('Vamos');
    assert
      .dom('[data-test-mxa-overview-list-item-content]')
      .hasClass('text-sm');
    assert.dom('[data-test-mxa-overview-list-item-link]').doesNotExist();
  });

  test('it renders italic', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList::Item @isItalic={{true}}>Vamos</Mxa::OverviewList::Item>`
    );

    assert.dom('[data-test-mxa-overview-list-item]').includesText('Vamos');
    assert
      .dom('[data-test-mxa-overview-list-item-content]')
      .hasClass('text-xs');
    assert.dom('[data-test-mxa-overview-list-item-content]').hasClass('italic');
    assert.dom('[data-test-mxa-overview-list-item-link]').doesNotExist();
  });

  test('it renders a link', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList::Item @route="resources" @model="1">Vamos</Mxa::OverviewList::Item>`
    );

    assert.dom('[data-test-mxa-overview-list-item]').includesText('Vamos');
    assert.dom('[data-test-mxa-overview-list-item-link] a').exists();
  });

  test('it can be hidden', async function (assert) {
    await render(
      hbs`<Mxa::OverviewList::Item @isDisabled={{true}}>Vamos</Mxa::OverviewList::Item>`
    );

    assert.dom('[data-test-mxa-overview-list-item]').doesNotExist();
  });
});
