import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mxa/slide-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it displays when it is set to showing', async function(assert) {
    await render(hbs`
      <Mxa::SlidePanel>
        Oh? You're approaching me?
      </Mxa::SlidePanel>
    `);
    await settled();

    assert.dom('[data-test-slide-panel]').doesNotHaveClass('translate-x-full');
  });
});
