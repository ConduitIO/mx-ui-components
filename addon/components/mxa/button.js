import Component from '@glimmer/component';

export default class MxaButtonComponent extends Component {
  get buttonTypeClass() {
    return this.args.buttonType ? `mxa-btn-${this.args.buttonType}` : 'mxa-btn-primary';
  }

  buildButtonClass(buttonType) {
    let classesList = [];

    if (this.args.small) {
      classesList.push('mxa-btn-small');
    } else {
      classesList.push('mxa-btn');
    }

    if (this.args.noFill) {
      classesList.push('bg-white', 'border-red-600', 'text-red-600', 'active:bg-gray-50');
    }

    classesList.push(this.buttonTypeClass);

    return classesList.join(' ');
  }

  get buttonClass() {
    return this.buildButtonClass(this.args.buttonType);
  }

  get buttonTitle() {
    return this.args.title || 'Submit';
  }
}
