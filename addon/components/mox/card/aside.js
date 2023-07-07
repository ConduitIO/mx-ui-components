import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MoxCardAsideComponent extends Component {
  @action
  onClick() {
    if (isPresent(this.args.onClick)) {
      this.args.onClick();
    }
  }
}
