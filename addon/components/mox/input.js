import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MoxInputComponent extends Component {
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
