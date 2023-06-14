import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';

const buttonColors = {
  primary:
    'border-cyan-700 bg-cyan-700 active:bg-cyan-800 hover:border-cyan-600 hover:bg-cyan-600 focus:bg-cyan-600',
  secondary:
    'dark:border-gray-700 dark:bg-gray-700 border-gray-500 bg-gray-500 active:bg-gray-800 dark:active:bg-gray-400 hover:border-gray-600 hover:bg-gray-600 focus:bg-gray-600',
  danger:
    'dark:border-red-800 dark:bg-red-800 bg-red-500 border-red-500 active:bg-red-900 hover:bg-red-700 hover:border-red-700 focus:border-red-900',
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
    let classesList = [
      'border',
      'text-white',
      'focus:outline-none',
      'focus:ring-1',
      'focus:ring-inset',
      'focus:ring-white',
      'focus:border-white',
    ];

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
    return 'disabled:border-gray-400 disabled:bg-gray-800 disabled:text-gray-400 disabled:font-normal disabled:cursor-not-allowed';
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
