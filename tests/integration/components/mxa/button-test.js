import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

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

  test('it renders the content on block invocation', async function(assert) {
    await render(hbs`<Mxa::Button>Upload</Mxa::Button>`);

    assert.dom('button').hasText('Upload');
  });

  test('it renders text that is passed via the @title argument', async function(assert) {
    await render(hbs`<Mxa::Button @title="Download" />`);

    assert.dom('button').hasText('Download');
  });

  test('it renders default text when no content is provided', async function(assert) {
    await render(hbs`<Mxa::Button />`);

    assert.dom('button').hasText('Submit');
  });

  test('it is accessible', async function(assert) {
    await render(hbs`<Mxa::Button />`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
