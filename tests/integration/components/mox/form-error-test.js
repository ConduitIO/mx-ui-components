import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/form-error', function (hooks) {
  setupRenderingTest(hooks);

  test('it is blank by default', async function (assert) {
    await render(hbs`<Mox::FormError @error="" />`);

    assert.dom('[data-test-mox-form-error]').doesNotExist();
    assert.dom(this.element).hasNoText();
  });

  test('it renders an error', async function (assert) {
    await render(hbs`<Mox::FormError @error="This does not add up" />`);

    assert.dom('[data-test-mox-form-error]').exists();
    assert
      .dom('[data-test-mox-form-error]')
      .includesText('This does not add up');
    assert.dom('[data-test-mox-form-error]').hasClass('text-red-500');
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::FormError @error="This does not add up" />
      </div>`);

    await a11yAudit();
    assert.ok(true, 'no accessibility errors');
  });
});
