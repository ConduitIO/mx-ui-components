import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

export default class MxaToggleComponent extends Component {
  @tracked
  isChecked;

  constructor() {
    super(...arguments);
    this.isChecked = this.args.isChecked || false;
    assert(`
      To render an accessible checkbox element, you must pass a @label argument
      or pass an @id argument while providing an external <label> with a matching for attribute to be used with Mxa::Toggle.
      Example 1: <Mxa::Toggle @label="First name">
      Example 2: <label for="first-name">Name</label><Mxa::Toggle @id="first-name" />
    `, isPresent(this.args.label) || isPresent(this.args.id));
  }

  get fieldId() {
    return this.args.id ? this.args.id : dasherize(this.args.label);
  }
}
