import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/side-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Mxa::SideBar>
        Hello World
      </Mxa::SideBar>
    `);

    assert.dom('[data-test-sidebar]').hasText('Hello World');
  });

  test('it renders different color variations (light)', async function(assert) {
    await render(hbs`
      <Mxa::SideBar @isDark={{false}}>
        Hello World
      </Mxa::SideBar>
    `);

    assert.dom('[data-test-sidebar]').hasClass('bg-slate-5');
  });

  test('it renders different color variations (dark)', async function(assert) {
    await render(hbs`
      <Mxa::SideBar @isDark={{true}}>
        Hello World
      </Mxa::SideBar>
    `);

    assert.dom('[data-test-sidebar]').hasClass('bg-slate-100');
  });

  test('it is accessible (light)', async function(assert) {
    await render(hbs`
      <Mxa::SideBar @isDark={{true}}>
        Hello World
      </Mxa::SideBar>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });

  test('it is accessible (dark)', async function(assert) {
    await render(hbs`
      <Mxa::SideBar @isDark={{true}}>
        Hello World
      </Mxa::SideBar>
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });
});
