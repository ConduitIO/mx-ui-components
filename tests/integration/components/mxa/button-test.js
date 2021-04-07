import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the primary button by default', async function(assert) {
    await render(hbs`<Mxa::Button />`);

    assert.dom('button').hasClass('mxa-btn-primary');
  });

  test('it renders the primary button', async function(assert) {
    await render(hbs`<Mxa::Button @buttonType='primary' />`);

    assert.dom('button').hasClass('mxa-btn-primary');
  });

  test('it renders the secondary button', async function(assert) {
    await render(hbs`<Mxa::Button @buttonType='secondary' />`);

    assert.dom('button').hasClass('mxa-btn-secondary');
  });

  test('it renders the tertiary button', async function(assert) {
    await render(hbs`<Mxa::Button @buttonType='tertiary' />`);

    assert.dom('button').hasClass('mxa-btn-tertiary');
  });

  test('it renders the danger button', async function(assert) {
    await render(hbs`<Mxa::Button @buttonType='danger' />`);

    assert.dom('button').hasClass('bg-saffron-100');
  });
});
