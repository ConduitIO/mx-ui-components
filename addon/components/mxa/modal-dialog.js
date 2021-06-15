import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MxaModalDialogComponent extends Component {
  @action didInsert() {
    if (this.args.didInsert) {
      this.args.didInsert();
    }
  }
}
