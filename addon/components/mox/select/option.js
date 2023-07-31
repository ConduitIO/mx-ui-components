import Component from '@glimmer/component';
import { action, get } from '@ember/object';

export default class MoxSelectOptionComponent extends Component {
  get optionName() {
    const optionNameKey = this.args.optionNameKey;

    return get(this.args.option, optionNameKey);
  }

  get optionValue() {
    const optionValueKey = this.args.optionValueKey;

    return get(this.args.option, optionValueKey);
  }

  get optionCategory() {
    const optionCategoryKey = this.args.optionCategoryKey;

    return optionCategoryKey ? get(this.args.option, optionCategoryKey) : null;
  }

  get selectedOptionValue() {
    const optionValueKey = this.args.optionValueKey;

    if (this.args.selectedOption) {
      return get(this.args.selectedOption, optionValueKey);
    }

    return null;
  }

  get hasSecondaryTheme() {
    return this.args.theme === 'secondary';
  }

  @action
  setOption(option) {
    if (!this.args.isDisabled) {
      this.args.setSelectedOption(option);
    }
  }

  @action
  onKeydown(option, event) {
    if (this.args.onKeydown) {
      this.args.onKeydown(option, event);
    }
  }
}
