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

  get showSecondaryTheme() {
    return this.args.theme === 'secondary';
  }

  get primaryTheme() {
    return `text-gray-800 dark:text-white bg-white dark:bg-gray-800`;
  }

  get secondaryTheme() {
    return `text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900`;
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
