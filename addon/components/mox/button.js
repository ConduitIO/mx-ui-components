import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';

const buttonColors = {
  primary:
    'text-white border-cyan-700 bg-cyan-700 active:bg-cyan-600 hover:border-cyan-600 hover:bg-cyan-500 focus:bg-cyan-500',
  secondary:
    'text-gray-700 bg-transparent hover:text-gray-900 dark:text-white hover:text-gray-100 border-gray-300 dark:border-gray-700 active:border-gray-400 dark:active:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 focus:border-2 focus:border-gray-500 focus:text-gray-600 dark:focus:border-gray-200 dark:focus:text-gray-200',
  danger:
    'text-white border-red-600 bg-red-600 active:bg-red-700 hover:bg-red-700 hover:border-red-700 focus:border-red-500 focus:bg-red-500 dark:border-red-800 dark:bg-red-800 dark:active:bg-red-900 dark:hover:bg-red-700 dark:hover:border-red-700 dark:focus:border-red-700 dark:focus:bg-red-700',
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
      'focus:outline-none',
      'focus:ring-1',
      'focus:ring-inset',
      'focus:ring-white',
      'transition',
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
    return 'disabled:text-gray-800 disabled:bg-gray-300 disabled:border-gray-300 dark:disabled:text-gray-200 dark:disabled:bg-gray-700 dark:disabled:border-gray-700 disabled:cursor-not-allowed';
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
