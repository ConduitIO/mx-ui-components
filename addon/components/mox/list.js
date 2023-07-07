import Component from '@glimmer/component';
import { action } from '@ember/object';
/* eslint-disable ember/no-computed-properties-in-native-classes */
import { sort } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class MoxListComponent extends Component {
  @tracked
  items;

  @tracked
  sortedBy;

  @tracked
  sortDirection;

  @sort('args.items', 'sortSetting') sortedItems;
  /* eslint-enable ember/no-computed-properties-in-native-classes */

  get sortSetting() {
    return [`${this.sortedBy}:${this.sortDirection}`];
  }

  @action
  sortByColumn(attr, sortDirection) {
    this.sortedBy = attr;
    this.sortDirection = sortDirection;
  }
}
