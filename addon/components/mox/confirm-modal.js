import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MoxConfirmModalComponent extends Component {
  @tracked
  confirmedEntityName;

  get actionName() {
    return this.args.confirmableActionName;
  }

  get fullTitle() {
    if (this.actionName) {
      return `${this.actionName} ${this.args.entityName} ?`;
    }

    return `Delete ${this.args.entityName} ?`;
  }

  get buttonTitle() {
    return this.actionName ? this.actionName : 'Delete';
  }

  get isDisabled() {
    if (this.args.isTextInputRequired) {
      return this.args.entityName !== this.confirmedEntityName;
    }
    return false;
  }

  @action
  setConfirmedEntityName(event) {
    this.confirmedEntityName = event.target.value;
  }
}
