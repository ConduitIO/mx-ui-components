import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import sinon from 'sinon';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it calls the onDismiss action when clicking outside the modal', async function (assert) {
    this.set('onDismiss', sinon.spy());

    await render(hbs`
      <Mox::Modal @onDismiss={{this.onDismiss}}>
        MUDA MUDA MUDA
      </Mox::Modal>
    `);

    await click('[data-test-modal-outside-trigger]');
    assert.ok(this.onDismiss.calledOnce);
  });

  test('it yields out the title and content ids', async function (assert) {
    this.set('onDismiss', sinon.spy());

    await render(hbs`
      <Mox::Modal @onDismiss={{this.onDismiss}} as |titleId contentId|>
        MUDA MUDA MUDA
        <div data-test-title-id>{{titleId}}</div>
        <div data-test-content-id>{{contentId}}</div>
      </Mox::Modal>
    `);

    assert.dom('[data-test-title-id]').containsText('mox-modal-title-');
    assert.dom('[data-test-content-id]').containsText('mox-dialog-content');
  });

  test('it yields a title, subtitle and content ', async function (assert) {
    this.set('onDismiss', sinon.spy());

    await render(hbs`
      <Mox::Modal @onDismiss={{this.onDismiss}}>
        <:title>High Water</:title>
        <:sub-title>By Sleep Token></:sub-title>
        <:content>Go listen</:content>
      </Mox::Modal>
    `);

    assert.dom('[data-test-mox-modal-title]').containsText('High Water');
    assert
      .dom('[data-test-mox-modal-sub-title]')
      .containsText('By Sleep Token');
    assert.dom('[data-test-mox-modal-content]').containsText('Go listen');
  });

  test('it yields built in primary and secondary button components', async function (assert) {
    this.set('onDismiss', sinon.spy());
    this.set('primaryAction', sinon.spy());

    await render(hbs`
      <Mox::Modal @onDismiss={{this.onDismiss}}>
        <:title>High Water</:title>
        <:sub-title>By Sleep Token></:sub-title>
        <:content as |c|>
          <c.secondaryAction data-test-secondary>Go back</c.secondaryAction>
          <c.primaryAction @onClick={{this.primaryAction}} data-test-primary>Listen</c.primaryAction>
        </:content>
      </Mox::Modal>
    `);

    await click('[data-test-secondary]');
    await click('[data-test-primary]');
    assert.ok(this.onDismiss.calledOnce);
    assert.ok(this.primaryAction.calledOnce);
  });

  test('it is accessible (dark mode)', async function (assert) {
    this.set('onDismiss', sinon.spy());
    await render(hbs`
      <div class="dark">
        <Mox::Modal @onDismiss={{this.onDismiss}}>
          <:title>High Water</:title>
          <:sub-title>By Sleep Token></:sub-title>
          <:content as |c|>
            <c.secondaryAction data-test-secondary>Go back</c.secondaryAction>
            <c.primaryAction @onClick={{this.primaryAction}} data-test-primary>Listen</c.primaryAction>
          </:content>
        </Mox::Modal>
      </div>
    `);

    await a11yAudit();
    assert.ok(true);
  });

  test('it is accessible (light mode)', async function (assert) {
    this.set('onDismiss', sinon.spy());
    await render(hbs`
      <Mox::Modal @onDismiss={{this.onDismiss}}>
        <:title>High Water</:title>
        <:sub-title>By Sleep Token></:sub-title>
        <:content as |c|>
          <c.secondaryAction data-test-secondary>Go back</c.secondaryAction>
          <c.primaryAction @onClick={{this.primaryAction}} data-test-primary>Listen</c.primaryAction>
        </:content>
      </Mox::Modal>
    `);

    await a11yAudit();
    assert.ok(true);
  });
});
