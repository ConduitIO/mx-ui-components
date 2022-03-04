import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class MoxModal extends Component {
  get elementId() {
    return guidFor(this);
  }

  get titleId() {
    return `mox-modal-title-${this.elementId}`;
  }

  get contentId() {
    return `mox-dialog-content-${this.elementId}`;
  }

  @action onDidInsert() {
    if (this.args.didInsert) {
      this.args.didInsert();
    }
  }
}
