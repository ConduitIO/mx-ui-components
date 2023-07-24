import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, fillIn, find, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mox/upload', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('dummyAction', () => {});
  });

  test('it renders (default)', async function (assert) {
    await render(hbs`
      <Mox::Upload
        @label="Charizard"
        @format=".pdf"
        @onInput={{this.dummyAction}} />
    `);

    assert.dom('[data-test-mox-upload]').exists();
    assert.dom('[data-test-mox-upload-label]').includesText('Charizard');
    assert
      .dom('[data-test-mox-upload-description]')
      .includesText('.pdf and .txt format required');
    assert.dom('[data-test-mox-upload-paste]').includesText('Paste text');
    assert
      .dom('[data-test-mox-upload-file-upload]')
      .includesText('browse file');
    assert.dom('[data-test-mox-upload-go-back-to-file-upload]').doesNotExist();
  });

  test('it renders (paste mode)', async function (assert) {
    await render(hbs`
      <Mox::Upload
        @label="Charizard"
        @format=".pdf"
        @onInput={{this.dummyAction}} />
    `);

    await click('[data-test-mox-upload-paste]');

    assert.dom('[data-test-mox-upload]').exists();
    assert.dom('[data-test-mox-upload-label]').includesText('Charizard');
    assert
      .dom('[data-test-mox-upload-description]')
      .includesText('.pdf and .txt format required');
    assert.dom('[data-test-mox-upload-paste]').doesNotExist();
    assert.dom('[data-test-mox-upload-file-upload]').doesNotExist();
    assert
      .dom('[data-test-mox-upload-go-back-to-file-upload]')
      .includesText('Browse file');
  });

  test('it allows pasting credentials', async function (assert) {
    assert.expect(2);

    this.set('assertedAction', (event) => {
      assert.strictEqual(event.target.value, 'Charmander');
    });

    await render(hbs`
      <Mox::Upload
        @label="Charizard"
        @format=".pdf"
        @onInput={{this.assertedAction}} />
    `);

    await click('[data-test-mox-upload-paste]');
    await fillIn('[data-test-mox-upload-paste-field]', 'Charmander');

    assert.dom('[data-test-mox-upload-paste-field]').hasValue('Charmander');
  });

  test('it allows uploading files', async function (assert) {
    assert.expect(2);

    this.set('assertedAction', (event) => {
      assert.strictEqual(event.target.value, 'Schiggy');
    });

    await render(hbs`
      <Mox::Upload
        @label="Pokemon hochladen"
        @format=".pdf"
        @onInput={{this.assertedAction}} />
    `);

    await click('[data-test-mox-upload-file-upload]');

    // emulate file upload
    let fileInput = await find('[data-test-mox-upload-file-upload-field]');
    let mockFile = { files: [new Blob(['Schiggy'])] };
    await triggerEvent(fileInput, 'change', mockFile);

    assert.dom('[data-test-mox-upload-paste-field]').hasValue('Schiggy');
  });

  test('allows pasting a value and then replacing it with an uploaded one', async function (assert) {
    assert.expect(4);

    this.set('assertedAction', (event) => {
      assert.strictEqual(event.target.value, 'Floraroma');
    });

    await render(hbs`
      <Mox::Upload
        @label="Nombre de Pokemon"
        @format=".pdf"
        @onInput={{this.assertedAction}} />
    `);

    // try pasting a value manually
    await click('[data-test-mox-upload-paste]');
    await fillIn('[data-test-mox-upload-paste-field]', 'Floraroma');
    assert.dom('[data-test-mox-upload-paste-field]').hasValue('Floraroma');

    this.set('assertedAction', (event) => {
      assert.strictEqual(event.target.value, 'Caperezoson');
    });

    // try uploading the value via files instead
    await click('[data-test-mox-upload-go-back-to-file-upload]');
    // emulate file upload
    let fileInput = await find('[data-test-mox-upload-file-upload-field]');
    let mockFile = { files: [new Blob(['Caperezoson'])] };
    await triggerEvent(fileInput, 'change', mockFile);
    assert.dom('[data-test-mox-upload-paste-field]').hasValue('Caperezoson');
  });

  module('dark mode', function () {
    test('it renders correctly', async function (assert) {
      await render(hbs`
        <div class="dark bg-gray-900">
          <Mox::Upload
            @label="Charizard"
            @format=".pdf"
            @onInput={{this.dummyAction}} />
        </div>
      `);

      assert
        .dom('[data-test-mox-upload-label]')
        .hasStyle({ color: 'rgb(209, 213, 219)' });
      assert
        .dom('[data-test-mox-upload-start-upload]')
        .hasStyle({ borderColor: 'rgb(107, 114, 128)' });
      assert
        .dom('[data-test-mox-upload-paste]')
        .hasStyle({ color: 'rgb(6, 182, 212)' });
      assert
        .dom('[data-test-mox-upload-file-upload]')
        .hasStyle({ color: 'rgb(6, 182, 212)' });
      assert
        .dom('[data-test-mox-upload-format-requirements]')
        .hasStyle({ color: 'rgb(255, 255, 255)' });
    });

    test('it is accessible', async function (assert) {
      await render(hbs`
        <div class="dark bg-gray-900">
          <Mox::Upload
            @label="Charizard"
            @format=".pdf"
            @onInput={{this.dummyAction}} />
        </div>
      `);

      await a11yAudit();
      assert.ok(true, 'it is accessible');
    });
  });

  module('light mode', function () {
    test('it renders correctly', async function (assert) {
      await render(hbs`
        <div class="bg-gray-50">
          <Mox::Upload
            @label="Charizard"
            @format=".pdf"
            @onInput={{this.dummyAction}} />
        </div>
      `);

      assert
        .dom('[data-test-mox-upload-label]')
        .hasStyle({ color: 'rgb(55, 65, 81)' });
      assert
        .dom('[data-test-mox-upload-start-upload]')
        .hasStyle({ borderColor: 'rgb(156, 163, 175)' });
      assert
        .dom('[data-test-mox-upload-paste]')
        .hasStyle({ color: 'rgb(14, 116, 144)' });
      assert
        .dom('[data-test-mox-upload-file-upload]')
        .hasStyle({ color: 'rgb(14, 116, 144)' });
      assert
        .dom('[data-test-mox-upload-format-requirements]')
        .hasStyle({ color: 'rgb(31, 41, 55)' });
    });

    test('it is accessible', async function (assert) {
      await render(hbs`
        <div class="bg-gray-50">
          <Mox::Upload
            @label="Charizard"
            @format=".pdf"
            @onInput={{this.dummyAction}} />
        </div>
      `);

      await a11yAudit();
      assert.ok(true, 'it is accessible');
    });
  });
});
