import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | focus-on-render', function (hooks) {
  setupRenderingTest(hooks);

  test('it automatically sets focus onto the modified element', async function (assert) {
    await render(
      hbs`<input id="input-1" type="text" {{focus-on-render}} /><label for="input-1">Example input</label>`
    );

    assert.dom('input').isFocused();
  });
});
