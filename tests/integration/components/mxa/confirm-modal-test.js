import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/confirm-modal', function(hooks) {
  setupRenderingTest(hooks);

  module('when confirming', async function(hooks) {
    hooks.beforeEach(async function() {
      this.set('onDismiss', sinon.spy());
      this.set('confirmedAction', sinon.spy());

      await render(hbs`
        <Mxa::ConfirmModal
          @onDismiss={{this.onDismiss}}
          @confirmableActionName='Squanch'
          @entityName='Plumbus'
          @confirmedAction={{this.confirmedAction}}
          @isTextInputRequired={{false}}
          as |entityName|
        >
          Are you sure you want to squanch {{entityName}}?
        </Mxa::ConfirmModal>
      `);
    });

    test('it yields the entity name out for the block', function(assert) {
      assert.dom('[data-test-confirm-block]').containsText('Are you sure you want to squanch Plumbus?');
    });

    test('it displays the action name and entity name in the header', function(assert) {
      assert.dom('[data-test-confirm-header]').containsText('Squanch Plumbus ?');
    });

    test('it triggers the onDismiss action when canceled', async function(assert) {
      await click('[data-test-confirm-cancel-button]');
      assert.ok(this.onDismiss.calledOnce);
    });

    test('it triggers the confirmedAction action on submit', async function(assert) {
      await click('[data-test-confirm-submit-button]');
      assert.ok(this.confirmedAction.calledOnce);
    });

    test('it displays the default submit button', async function(assert) {
      assert.dom('[data-test-confirm-submit-button]').hasClass('mxa-btn-primary');
    });

    skip('it is accessible', async function(assert) {
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });

  module('when text confirming', function(hooks) {
    hooks.beforeEach(async function() {
      this.set('onDismiss', sinon.spy());
      this.set('confirmedAction', sinon.spy());

      await render(hbs`
        <Mxa::ConfirmModal
          @onDismiss={{this.onDismiss}}
          @confirmableActionName='Squanch'
          @entityName='Plumbus'
          @confirmedAction={{this.confirmedAction}}
          @isTextInputRequired={{true}}
          as |entityName|
        >
          Are you sure you want to squanch {{entityName}}
        </Mxa::ConfirmModal>
      `);
    });

    test('it shows the confirm text input section', function(assert) {
      assert.dom('[data-test-confirm-input]').exists();
    });

    test('it automatically focusses on the text input section', function(assert) {
      assert.dom('[data-test-confirm-input]').isFocused();
    });

    test('it disables the submit button by default', function(assert) {
      assert.dom('[data-test-confirm-submit-button]').isDisabled();
    });

    test('it disables the submit button when there is no text match', function(assert) {
      assert.dom('[data-test-confirm-submit-button]').isDisabled();
    });

    test('it enables the submit button when there is a text match', async function(assert) {
      await fillIn('[data-test-confirm-input]', 'Plumbus');
      assert.dom('[data-test-confirm-submit-button]').isEnabled();
    });

    test('it displays the danger submit button', async function(assert) {
      assert.dom('[data-test-confirm-submit-button]').hasClass('bg-saffron-100');
    });

    skip('it is accessible', async function(assert) {
      await a11yAudit();
      assert.ok(true, 'no a11y detected');
    });
  });
});
