import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MxaAsyncButtonComponent extends Component {
  @tracked initialWidth;

  get buttonStyle() {
    if (!this.actionTask.isIdle) {
      return htmlSafe(`width: ${this.initialWidth}px`);
    }
  }

  @dropTask
  *actionTask() {
    yield this.args.onClick();
  }

  @action
  getButtonWidth(element) {
    this.initialWidth = element.offsetWidth;
  }
}
