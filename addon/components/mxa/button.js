import Component from '@glimmer/component';

export default class MxaButtonComponent extends Component {
  buildButtonClass(buttonType) {
    switch (buttonType) {
      case 'primary':
        return 'mxa-btn-primary';
      case 'secondary':
        return 'mxa-btn-secondary';
      case 'tertiary':
        return '';
    }
  }

  get buttonClass() {
    const buttonType = this.args.buttonType ? this.args.buttonType : 'primary';
    return this.buildButtonClass(buttonType);
  }
}
