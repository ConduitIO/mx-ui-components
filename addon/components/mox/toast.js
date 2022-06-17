import Component from '@glimmer/component';

export default class MoxToastComponent extends Component {
  get typeDetails() {
    const details = {
      success: {
        title: 'success!',
        bgColorClass: 'bg-green-500',
        textColorClass: 'text-green-500',
        svg: '/svg-defs.svg#check',
      },
      error: {
        title: 'action required',
        bgColorClass: 'bg-red-500',
        textColorClass: 'text-red-500',
        svg: '/svg-defs.svg#alert-triangle-16',
      },
    };

    return details[this.args.toastType] || details['success'];
  }
}
