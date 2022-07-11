import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { next } from '@ember/runloop';

export default class MoxUploadComponent extends Component {
  @tracked
  isPasting = false;

  @tracked
  pastingValue = '';

  get fieldName() {
    let label = this.args.label || 'file-upload';
    return dasherize(label);
  }

  @action
  handleFileInput(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.isPasting = true;
      this.pastingValue = e.target.result;

      // this is allowing us to avoid a maximum call stack size exceeded error when triggering the input event right
      // after just setting the input value programmatically
      next(() =>
        document
          .querySelector('#credential-paste-field')
          .dispatchEvent(new Event('input'))
      );
    };

    reader.readAsText(event.target.files[0]);
  }

  @action
  clickHiddenFileInput() {
    document.querySelector(`#${this.fieldName}-file-input`).click();
  }
}
