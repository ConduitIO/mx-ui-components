import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').exists();
    assert
      .dom('[data-test-mox-icon="connectors-16"] use')
      .hasAttribute('xlink:href', '/svg-defs.svg#connectors-16');
  });

  test('it renders in a medium size by default', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('h-6');
    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('w-6');
  });

  test('it renders a large variant of the icon', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" @size="large" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('h-8');
    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('w-8');
  });

  test('it renders a small variant of the icon', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" @size="small" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('h-4');
    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('w-4');
  });

  test('it renders an extra small variant of the icon', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" @size="x-small" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('h-2.5');
    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('w-2.5');
  });

  test('it renders with currentFill and currentStroke by default', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" />`);

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('fill-current');
    assert
      .dom('[data-test-mox-icon="connectors-16"]')
      .hasClass('stroke-current');
  });

  test('it renders (@noFill)', async function (assert) {
    await render(hbs`<Mox::Icon @iconName="connectors-16" @noFill={{true}} />`);

    assert
      .dom('[data-test-mox-icon="connectors-16"]')
      .doesNotHaveClass('fill-current');
    assert
      .dom('[data-test-mox-icon="connectors-16"]')
      .hasClass('stroke-current');
  });

  test('it renders (@noStroke)', async function (assert) {
    await render(
      hbs`<Mox::Icon @iconName="connectors-16" @noStroke={{true}} />`
    );

    assert.dom('[data-test-mox-icon="connectors-16"]').hasClass('fill-current');
    assert
      .dom('[data-test-mox-icon="connectors-16"]')
      .doesNotHaveClass('stroke-current');
  });
});
