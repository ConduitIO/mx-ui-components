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

  get themeClasses() {
    let lightMode = `bg-gray-50 text-gray-800 disabled:bg-gray-200 disabled:text-gray-600 disabled:border-gray-200`;
    let darkMode = `dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-500 dark:disabled:border-gray-700`;
    return `${lightMode} ${darkMode}`;
  }

  get validThemeClasses() {
    let lightMode = `border-gray-300 focus:border-cyan-500 focus:ring-cyan-500`;
    let darkMode =
      'dark:border-gray-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-500';
    return `${lightMode} ${darkMode}`;
  }

  get invalidThemeClasses() {
    let lightMode = `border-red-600 active:border-red-700 focus:border-red-500 focus:ring-red-500`;
    let darkMode =
      'dark:border-red-800 dark:active:border-red-900 dark:focus:border-red-900 dark:focus:ring-red-900';
    return `${lightMode} ${darkMode}`;
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
