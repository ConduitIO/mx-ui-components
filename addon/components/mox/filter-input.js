import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { isEmpty, isPresent } from '@ember/utils';

export default class MoxFilterInputComponent extends Component {
  focusId = 'tags-input';
  secondaryId = 'tags-input-secondary';

  @tracked
  availableTags = A(this.args.availableTags);

  @tracked
  selectedTags = A([]);
  // selectedTags = A([{ name: 'source', value: 'source', type: 'primary', exclusive: true }]);

  @tracked
  foundTags = A([]);

  @tracked
  mainInputId = this.focusId;

  @tracked
  nestedInputId = this.secondaryId;

  @tracked
  value = '';

  @tracked
  secondaryValue = null;

  @tracked
  isNested = false;

  @tracked
  filterCategory = null;
  // filterCategory = 'source';

  @tracked
  currentFilter = null;

  @tracked
  isEnteringCustomOption = false;

  @tracked
  internalSelectedIdx = 0;

  @tracked
  showTags = false;


  get allTags() {
    let secondaryTags = [];
    let primaryTags = this.availableTags.map(group => {
      if (group.categories) {
        return group.categories.map((category) => {
          let secondary = this.createSecondaryTagOption(category.options, category.category);
          secondaryTags.push(...secondary);
          return this.createPrimaryTagOption(category, group);
        });
      }

      return this.createPrimaryTagOption(group, group);
    });

    let tags = [...primaryTags, ...secondaryTags];
    return tags.flat();
  }

  get sourceTags() {
    return  this.isNested ? this.allSecondaryTags : this.allPrimaryTags;
  }

  createPrimaryTagOption(tagCategory, group) {
    return {
      name: tagCategory.name ? tagCategory.name : tagCategory.category,
      value: tagCategory.category,
      customLabel: tagCategory.label,
      type: 'primary',
      exclusive: group.exclusive,
      custom: tagCategory.custom ? tagCategory.custom : false,
      group: group.group,
      noKey: tagCategory.noKey,
      queryValues: tagCategory.queryValues  ? tagCategory.queryValues : {},
      category: group.group ? group.group : tagCategory.category,
    };
  }

  createSecondaryTagOption(tags, categoryName) {
    return tags.map(tag => {
      tag.type = 'secondary';
      tag.category = categoryName;
      return tag;
    });
  }

  get allPrimaryTags() {
    if (isPresent(this.allTags)) {
      return this.allTags.filter((tag) => tag.type === 'primary');
    }

    return [];
  }

  get allSecondaryTags() {
    let filter = this.filterCategory;

    if (isPresent(filter)) {
      return this.allTags.filter((tag) => tag.category === filter);
    }

    return [];
  }

  get hasNoMoreFoundTags() {
    return isEmpty(this.foundTags);
  }

  get hasSelectedAllOptions() {
    return this.hasWildCardSelected && this.hasNoMoreFoundTags;
  }

  get showWildCardOption() {
    return isPresent(this.value) && !this.hasWildCardSelected && !this.isNested;
  }

  get keywordOption() {
    return this.allTags.find(tag => tag.group === 'keywords');
  }

  get wildCard() {
    return {
      ...this.keywordOption,
      name: `Search logs for keyword "${this.value}"`,
    };
  }

  get hasWildCardSelected() {
    return this.selectedTags.some(tag => tag.group === 'keywords');
  }

  get isValid() {
    return this.args.isValid ? this.args.isValid : true;
  }

  get primarySelectedTags() {
    return this.selectedTags.filter(tag => tag.type === 'primary');
  }

  get secondarySelectedTags() {
    return this.selectedTags.filter(tag => tag.type === 'secondary');
  }

  get isDisabled() {
    if (isPresent(this.args.isDisabled)) {
      return this.args.isDisabled;
    }

    return this.hasSelectedAllOptions;
  }

  get hasSecondaryTheme() {
    return this.args.theme === 'secondary';
  }

  isTagUnavailable(selectedTags, sourceTag) {
    return selectedTags.some(selected => {
      return selected.exclusive && selected.group === sourceTag.group;
    });
  }

  checkForTags(newInput) {
    if (newInput.value === '') {
      this.foundTags = A([]);
      return;
    }

    this.showTags = true;

    if (isPresent(this.sourceTags)) {
      let foundTags = this.sourceTags;
      if (isPresent(this.selectedTags) || isPresent(newInput)) {
        foundTags = this.sourceTags.filter(this.includesAvailableTag.bind(this, newInput));
      }

      this.foundTags = foundTags;
    } else {
      this.initCustomSelection();
    }
  }

