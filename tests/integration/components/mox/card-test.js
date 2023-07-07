import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the title', async function (assert) {
    await render(hbs`
      <Mox::Card>
        <:title>
          Grandia
        </:title>
        <:subtitle>
          PS1 · RPG · 1997
        </:subtitle>
      </Mox::Card>
    `);

    assert.dom('[data-test-mox-card]').includesText('Grandia');
    assert.dom('[data-test-mox-card]').includesText('PS1 · RPG · 1997');
    assert.dom('[data-test-mox-card-title]').includesText('Grandia');
    assert
      .dom('[data-test-mox-card-subtitle]')
      .includesText('PS1 · RPG · 1997');
  });

  test('it renders the link element if a route is passed', async function (assert) {
    await render(hbs`
      <Mox::Card @route="application">
        <:title>
          Shadowhearts II
        </:title>
        <:subtitle>
          PS2 · RPG · 2002
        </:subtitle>
      </Mox::Card>
    `);

    assert.dom('[data-test-mox-card] a').exists();
    assert.dom('[data-test-mox-card-link]').exists();
    assert.dom('[data-test-mox-card-button]').doesNotExist();
    assert.dom('[data-test-mox-card-link]').includesText('Shadowhearts');
    assert.dom('[data-test-mox-card-link]').includesText('PS2 · RPG · 2002');
  });

  test('it renders an icon placeholder', async function (assert) {
    await render(hbs`
      <Mox::Card @route="application">
        <:icon>
          an icon
        </:icon>
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
      </Mox::Card>
    `);

    assert.dom('[data-test-mox-card]').includesText('an icon');
    assert.dom('[data-test-mox-card-icon]').includesText('an icon');
  });

  test('it renders a menu placeholder', async function (assert) {
    await render(hbs`
      <Mox::Card @route="application">
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
        <:menu>
          a menuuuu
        </:menu>
      </Mox::Card>
    `);

    assert.dom('[data-test-mox-card]').includesText('a menuuu');
    assert.dom('[data-test-mox-card-menu]').includesText('a menuuu');
  });

  test('it triggers the @onClick action when the button is clicked', async function (assert) {
    assert.expect(1);

    this.set('dummyAction', () => {
      assert.ok(true, 'it triggers the onClick action');
    });

    await render(hbs`
      <Mox::Card @onClick={{this.dummyAction}}>
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
      </Mox::Card>
    `);

    await click('[data-test-mox-card-button]');
  });

  test('it has no accessibility issues (button mode)', async function (assert) {
    await render(hbs`
      <Mox::Card @onClick={{this.dummyAction}}>
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
      </Mox::Card>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it has no accessibility issues (link mode)', async function (assert) {
    await render(hbs`
      <Mox::Card @route="application">
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
      </Mox::Card>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });

  test('it has no accessibility issues (dark mode)', async function (assert) {
    await render(hbs`
    <div class="dark bg-gray-900 p-4">
      <Mox::Card @route="application">
        <:title>
          FFVII
        </:title>
        <:subtitle>
          PS1 · RPG · 1994
        </:subtitle>
      </Mox::Card>
    </div>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
