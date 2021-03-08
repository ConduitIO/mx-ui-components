import Component from '@glimmer/component';

export default class MxaButtonComponent extends Component {
  buildButtonClass(buttonType) {
    switch (buttonType) {
      case 'primary':
        return 'mxa-btn-primary';
      case 'secondary':
        return 'mxa-btn-secondary';
      case 'tertiary':
        return 'mxa-btn-tertiary';
      default:
        return 'mxa-btn-primary';
    }
  }

  get buttonClass() {
    return this.buildButtonClass(this.args.buttonType);
  }
}
