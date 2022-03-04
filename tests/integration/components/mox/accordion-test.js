import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/accordion', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <Mox::Accordion>
        <:header>
          Hola
        </:header>
        <:body>
          Que tal
        </:body>
      </Mox::Accordion>
    `);

    assert.dom('[data-test-mox-accordion]').exists();
    assert.dom('[data-test-mox-accordion-button]').includesText('Hola');
    assert.dom('[data-test-mox-accordion-body]').doesNotExist();
  });

  test('it hides the body by default', async function(assert) {
    await render(hbs`
      <Mox::Accordion>
        <:header>
          Hola
        </:header>
        <:body>
          Que tal
        </:body>
      </Mox::Accordion>
    `);

    assert.dom('[data-test-mox-accordion-body]').doesNotExist();
  });

  test('it displays the body if @isOpen is set to true', async function(assert) {
    await render(hbs`
      <Mox::Accordion @isOpen={{true}}>
        <:header>
          Hola
        </:header>
        <:body>
          Que tal
        </:body>
      </Mox::Accordion>
    `);

    assert.dom('[data-test-mox-accordion-body]').includesText('Que tal');
  });

  test('it allows opening the accordion view via click', async function(assert) {
    await render(hbs`
      <Mox::Accordion>
        <:header>
          Hola
        </:header>
        <:body>
          Que tal
        </:body>
      </Mox::Accordion>
    `);

    assert.dom('[data-test-mox-accordion-body]').doesNotExist();

    await click('[data-test-mox-accordion-button]');

    assert.dom('[data-test-mox-accordion-body]').includesText('Que tal');
  });

  test('it allows closing the accordion view via click', async function(assert) {
    await render(hbs`
      <Mox::Accordion @isOpen={{true}}>
        <:header>
          Hola
        </:header>
        <:body>
          Que tal
        </:body>
      </Mox::Accordion>
    `);

    assert.dom('[data-test-mox-accordion-body]').includesText('Que tal');

    await click('[data-test-mox-accordion-button]');

    assert.dom('[data-test-mox-accordion-body]').doesNotExist();
  });

  test('it is accessible (closed state)', async function(assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::Accordion>
          <:header>
            Hola
          </:header>
          <:body>
            Que tal
          </:body>
        </Mox::Accordion>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'it is accessible in its closed state');
  });

  test('it is accessible (open state)', async function(assert) {
    await render(hbs`
      <div class="bg-gray-900">
        <Mox::Accordion @isOpen={{true}}>
          <:header>
            Hola
          </:header>
          <:body>
            Que tal
          </:body>
        </Mox::Accordion>
      </div>
    `);

    await a11yAudit();
    assert.ok(true, 'it is accessible in its open state');
  });
});
