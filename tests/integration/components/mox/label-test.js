import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/label', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::Label>
        Label text
      </Mox::Label>
    `);

    assert.strictEqual(this.element.textContent.trim(), 'Label text');
  });

  test('it is not marked as required by default', async function (assert) {
    await render(hbs`
      <Mox::Label>
        Label text
      </Mox::Label>
    `);

    assert.dom('[data-test-mox-label]').doesNotHaveClass('required');
  });

  test('it is marked visually if set as required', async function (assert) {
    await render(hbs`
      <Mox::Label @isRequired={{true}}>
        Label text
      </Mox::Label>
    `);

    assert.dom('[data-test-mox-label]').hasClass('required');
    assert.dom('[data-test-mox-label]').hasPseudoElementStyle(':after', {
      content: '""',
      backgroundColor: 'rgb(239, 68, 68)',
    });
  });

  module('light mode', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        <Mox::Label>
          Label text
        </Mox::Label>
      `);
    });

    test('it renders the label correctly', function (assert) {
      assert.dom('[data-test-mox-label]').hasStyle({
        color: 'rgb(55, 65, 81)',
      });
    });

    test('it passes the a11y audit', async function (assert) {
      await a11yAudit();

      assert.ok(true, 'it renders the label without a11y errors');
    });
  });

  module('dark mode', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        <div class="dark bg-gray-900 p-4">
          <Mox::Label>
            Label text
          </Mox::Label>
        </div>
      `);
    });

    test('it renders the label correctly', function (assert) {
      assert.dom('[data-test-mox-label]').hasStyle({
        color: 'rgb(209, 213, 219)',
      });
    });

    test('it passes the a11y audit', async function (assert) {
      await a11yAudit();

      assert.ok(true, 'it renders the label without a11y errors');
    });
  });
});
