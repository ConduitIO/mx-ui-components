import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';
import sinon from 'sinon';

module('Integration | Component | mxa/notification-card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('dismissAction', () => {});
    this.set('detailedError', {
      message: 'Oh noes',
      details: ['pow', 'woops', 'argh'],
    });
    this.set('spyAction', sinon.spy());
  });

  test('it renders (default/success)', async function (assert) {
    await render(
      hbs`<Mxa::NotificationCard @isError={{false}} @onDismiss={{this.dismissAction}} @message="This is a success!" />`
    );

    assert
      .dom('[data-test-notification-card]')
      .includesText('This is a success');
    assert.dom('[data-test-success-dismiss]').includesText('Dismiss');
  });

  test('it renders (simple error)', async function (assert) {
    await render(
      hbs`<Mxa::NotificationCard @isError={{true}} @onDismiss={{this.dismissAction}} @message="Oops!" />`
    );

    assert.dom('[data-test-notification-card]').includesText('Oops!');
    assert.dom('[data-test-error-title]').includesText('Oops!');
    assert.dom('[data-test-error-dismiss]').includesText('Dismiss');
  });

  test('it renders (detailed error)', async function (assert) {
    await render(
      hbs`<Mxa::NotificationCard @onDismiss={{this.dismissAction}} @error={{this.detailedError}} />`
    );

    assert.dom('[data-test-notification-card]').includesText('Oh noes');
    assert.dom('[data-test-error-title]').includesText('Oh noes');
    assert.dom('[data-test-error-detail]').includesText('pow');
    assert.dom('[data-test-error-detail]').includesText('woops');
    assert.dom('[data-test-error-detail]').includesText('argh');
    assert.dom('[data-test-error-dismiss]').includesText('Dismiss');
  });

  test('it triggers the dismiss action (default/success)', async function (assert) {
    assert.expect(1);

    await render(
      hbs`<Mxa::NotificationCard @onDismiss={{this.spyAction}} @message="This is a success!" />`
    );

    await click('[data-test-success-dismiss]');

    assert.ok(this.spyAction.calledOnce);
  });

  test('it triggers the dismiss action (error)', async function (assert) {
    assert.expect(1);

    await render(
      hbs`<Mxa::NotificationCard @onDismiss={{this.spyAction}} @error={{this.detailedError}} />`
    );

    await click('[data-test-error-dismiss]');

    assert.ok(this.spyAction.calledOnce);
  });

  test('it is accessible (success)', async function (assert) {
    await render(
      hbs`<Mxa::NotificationCard @isError={{false}} @onDismiss={{this.dismissAction}} @message="This is a success!" />`
    );

    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });

  test('it is accessible (error)', async function (assert) {
    await render(
      hbs`<Mxa::NotificationCard @onDismiss={{this.dismissAction}} @error={{this.detailedError}} />`
    );

    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });
});
