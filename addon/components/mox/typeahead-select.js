import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';

export default class MoxTypeaheadSelect extends Component {
  constructor() {
    super(...arguments);
    this.inputValue = this.args.selectedOption[this.optionNameKey];
  }

  allOptions = A(this.args.options);

  @tracked
  inputValue = '';

  @tracked
  isShowingMatches = false;

  isFocusedWithoutPopup = false;

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

  get matches() {
    if (this.inputValue === '') {
      // Filter selected match to the top of the list
      const restOptions = this.allOptions.reject((item) => {
        return (
          this.args.selectedOption[this.optionValueKey] ===
          item[this.optionValueKey]
        );
      });

      return [this.args.selectedOption, ...restOptions];
    } else {
      // Filter on search term
      return this.allOptions.filter((item) => {
        const filterOn = (value) => {
          return (
            value.toLowerCase().indexOf(this.inputValue.toLowerCase()) !== -1
          );
        };
        const filterOnName = filterOn(item[this.optionNameKey]);
        const filterOnValue = filterOn(item[this.optionValueKey]);

        return filterOnName || filterOnValue;
      });
    }
  }

  @tracked
  internalSelectedIdx = 0;

  get internalSelectedOption() {
    return this.matches[this.internalSelectedIdx];
  }

  @action
  setSelectedOption(option) {
    this.args.onChange(option);
    this.inputValue = this.args.selectedOption[this.optionNameKey];
    this.internalSelectedIdx = 0;
    this.isShowingMatches = false;
  }

  @action
  showMatches() {
    this.inputValue = '';
    this.isShowingMatches = true;
  }

  @action
  hideMatches() {
    this.inputValue = this.args.selectedOption[this.optionNameKey];
    this.internalSelectedIdx = 0;
    this.isShowingMatches = false;
  }

  @action
  escapeMatches() {
    this.hideMatches();
    this.isFocusedWithoutPopup = true;
  }

  @action
  enterMatch(option) {
    if (option === undefined) {
      this.inputValue = '';
    } else {
      this.setSelectedOption(option);
    }

    this.isFocusedWithoutPopup = true;
  }

  @action
  nextMatch() {
    const matchIdx = this.internalSelectedIdx;
    const nextIdx = (matchIdx + 1) % this.matches.length;

    this.internalSelectedIdx = nextIdx;
  }

  @action
  previousMatch() {
    const matchIdx = this.internalSelectedIdx;
    const previousIdx = matchIdx === 0 ? this.matches.length - 1 : matchIdx - 1;

    this.internalSelectedIdx = previousIdx;
  }

  @action
  checkFocus() {
    if (this.isFocusedWithoutPopup) {
      this.isShowingMatches = true;
      this.isFocusedWithoutPopup = false;
    }
  }
}
