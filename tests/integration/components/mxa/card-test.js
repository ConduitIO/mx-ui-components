import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import { a11yAudit } from 'ember-a11y-testing/test-support';

module('Integration | Component | mxa/card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders the full width card by default', async function(assert) {
    await render(hbs`<Mxa::Card />`);

    assert.dom('[data-test-mxa-card]').hasClass('w-full');
    assert.dom('[data-test-mxa-card]').doesNotHaveClass('w-container');
  });

  test('it renders the container width card if @isContainer is true', async function(assert) {
    await render(hbs`<Mxa::Card @isContainer={{true}} />`);

    assert.dom('[data-test-mxa-card]').hasClass('w-container');
    assert.dom('[data-test-mxa-card]').doesNotHaveClass('w-full');
  });

  test('it renders the main title', async function(assert) {
    await render(hbs`<Mxa::Card>
      <:title>Hello World!</:title>
    </Mxa::Card>`);

    assert.dom('[data-test-mxa-card-title]').includesText('Hello World');
    assert.dom('[data-test-mxa-card-sub-title]').doesNotExist();
  });

  test('it renders the sub title', async function(assert) {
    await render(hbs`<Mxa::Card>
      <:sub-title>Hello World!</:sub-title>
    </Mxa::Card>`);

    assert.dom('[data-test-mxa-card-sub-title]').includesText('Hello World!');
    assert.dom('[data-test-mxa-card-title]').doesNotExist();
  });

  test('it renders (full configuration)', async function(assert) {
    await render(hbs`<Mxa::Card>
      <:title>Hello World!</:title>
      <:sub-title>Hi again!</:sub-title>
      <:body>Sample text: <input type="text" value="rendering" /></:body>
    </Mxa::Card>`);

    assert.dom('[data-test-mxa-card-title]').includesText('Hello World!');
    assert.dom('[data-test-mxa-card-sub-title]').includesText('Hi again!');
    assert.dom('[data-test-mxa-card-body]').includesText('Sample text');
    assert.dom('[data-test-mxa-card-body] input').hasValue('rendering');
  });

  test('it renders (simple yield usage)', async function(assert) {
    await render(hbs`<Mxa::Card>
      <h1>Hello World!</h1>
      <h2>Hi again!</h2>
      <p>Sample text: <input type="text" value="rendering" /></p>
    </Mxa::Card>`);

    assert.dom('[data-test-mxa-card] h1').includesText('Hello World!');
    assert.dom('[data-test-mxa-card] h2').includesText('Hi again!');
    assert.dom('[data-test-mxa-card] p').includesText('Sample text');
    assert.dom('[data-test-mxa-card] input').hasValue('rendering');
  });

  test('it is accessible', async function(assert) {
    await render(hbs`<Mxa::Card>
      <:title>Hello World!</:title>
      <:sub-title>Hi again!</:sub-title>
      <:body>Sample text</:body>
    </Mxa::Card>`);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
