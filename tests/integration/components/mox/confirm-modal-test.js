import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/confirm-modal', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    this.set('onDismiss', sinon.spy());
    this.set('confirmedAction', sinon.spy());
    this.set('confirmableActionName', 'Squanch');

    await render(hbs`
      <Mox::ConfirmModal
        @onDismiss={{this.onDismiss}}
        @confirmableActionName={{this.confirmableActionName}}
        @entityName='Plumbus'
        @confirmedAction={{this.confirmedAction}}
        @isTextInputRequired={{this.isTextInputRequired}}
        as |entityName|
      >
        Are you sure you want to squanch {{entityName}}?
      </Mox::ConfirmModal>
    `);
  });

  module('when confirming', function (hooks) {
    hooks.beforeEach(async function () {
      this.set('isTextInputRequired', false);
    });

    test('it yields the entity name out for the block', function (assert) {
      assert
        .dom('[data-test-confirm-block]')
        .containsText('Are you sure you want to squanch Plumbus?');
    });

    test('it displays the action name and entity name in the title', function (assert) {
      assert
        .dom('[data-test-modal-dialog-title]')
        .containsText('Squanch Plumbus ?');
    });

    test('it automatically focuses on the close dialog button', function (assert) {
      assert.dom('[data-test-modal-dialog-close]').isFocused();
    });

    test('it triggers the onDismiss action when canceled (Cancel CTA)', async function (assert) {
      await click('[data-test-confirm-cancel-button]');
      assert.ok(this.onDismiss.calledOnce);
    });

    test('it triggers the onDismiss action when canceled (close dialog via x)', async function (assert) {
      await click('[data-test-modal-dialog-close]');
      assert.ok(this.onDismiss.calledOnce);
    });

    test('it triggers the confirmedAction action on submit', async function (assert) {
      await click('[data-test-confirm-submit-button]');
      assert.ok(this.confirmedAction.calledOnce);
    });

    test('it displays the default submit button', async function (assert) {
      assert
        .dom('[data-test-confirm-submit-button]')
        .hasClass('border-red-500');
    });

    test('the submit button is enabled by default', async function (assert) {
      assert.dom('[data-test-confirm-submit-button]').isNotDisabled();
    });

    test('the submit button displays the specified action title', async function (assert) {
      assert.dom('[data-test-confirm-submit-button]').includesText('Squanch');
    });

    test('the title and the submit button display the default action title (Delete) if no other is specified', async function (assert) {
      this.set('confirmableActionName', null);
      assert
        .dom('[data-test-modal-dialog-title]')
        .containsText('Delete Plumbus ?');
      assert.dom('[data-test-confirm-submit-button]').includesText('Delete');
    });

    test('it is accessible', async function (assert) {
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });

  module('when text confirming', function (hooks) {
    hooks.beforeEach(async function () {
      this.set('isTextInputRequired', true);
    });

    test('it shows the confirm text input section', function (assert) {
      assert.dom('[data-test-confirm-input]').exists();
    });

    test('it automatically focusses on the text input section', function (assert) {
      assert.dom('[data-test-confirm-input]').isFocused();
    });

    test('it disables the submit button by default', function (assert) {
      assert.dom('[data-test-confirm-submit-button]').isDisabled();
    });

    test('it triggers the onDismiss action when canceled (Cancel CTA)', async function (assert) {
      await click('[data-test-confirm-cancel-button]');
      assert.ok(this.onDismiss.calledOnce);
    });

    test('it triggers the onDismiss action when canceled (close dialog via x)', async function (assert) {
      await click('[data-test-modal-dialog-close]');
      assert.ok(this.onDismiss.calledOnce);
    });

    test('it disables the submit button when there is no text match', function (assert) {
      assert.dom('[data-test-confirm-submit-button]').isDisabled();
    });

    test('it enables the submit button when there is a text match', async function (assert) {
      await fillIn('[data-test-confirm-input]', 'Plumbus');
      assert.dom('[data-test-confirm-submit-button]').isEnabled();
    });

    test('it displays the danger submit button', async function (assert) {
      assert
        .dom('[data-test-confirm-submit-button]')
        .hasClass('border-red-500');
    });

    test('the submit button displays the specified action title', async function (assert) {
      assert.dom('[data-test-confirm-submit-button]').includesText('Squanch');
    });

    test('the title and the submit button display the default action title (Delete) if no other is specified', async function (assert) {
      this.set('confirmableActionName', null);
      assert
        .dom('[data-test-modal-dialog-title]')
        .containsText('Delete Plumbus ?');
      assert.dom('[data-test-confirm-submit-button]').includesText('Delete');
    });

    test('it is accessible', async function (assert) {
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
