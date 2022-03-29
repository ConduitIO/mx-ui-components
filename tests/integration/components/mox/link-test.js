import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/link', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders an empty link by default', async function (assert) {
    await render(hbs`
      <Mox::Link>
        A link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').includesText('A link');
    assert.dom('[data-test-mox-link]').doesNotHaveAttribute('href');
  });

  test('it renders (@route)', async function (assert) {
    await render(hbs`
      <Mox::Link @route="application">
        Internal link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').includesText('Internal link');
    assert.dom('[data-test-mox-link]').hasAttribute('href', '/');
  });

  test('it renders (@externalUrl)', async function (assert) {
    await render(hbs`
      <Mox::Link @externalUrl="http://localhost:7357">
        External link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').includesText('External link');
    assert
      .dom('[data-test-mox-link]')
      .hasAttribute('href', 'http://localhost:7357');
  });

  test('it renders (@route + button UI)', async function (assert) {
    await render(hbs`
      <Mox::Link @route="application" @isButton={{true}}>
        Internal link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').hasClass('border-cyan-700');
    assert.dom('[data-test-mox-link]').hasClass('bg-cyan-700');
  });

  test('it renders (@externalURL + button UI)', async function (assert) {
    await render(hbs`
      <Mox::Link @externalUrl="http://localhost:7357" @isButton={{true}}>
        External link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').hasClass('border-cyan-700');
    assert.dom('[data-test-mox-link]').hasClass('bg-cyan-700');
  });

  test('it is accessible (@route)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::Link @route="application">
          Internal link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@externalUrl)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::Link @externalUrl="http://localhost:7357">
          External link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });
});
