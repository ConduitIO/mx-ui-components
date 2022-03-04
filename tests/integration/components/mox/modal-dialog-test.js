import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/modal-dialog', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('dummyAction', () => {});
    this.set('title', 'Success');
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    assert.dom('[data-test-modal-dialog-title]').containsText('Tarnished?');
    assert
      .dom('[data-test-modal-dialog-body]')
      .containsText('Become an elden lord today!');
    assert.dom('[data-test-modal-dialog-footer] button').includesText('Okay!');
  });

  test('it triggers the onDismiss action when clicking the closing control', async function (assert) {
    assert.expect(1);

    this.set('onDismiss', () => {
      assert.ok(true);
    });

    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.onDismiss}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    await click('[data-test-secondary]');
  });

  test('it allows dismissing the modal via hitting ESC', async function (assert) {
    assert.expect(1);

    this.set('onDismiss', () => {
      assert.ok(true);
    });

    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.onDismiss}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    await triggerKeyEvent('[data-test-modal-dialog]', 'keydown', 'Escape');
  });

  test('it triggers the didInsert action once rendered', async function (assert) {
    assert.expect(1);

    this.set('onDidInsert', () => {
      assert.ok(true);
    });

    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}} @didInsert={{this.onDidInsert}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);
  });

  test('it automatically focusses an interactive element when rendered', async function (assert) {
    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    assert.dom('[data-test-modal-dialog-close]').isFocused();
  });

  test('it renders a short version (default)', async function (assert) {
    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    assert.dom('[data-test-modal-dialog]').hasClass('sm:w-box');
  });

  test('it renders a wide version', async function (assert) {
    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}} @isWide={{true}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    assert.dom('[data-test-modal-dialog]').hasClass('sm:w-container');
  });

  test('it is accessible', async function (assert) {
    await render(hbs`
      <Mox::ModalDialog @onDismiss={{this.dummyAction}}>
        <:title>
          Tarnished?
        </:title>
        <:body>
          Become an elden lord today!
        </:body>
        <:footer as |footer|>
          <footer.secondaryAction data-test-secondary>Okay!</footer.secondaryAction>
        </:footer>
      </Mox::ModalDialog>
    `);

    await a11yAudit();
    assert.ok(true);
    assert.dom('[data-test-modal-dialog]').hasAttribute('role', 'dialog');
    assert.dom('[data-test-modal-dialog]').hasAttribute('aria-modal', 'true');
    assert.dom('[data-test-modal-dialog]').hasAttribute('aria-describedby');
    assert.dom('[data-test-modal-dialog]').hasAttribute('aria-labelledby');
  });
});
