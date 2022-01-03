import Component from '@glimmer/component';

export default class MxaNotificationCardComponent extends Component {
  get isError() {
    return this.args.isError || this.args.error;
  }
}
