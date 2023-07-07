import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module(
  'Integration | Component | mxa/notification-card/success',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(hbs`<Mxa::NotificationCard::Success>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Success>`);

      assert.dom('[data-test-success]').hasText('My text body');
    });

    test('it renders with text body and controls', async function (assert) {
      await render(hbs`<Mxa::NotificationCard::Success>
      <:body>
        My text body
      </:body>
      <:controls>
        My controls
      </:controls>
    </Mxa::NotificationCard::Success>`);

      assert.dom('[data-test-success]').includesText('My text body');
      assert.dom('[data-test-success-controls]').hasText('My controls');
    });

    test('it is displayed as success card', async function (assert) {
      await render(hbs`<Mxa::NotificationCard::Success>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Success>`);

      assert
        .dom('[data-test-notification-card-marker]')
        .hasClass('bg-teal-600');
    });

    test('it is accessible', async function (assert) {
      await render(hbs`<Mxa::NotificationCard::Success>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Success>`);

      await a11yAudit();
      assert.ok(true, 'no accessibility errors');
    });
  }
);
