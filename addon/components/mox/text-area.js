import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MoxTextAreaComponent extends Component {
  @tracked isValid = true;

  constructor() {
    super(...arguments);

    if (isPresent(this.args.isValid)) {
      this.isValid = this.args.isValid;
    }
  }

  // Allows us to easily set input values on a parent property using
  // @onInput={{fn (mut someProperty)}}
  @action
  onInput(event) {
    if (!this.args.onInput) {
      return;
    }

    return this.args.onInput(event.target.value, event);
  }
}
