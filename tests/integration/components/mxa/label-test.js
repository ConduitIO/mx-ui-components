import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/label', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Mxa::Label>
        Label text
      </Mxa::Label>
    `);

    assert.equal(this.element.textContent.trim(), 'Label text');
  });

  test('it is not marked as required by default', async function (assert) {
    await render(hbs`
      <Mxa::Label>
        Label text
      </Mxa::Label>
    `);

    assert.dom('[data-test-label]').doesNotHaveClass('required');
  });

  test('it is marked visually if set as required', async function (assert) {
    await render(hbs`
      <Mxa::Label @isRequired={{true}}>
        Label text
      </Mxa::Label>
    `);

    assert.dom('[data-test-label]').hasClass('required');
    assert.dom('[data-test-label]').hasPseudoElementStyle(':after', {
      content: '""',
      backgroundColor: 'rgb(194, 65, 12)',
    });
  });
});
