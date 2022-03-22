import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class MoxSelectComponent extends Component {
  @tracked
  isShowingOptions = false;

  get isValid() {
    if (isPresent(this.args.isValid)) {
      return this.args.isValid;
    }

    return true;
  }

  get optionNameKey() {
    return this.args.optionNameKey || 'name';
  }

  get optionValueKey() {
    return this.args.optionValueKey || 'value';
  }

  get selectedOptionName() {
    const optionNameKey = this.optionNameKey;
    return get(this.args.selectedOption, optionNameKey);
  }

  @action
  toggleOptions() {
    if (this.args.isDisabled) {
      return;
    }
    this.isShowingOptions = !this.isShowingOptions;
  }

  @action
  setSelectedOption(option) {
    this.args.onChange(option);
    this.isShowingOptions = false;
  }
}
