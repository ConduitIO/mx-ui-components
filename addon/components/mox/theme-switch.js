import Component from '@glimmer/component';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { tracked } from '@glimmer/tracking';

export default class MoxThemeSwitchComponent extends Component {
  @tracked
  isChecked = false;

  allThemes = ['dark', 'light'];

  constructor() {
    super(...arguments);
    this.isChecked = this.args.isChecked || false;
  }

  get currentTheme() {
    return this.isChecked ? 'dark' : 'light';
  }

  get otherTheme() {
    return this.allThemes.filter((theme) => theme !== this.currentTheme)[0];
  }

  get label() {
    if (this.args.label) {
      return this.args.label;
    }

    return `Use ${this.otherTheme} mode`;
  }

  get fieldId() {
    return this.args.id ? this.args.id : dasherize(this.label);
  }

  @action
  switchTheme(newTheme, event) {
    this.isChecked = !this.isChecked;
    if (this.args.toggleAction) {
      this.args.toggleAction(newTheme, event);
    }
  }
}
