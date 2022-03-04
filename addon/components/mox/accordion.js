import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MoxAccordionComponent extends Component {
  @tracked isOpen = false;

  constructor() {
    super(...arguments);
    if (this.args.isOpen) {
      this.isOpen = this.args.isOpen;
    }
  }

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
