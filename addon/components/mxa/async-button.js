import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { waitFor } from '@ember/test-waiters';

export default class MxaAsyncButtonComponent extends Component {
  @tracked initialWidth;

  get buttonStyle() {
    if (!this.actionTask.isIdle) {
      return htmlSafe(`width: ${this.initialWidth}px`);
    }
    return htmlSafe('');
  }

  @dropTask
  @waitFor
  *actionTask() {
    yield this.args.onClick();
  }

  @action
  getButtonWidth(element) {
    this.initialWidth = element.offsetWidth;
  }
}
