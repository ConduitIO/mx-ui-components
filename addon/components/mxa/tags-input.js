import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class MxaTagsInputComponent extends Component {
  @tracked
  allTags = A(this.args.availableTags);

  @tracked
  selectedTags = A([]);

  @tracked
  foundTags = A([]);


  @action
  checkBackspace(event) {
    const isBackspace = event.keyCode === 8;
    const isBlankInput = event.target.value === '';
    const hasTags = this.selectedTags.length > 0;
    if (isBackspace && isBlankInput && hasTags) {
      this.removeTag(this.selectedTags.lastObject);
    }
  }

  @action
  checkInputForExistingTags(event) {
    const newInput = event.target.value;

    if (newInput === '') {
      this.foundTags = A([]);
      return;
    }

    const foundTags = this.allTags.filter((tag) => {
      return tag.indexOf(newInput) === 0
    });

    this.foundTags = foundTags;
  }

  @action
  selectTag(tag) {
    this.selectedTags.pushObject(tag);
    this.allTags = this.allTags.reject((t) => t === tag);
    this.foundTags = A([]);
  }

  @action
  removeTag(tag, event) {
    this.selectedTags.removeObject(tag);
  }
}
