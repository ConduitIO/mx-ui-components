import Component from '@glimmer/component';
import { get } from "@ember/object";

export default class MxaSelectOptionComponent extends Component {
  get optionName() {
    const optionNameKey = this.args.optionNameKey;

    return get(this.args.option, optionNameKey);
  }

  get optionValue() {
    const optionValueKey = this.args.optionValueKey;

    return get(this.args.option, optionValueKey);
  }

  get selectedOptionValue() {
    const optionValueKey = this.args.optionValueKey;

    return get(this.args.selectedOption, optionValueKey);
  }
}
