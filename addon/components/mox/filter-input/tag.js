import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MoxFilterInputTagComponent extends Component {
  get subTag() {
    return this.args.secondaryTags.find(secondTag => secondTag.category === this.args.tag.value);
  }

  resizeInput(target) {
    let length = target.value.length + 0.2;
    target.style.width = length + "ch";
  }

  @action
  onInput(event) {
    if (!this.args.onInput) {
      return;
    }

    this.resizeInput(event.target);
    return this.args.onInput(event.target.value, event);
  }

  @action
  onKeydown(event) {
    if (!this.args.onKeydown) {
      return;
    }

    return this.args.onKeydown(event);
  }
}
