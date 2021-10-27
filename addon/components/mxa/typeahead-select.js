import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class MxaTypeaheadSelectComponent extends Component {
  constructor() {
    super(...arguments);
    this.inputValue = this.args.selectedOption[this.optionNameKey];
  }

  allOptions = A(this.args.options);

  @tracked
  inputValue = '';

  @tracked
  isShowingMatches = false;

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

  @action
  setSelectedOption(option) {
    this.args.onChange(option);
    this.inputValue = this.args.selectedOption[this.optionNameKey];
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
    this.isShowingMatches = false;
  }
}
