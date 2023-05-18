import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/card/main', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the block', async function (assert) {
    await render(hbs`
      <Mox::Card::Main>
        template block text
      </Mox::Card::Main>
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('it renders the link element if a route is passed', async function (assert) {
    await render(hbs`
      <Mox::Card::Main @route="application">
        template block text
      </Mox::Card::Main>
    `);

    assert.dom('[data-test-mox-card-link]').exists();
    assert.dom('[data-test-mox-card-button]').doesNotExist();
    assert.dom('[data-test-mox-card-link]').hasText('template block text');
  });

  test('it renders the button element if no route is passed', async function (assert) {
    await render(hbs`
      <Mox::Card::Main>
        template block text
      </Mox::Card::Main>
    `);

    assert.dom('[data-test-mox-card-button]').exists();
    assert.dom('[data-test-mox-card-link]').doesNotExist();
    assert.dom('[data-test-mox-card-button]').hasText('template block text');
  });

  test('it triggers the @onClick action when clicked', async function (assert) {
    assert.expect(1);

    this.set('dummyAction', () => {
      assert.ok(true, 'it triggers the onClick action');
    });

    await render(hbs`
      <Mox::Card::Main @onClick={{this.dummyAction}}>
        template block text
      </Mox::Card::Main>
    `);

    await click('[data-test-mox-card-button]');
  });

  test('it has no accessibility issues (button mode)', async function (assert) {
    await render(hbs`
      <Mox::Card::Main>
        template block text
      </Mox::Card::Main>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it has no accessibility issues (link mode)', async function (assert) {
    await render(hbs`
      <Mox::Card::Main @route="application">
        template block text
      </Mox::Card::Main>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
