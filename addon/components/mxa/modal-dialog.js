import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class MxaModalDialogComponent extends Component {
  get elementId() {
    return guidFor(this);
  }

  get titleId() {
    return `mxa-dialog-title-${this.elementId}`;
  }

  get contentId() {
    return `mxa-dialog-content-${this.elementId}`;
  }

  @action onDidInsert() {
    if (this.args.didInsert) {
      this.args.didInsert();
    }
  }
}
