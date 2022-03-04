import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';

module('Integration | Component | mox/code-block', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders with the code', async function (assert) {
    await render(hbs`<Mox::CodeBlock @value="get good"/>`);

    assert.dom('[data-test-code-value]').containsText('get good');
  });

  module('in clipboard api supported browsers', function (hooks) {
    hooks.beforeEach(async function () {
      this.permissionsStub = sinon
        .stub(navigator.permissions, 'query')
        .returns(new Promise((resolve) => resolve({ state: 'granted' })));

      this.writeStub = sinon.stub(navigator.clipboard, 'writeText');
    });

    hooks.afterEach(async function () {
      this.permissionsStub.restore();
      this.writeStub.restore();
    });

    test('it lets the user copy the input', async function (assert) {
      await render(hbs`<Mox::CodeBlock @value="get good"/>`);
      assert.dom('[data-test-code-copy-button]').doesNotHaveClass('hidden');

      await click('[data-test-code-copy-button]');
      assert.ok(this.writeStub.calledOnceWith('get good'));
    });
  });

  module('in non clipboard api supported browsers', function (hooks) {
    hooks.beforeEach(async function () {
      this.permissionsStub = sinon
        .stub(navigator.permissions, 'query')
        .returns(new Promise((resolve) => resolve({ state: 'denied' })));

      this.writeStub = sinon.stub(navigator.clipboard, 'writeText');
    });

    hooks.afterEach(async function () {
      this.permissionsStub.restore();
      this.writeStub.restore();
    });

    test('it hides the copy button', async function (assert) {
      await render(hbs`<Mox::CodeBlock @value="get good"/>`);
      assert.dom('[data-test-code-copy-button]').hasClass('hidden');
    });
  });
});
