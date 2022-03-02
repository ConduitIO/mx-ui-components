import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';

const buttonColors = {
  primary: 'border-cyan-500 text-white active:text-cyan-500',
  secondary:
    'border-white text-white active:text-gray-300 active:border-gray-300',
  danger: 'border-red-500 text-red-500 active:text-white',
};

export default class MoxButtonComponent extends Component {
  @tracked initialWidth;
  defaultType = 'primary';

  get buttonStyle() {
    if (!this.actionTask.isIdle) {
      return htmlSafe(`width: ${this.initialWidth}px`);
    }
    return htmlSafe('');
  }

  get buttonTypeClass() {
    let type = this.args.buttonType || this.defaultType;
    return buttonColors[type];
  }

  buildButtonClass() {
    let classesList = ['border', 'active:border-2'];

    if (this.args.small) {
      classesList.push('mxa-btn-small');
    } else {
      classesList.push('mxa-btn');
    }

    classesList.push(this.buttonTypeClass);

    return classesList.join(' ');
  }

  get buttonClass() {
    return this.buildButtonClass(this.args.buttonType);
  }

  get disabledClass() {
    return 'disabled:border-transparent disabled:bg-gray-800 disabled:text-gray-300 disabled:font-normal disabled:cursor-not-allowed';
  }

  get buttonTitle() {
    return this.args.title || 'Submit';
  }

  get buttonTypeAttr() {
    if (this.args.type === 'submit') {
      return 'submit';
    } else {
      return 'button';
    }
  }

  get isDisabled() {
    return this.args.isDisabled || this.actionTask.isRunning;
  }

  @dropTask
  @waitFor
  *actionTask(event) {
    if (this.args.type === 'submit') {
      event.preventDefault();
    }
    yield this.args.onClick();
  }

  @action
  getButtonWidth(element) {
    this.initialWidth = element.offsetWidth;
  }
}
