import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MoxInputComponent extends Component {
  get isValid() {
    if (isPresent(this.args.isValid)) {
      return this.args.isValid;
    }

    return true;
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