  includesAvailableTag(searchTerm, tag) {
    let shouldExcludeTag = this.isTagUnavailable(this.selectedTags, tag);
    return (!shouldExcludeTag && !tag.noKey || tag.type === 'secondary') && (tag.value?.indexOf(searchTerm) === 0 || tag.name?.indexOf(searchTerm) === 0);
  }

  initNestedFocus() {
    this.mainInputId = this.secondaryId;
    this.nestedInputId = this.focusId;
    this.value = null;
    this.isNested = true;
  }

  initCustomSelection() {
    this.isEnteringCustomOption = true;
  }

  resetField() {
    this.isNested = false;
    this.mainInputId = this.focusId;
    this.nestedInputId = this.secondaryId;
    this.value = null;
  }

  @action
  hideTags() {
    this.showTags = false;
  }

  softResetTags() {
    this.filterCategory = null;
    this.foundTags = A([]);
  }

  resetTags(tag) {
    this.softResetTags();
    let primaryTag = tag;
    let secondaryTag = this.selectedTags.find(sTag => sTag.category === primaryTag.value);
    this.selectedTags.removeObject(primaryTag);
    this.selectedTags.removeObject(secondaryTag);
    this.currentFilter = null;
    this.secondaryValue = null;
  }

  reset(tag) {
    this.resetTags(tag);
    this.resetField();
  }

  handleEnterKey(event, cb) {
    const isEnter = event.keyCode === 13;

    if (isEnter) {;
      if (cb) {
        cb();
      }
    }
  }

  handleBackspace(event, value) {
    const hasTags = this.selectedTags.length > 0;
    if (event.keyCode === 8 && isEmpty(value) && hasTags) {
      let primaryTags = this.selectedTags.filter(tag => tag.type === 'primary');
      let lastPrimaryTag = primaryTags.at(-1);
      let tagForRemoval = isPresent(lastPrimaryTag) ? lastPrimaryTag : this.selectedTags.lastObject;
      this.removeTag(tagForRemoval);
    }
  }

  @action
  keyboardAction(event) {
    let value = event.target.value;

    this.handleEnterKey(event);
    this.handleBackspace(event, value);
  }

  @action
  keyboardActionOption(option, event) {
    let value = option.value;
    this.handleEnterKey(event, this.setOption.bind(this, option, value));
  }

  @action
  keyboardActionCustomOption(option, event) {
    this.handleEnterKey(event, this.setCustomOption.bind(this, option));
  }

  @action
  checkForExistingTags(event) {
    this.checkForTags(event.target.value);
  }

  @action
  checkInputForExistingTags(newInput) {
    this.value = newInput;
    this.checkForTags(newInput);
  }

  @action
  checkSecondaryInputForExistingTags(newInput) {
    this.secondaryValue = newInput;
    this.checkForTags(newInput);
  }

  @action
  removeTag(tag) {
    this.reset(tag);
    this.checkForTags('');
  }

  @action
  setOption(tag) {
    this.args.onSelect(tag);
    this.selectedTags.pushObject(tag);

    if (tag.type === 'primary') {
      this.setPrimaryOption(tag);
    } else {
      this.setSecondaryOption(tag);
    }
  }

  setPrimaryOption(tag) {
    this.filterCategory = tag.value;
    this.foundTags = A([]);
    this.initNestedFocus();
    this.checkSecondaryInputForExistingTags('');
  }

  setSecondaryOption(tag) {
    this.currentFilter = tag.value;
    this.softResetTags();
    this.resetField();
    this.secondaryValue = null;
    this.checkInputForExistingTags('');
  }

  setCustomOption(tag, optionalValue) {
    let value = optionalValue ? optionalValue : this.value;
    let queryValues = tag.queryValues;

    if (isPresent(queryValues)) {
      tag.queryValues[tag.value] = value;
    }

    this.args.onSelect(tag);

    this.currentFilter = null;
    this.selectedTags.pushObject(this.keywordOption);
    this.selectedTags.pushObject({ name: value, value: value, type: 'secondary', exclusive: tag.exclusive, category: tag.value  });

    this.softResetTags();
    this.resetField();

    this.secondaryValue = null;
    this.checkInputForExistingTags('');
  }

  @action
  setCustomFilter(tag) {
    this.setCustomOption(tag);
  }
}
