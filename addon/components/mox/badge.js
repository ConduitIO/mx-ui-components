import Component from '@glimmer/component';

export default class MoxBadgeComponent extends Component {
  get colorClass() {
    const genericStatusMap = {
      healthy: 'bg-green-600 text-white',
      caution: 'bg-yellow-300 text-orange-800',
      danger: 'bg-red-600 text-white',
      neutral: 'bg-gray-600 text-white',
    };

    if (!this.args.status || !genericStatusMap[this.args.status]) {
      return genericStatusMap['neutral'];
    }

    return genericStatusMap[this.args.status];
  }
}
