import Component from '@glimmer/component';
import { dropTask } from 'ember-concurrency';

export default class MxaAsyncButtonComponent extends Component {
  @dropTask
  *actionTask() {
    yield this.args.onClick();
  }
}
