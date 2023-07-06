import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/link-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders an empty link by default', async function (assert) {
    await render(hbs`
      <Mox::LinkButton>
        A link
      </Mox::LinkButton>
    `);

    assert.dom('[data-test-mox-link]').includesText('A link');
    assert.dom('[data-test-mox-link]').doesNotHaveAttribute('href');
  });

  test('it renders (@route)', async function (assert) {
    await render(hbs`
      <Mox::LinkButton @route="application">
        Internal link
      </Mox::LinkButton>
    `);

    assert.dom('[data-test-mox-link]').includesText('Internal link');
    assert.dom('[data-test-mox-link]').hasAttribute('href', '/');
  });

  test('it renders (@externalUrl)', async function (assert) {
    await render(hbs`
      <Mox::LinkButton @externalUrl="http://localhost:7357">
        External link
      </Mox::LinkButton>
    `);

    assert.dom('[data-test-mox-link]').includesText('External link');
    assert
      .dom('[data-test-mox-link]')
      .hasAttribute('href', 'http://localhost:7357');
  });

  test('it is accessible (@route + dark mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::LinkButton @route="application">
          Internal link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@externalUrl + dark mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::LinkButton @externalUrl="http://localhost:7357">
          External link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@route + dark mode + active)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::LinkButton @route="application" class="active">
          Internal link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@route + light mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-50">
        <Mox::LinkButton @route="application">
          Internal link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@route + light mode + active)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-50">
        <Mox::LinkButton @route="application" class="active">
          Internal link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@externalUrl + light mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-50">
        <Mox::LinkButton @externalUrl="http://localhost:7357">
          External link
        </Mox::LinkButton>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });
});
