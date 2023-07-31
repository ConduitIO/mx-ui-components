import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mox/filter-input/tag', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('dummyAction', () => {});
    this.set('defaultPrimaryTag', {
      name: 'source',
      value: 'source',
      type: 'primary',
      exclusive: true,
      custom: false,
      group: 'connectors',
      queryValues: {},
      category: 'connectors',
    });

    this.set('defaultSecondaryTags', [{
      name: 'sqlserver',
      value: 'sqlserver',
      type: 'secondary',
      category: 'source',
    }]);
  })

  test('it renders (with primary tag)', async function (assert) {
    this.set('primaryTag', this.defaultPrimaryTag);
    this.set('secondaryTags', []);

    await render(hbs`<Mox::FilterInput::Tag
      @tag={{this.primaryTag}}
      @secondaryTags={{this.secondaryTags}}
      @value="Lund"
      @id="malmoe"
      @onInput={{this.dummyAction}}
      @onKeydown={{this.dummyAction}}
      @placeholder="uppsala"
      @removeTag={{this.dummyAction}}
      @hasFullSelection={{false}}
    />`);

    assert.dom('[data-test-mox-filter-input-tag="source"]').hasText('source:');
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-input]').hasValue('Lund');
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-remove-button]').exists();
  });

  test('it renders (with primary and secondary tag)', async function (assert) {
    this.set('primaryTag', this.defaultPrimaryTag);
    this.set('secondaryTags', this.defaultSecondaryTags);

    await render(hbs`<Mox::FilterInput::Tag
      @tag={{this.primaryTag}}
      @secondaryTags={{this.secondaryTags}}
      @value=""
      @id="malmoe"
      @onInput={{this.dummyAction}}
      @onKeydown={{this.dummyAction}}
      @placeholder="uppsala"
      @removeTag={{this.dummyAction}}
      @hasFullSelection={{false}}
    />`);

    assert.dom('[data-test-mox-filter-input-tag="source"]').hasText('source: sqlserver');
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-input]').doesNotExist();
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-remove-button]').exists();
  });

  test('it shows the matching sub tag based on the tag category', async function (assert) {
    this.set('primaryTag', {
      name: 'source',
      value: 'steampunk',
      type: 'primary',
      exclusive: true,
      custom: false,
      group: 'connectors',
      queryValues: {},
      category: 'connectors',
    });

    this.set('secondaryTags', [{
      name: 'cyberpunk',
      value: 'cyberpunk',
      type: 'secondary',
      category: 'steampunk',
    },{
      name: 'mysql',
      value: 'mysql',
      type: 'secondary',
      category: 'source',
    },
    {
      name: 'snowflake',
      value: 'snowing',
      type: 'secondary',
      category: 'destination',
    }]);

    await render(hbs`<Mox::FilterInput::Tag
      @tag={{this.primaryTag}}
      @secondaryTags={{this.secondaryTags}}
      @value=""
      @id="malmoe"
      @onInput={{this.dummyAction}}
      @onKeydown={{this.dummyAction}}
      @placeholder="uppsala"
      @removeTag={{this.dummyAction}}
      @hasFullSelection={{false}}
    />`);

    assert.dom('[data-test-mox-filter-input-tag="steampunk"]').hasText('steampunk: cyberpunk');
    assert.dom('[data-test-mox-filter-input-tag="steampunk"] [data-test-mox-filter-input-tag-input]').doesNotExist();
    assert.dom('[data-test-mox-filter-input-tag="steampunk"] [data-test-mox-filter-input-tag-remove-button]').exists();
  });

  test('it renders (dark mode)', async function (assert) {
    this.set('primaryTag', this.defaultPrimaryTag);
    this.set('secondaryTags', []);

    await render(hbs`
      <div class="dark bg-gray-900 p-4">
        <Mox::FilterInput::Tag
        @tag={{this.primaryTag}}
        @secondaryTags={{this.secondaryTags}}
        @value="Lund"
        @id="malmoe"
        @onInput={{this.dummyAction}}
        @onKeydown={{this.dummyAction}}
        @placeholder="uppsala"
        @removeTag={{this.dummyAction}}
        @hasFullSelection={{false}}
      />
      </div>`);

    assert.dom('[data-test-mox-filter-input-tag="source"]').hasStyle({ backgroundColor: 'rgb(55, 65, 81)', color: 'rgb(255, 255, 255)' });
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-input]').hasStyle({ color: 'rgb(255, 255, 255)' });
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-remove-button]').hasStyle({ color: 'rgb(255, 255, 255)' });
  });

  test('it renders (light mode)', async function (assert) {
    this.set('primaryTag', this.defaultPrimaryTag);
    this.set('secondaryTags', []);

    await render(hbs`
      <div class="bg-gray-50 p-4">
        <Mox::FilterInput::Tag
        @tag={{this.primaryTag}}
        @secondaryTags={{this.secondaryTags}}
        @value="Lund"
        @id="malmoe"
        @onInput={{this.dummyAction}}
        @onKeydown={{this.dummyAction}}
        @placeholder="uppsala"
        @removeTag={{this.dummyAction}}
        @hasFullSelection={{false}}
      />
      </div>`);

    assert.dom('[data-test-mox-filter-input-tag="source"]').hasStyle({ backgroundColor: 'rgb(229, 231, 235)', color: 'rgb(55, 65, 81)' });
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-input]').hasStyle({ color: 'rgb(31, 41, 55)' });
    assert.dom('[data-test-mox-filter-input-tag="source"] [data-test-mox-filter-input-tag-remove-button]').hasStyle({ color: 'rgb(31, 41, 55)' });
  });
});
