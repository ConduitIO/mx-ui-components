import Component from '@glimmer/component';

export default class MoxIconComponent extends Component {
  get sizeClass() {
    if (this.args.size === 'large') {
      return 'h-8 w-8';
    }

    if (this.args.size === 'small') {
      return 'h-4 w-4';
    }

    if (this.args.size === 'x-small') {
      return 'h-2.5 w-2.5';
    }

    return 'h-6 w-6';
  }
}
