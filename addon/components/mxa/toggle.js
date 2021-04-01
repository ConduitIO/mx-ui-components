import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MxaToggleComponent extends Component {
  @tracked
  isChecked;

  constructor() {
    super(...arguments);
    this.isChecked = this.args.isChecked || false;
  }
}
