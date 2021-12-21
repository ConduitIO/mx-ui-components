import Component from '@glimmer/component';

export default class MxaIconComponent extends Component {
  get sizeClass() {
    if (this.args.size === 'large') {
      return 'h-8 w-8';
    }

    return 'h-6 w-6';
  }
}
