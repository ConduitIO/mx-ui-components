import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, currentURL, render } from '@ember/test-helpers';
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

  test('it renders (@route + @model)', async function (assert) {
    this.set('model', { id: 1 });
    await render(hbs`
      <Mox::Link @route="subroute" @model={{this.model}}>
        Internal link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').includesText('Internal link');
    assert.dom('[data-test-mox-link]').hasAttribute('href', '/1');
  });

  test('it renders (@route + @model + @queryParams)', async function (assert) {
    this.set('model', { id: 1 });
    await render(hbs`
      <Mox::Link @route="subroute" @model={{this.model}} @queryParams={{hash filter="foo"}}>
        Internal link
      </Mox::Link>
    `);

    assert.dom('[data-test-mox-link]').includesText('Internal link');
    assert.dom('[data-test-mox-link]').hasAttribute('href', '/1?filter=foo');

    await click('[data-test-mox-link]');

    assert.strictEqual(currentURL(), '/1');
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

  test('it is accessible (@route + dark mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::Link @route="application">
          Internal link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@route + light mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-50">
        <Mox::Link @route="application">
          Internal link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@externalUrl + dark mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-900 dark">
        <Mox::Link @externalUrl="http://localhost:7357">
          External link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });

  test('it is accessible (@externalUrl + light mode)', async function (assert) {
    await render(hbs`
      <div class="bg-gray-50">
        <Mox::Link @externalUrl="http://localhost:7357">
          External link
        </Mox::Link>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors detected');
  });
});
