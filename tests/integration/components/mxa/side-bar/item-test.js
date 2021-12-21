import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/side-bar/item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders (default)', async function(assert) {
    await render(hbs`<Mxa::SideBar::Item>
      Hello World!
    </Mxa::SideBar::Item>`);

    assert.dom('[data-test-sidebar-item]').exists();
    assert.dom('[data-test-sidebar-item-link]').doesNotExist();

    assert.dom('[data-test-sidebar-item]').includesText('Hello World!');
  });

  test('it renders (link)', async function(assert) {
    await render(hbs`<Mxa::SideBar::Item @route="index">
      Hello World!
    </Mxa::SideBar::Item>`);

    assert.dom('[data-test-sidebar-item]').exists();
    assert.dom('[data-test-sidebar-item-link]').exists();

    assert.dom('[data-test-sidebar-item]').includesText('Hello World!');
  });

  test('it is accessible', async function(assert) {
    await render(hbs`<Mxa::SideBar::Item @route="index">
      Hello World!
    </Mxa::SideBar::Item>`);

    await a11yAudit();
    assert.ok(true, 'no a11y errors');
  });

  test('it is accessible (no text content, but with additional label for screenreader users)', async function(assert) {
    await render(hbs`<Mxa::SideBar::Item @route="index" @label="Hello World"></Mxa::SideBar::Item>`);

    await a11yAudit();
    assert.dom('[data-test-sidebar-item-link]').hasAttribute('aria-label', 'Hello World');
  });
});
