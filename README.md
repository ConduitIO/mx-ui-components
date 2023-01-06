# mx-ui-components

Meroxa UI component library.

## Compatibility

- Ember.js v4.0 or above
- Ember CLI v4.0 or above
- Node.js v16 or above

## Installation

```
ember install mx-ui-components
```

## Usage

All component usage is documented via Storybook stories. Please see the instructions below on how to run storybook.
Or you can view [the demo storybook site](https://6109b9596e1c1300390c39c5-gbnmeyicen.chromatic.com/?path=/story/fonts--font-sizes)

## Contributing

This addon uses [Storybook](https://storybook.js.org/) to allow the development
and display of UI components. Add new and modify existing components via
[Stories](https://storybook.js.org/docs/react/get-started/whats-a-story)
located in the `stories` folder.

## Run Storybook

- `yarn run storybook`

For more info on testing, building and linting the project,
see the [Contributing](CONTRIBUTING.md) guide for details.

## Accessibility

This addon uses [ember-a11y-testing](https://emberobserver.com/addons/ember-a11y-testing)
to verify that UI components are accessible.

When creating a new component, you can create an integration test case and
add the `a11yAudit` test helper after rendering the component to surface
and fix any a11y bugs.

Example test case:

```javascript
import { a11yAudit } from 'ember-a11y-testing/test-support';
// ...

module('Integration | Component | my-accessible-form-field', function (hooks) {
  test('test for a11y', async function (assert) {
    await render(hbs`
      <MyAccessibleFormField />
    `);

    await a11yAudit();
    assert.ok(true, 'no a11y detected');
  });
});
```

For more information, check out the documentation for [ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing#ember-a11y-testing).
When encountering any accessibility bugs, you can review strategies on fixing
them with the list of [WCAG rules by Axe Core](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
