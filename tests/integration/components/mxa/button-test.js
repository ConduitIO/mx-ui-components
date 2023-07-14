import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the primary button by default', async function (assert) {
    await render(hbs`<Mxa::Button />`);

    assert.dom('button').hasClass('mxa-btn-primary');
  });

  test('it renders the primary button', async function (assert) {
    await render(hbs`<Mxa::Button @buttonType='primary' />`);

    assert.dom('button').hasClass('mxa-btn-primary');
  });

  test('it renders the secondary button', async function (assert) {
    await render(hbs`<Mxa::Button @buttonType='secondary' />`);

    assert.dom('button').hasClass('mxa-btn-secondary');
  });

  test('it renders the tertiary button', async function (assert) {
    await render(hbs`<Mxa::Button @buttonType='tertiary' />`);

    assert.dom('button').hasClass('mxa-btn-tertiary');
  });

  test('it renders the danger button', async function (assert) {
    await render(hbs`<Mxa::Button @buttonType='danger' />`);

    assert.dom('button').hasClass('mxa-btn-danger');
  });

  test('it renders the the button in its disabled state', async function (assert) {
    await render(hbs`<Mxa::Button disabled />`);

    assert.dom('button').hasStyle({
      backgroundColor: 'rgb(214, 215, 217)',
      color: 'rgb(17, 24, 39)',
    });
  });

  test('it renders the the button - no fill state', async function (assert) {
    await render(hbs`<Mxa::Button @buttonType="danger" @noFill={{true}} />`);

    assert.dom('button').hasStyle({
      backgroundColor: 'rgb(255, 255, 255)',
      color: 'rgb(220, 38, 38)',
    });
  });

  test('it renders the the button - small', async function (assert) {
    await render(hbs`<Mxa::Button @small={{true}} />`);

    assert.dom('button').hasClass('mxa-btn-small');
  });

  test('it renders the content on block invocation', async function (assert) {
    await render(hbs`<Mxa::Button>Upload</Mxa::Button>`);

    assert.dom('button').hasText('Upload');
  });

  test('it renders text that is passed via the @title argument', async function (assert) {
    await render(hbs`<Mxa::Button @title="Download" />`);

    assert.dom('button').hasText('Download');
  });

  test('it renders default text when no content is provided', async function (assert) {
    await render(hbs`<Mxa::Button />`);

    assert.dom('button').hasText('Submit');
  });

  module('color accessibility', function () {
    test('default', async function (assert) {
      await render(hbs`<Mxa::Button />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('primary', async function (assert) {
      await render(hbs`<Mxa::Button @buttonType="primary" />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('secondary', async function (assert) {
      await render(hbs`<Mxa::Button @buttonType="secondary" />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('tertiary', async function (assert) {
      await render(hbs`<Mxa::Button @buttonType="tertiary" />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    skip('danger', async function (assert) {
      await render(hbs`<Mxa::Button @buttonType="danger" />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });

    test('disabled', async function (assert) {
      await render(hbs`<Mxa::Button disabled />`);

      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
