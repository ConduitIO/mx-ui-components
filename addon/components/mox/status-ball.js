import Component from '@glimmer/component';

const colorMap = {
  healthy: 'bg-green-600',
  caution: 'bg-yellow-300',
  danger: 'bg-red-600',
};

export default class StatusBallComponent extends Component {
  get colorClass() {
    return colorMap[this.args.status] || 'bg-red-600';
  }
}
