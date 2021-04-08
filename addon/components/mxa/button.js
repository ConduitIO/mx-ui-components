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
      case 'danger':
        return 'mxa-btn-primary bg-saffron-100 border-saffron-100';
      default:
        return 'mxa-btn-primary';
    }
  }

  get buttonClass() {
    return this.buildButtonClass(this.args.buttonType);
  }
}
