import Component from '@glimmer/component';
import { later } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MxaSlidePanelComponent extends Component {
  @tracked
  isShowing = false;

  @action
  animateIn() {
    later(
      this,
      function () {
        this.isShowing = true;
      },
      100
    );
  }

  @action
  animateOut() {
    this.isShowing = false;
    later(
      this,
      function () {
        this.args.onDismiss();
      },
      500
    );
  }
}
