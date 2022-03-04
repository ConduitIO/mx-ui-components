import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class MoxCodeBlock extends Component {
  get elementId() {
    return this.args.id || guidFor(this);
  }
}
