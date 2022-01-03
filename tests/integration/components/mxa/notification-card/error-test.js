import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/notification-card/error', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Mxa::NotificationCard::Error>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Error>`);

    assert.dom('[data-test-error]').hasText('My text body');
  });

  test('it renders with title and controls', async function(assert) {
    await render(hbs`<Mxa::NotificationCard::Error>
      <:header>
        My title
      </:header>
      <:body>
        My text body
      </:body>
      <:controls>
        My controls
      </:controls>
    </Mxa::NotificationCard::Error>`);

    assert.dom('[data-test-error]').includesText('My text body');
    assert.dom('[data-test-error-title]').hasText('My title');
    assert.dom('[data-test-error-controls]').hasText('My controls');
  });

  test('it is displayed as error card', async function(assert) {
    await render(hbs`<Mxa::NotificationCard::Error>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Error>`);

    assert.dom('[data-test-notification-card-marker]').hasClass('bg-saffron-100');
  });

  test('it is accessible', async function(assert) {
    await render(hbs`<Mxa::NotificationCard::Error>
      <:body>
        My text body
      </:body>
    </Mxa::NotificationCard::Error>`);

    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });
});
