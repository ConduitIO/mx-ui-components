import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Modifier | on-click-outside', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('theAction', sinon.spy());
  });

  test('it calls the function when clicked outside', async function (assert) {
    await render(hbs`
      <div data-test-outside>
        <div {{on-click-outside this.theAction '[data-test-outside]'}} data-test-inside></div>
      </div>
    `);

    await click('[data-test-outside]');

    assert.ok(this.theAction.calledOnce);
  });

  test('it does not call the function when clicked inside', async function (assert) {
    await render(hbs`
      <div data-test-outside>
        <div {{on-click-outside this.theAction '[data-test-outside]'}} data-test-inside></div>
      </div>
    `);

    await click('[data-test-inside]');

    assert.ok(this.theAction.notCalled);
  });
});
