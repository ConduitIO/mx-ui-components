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
      warning: {
        title: 'heads up',
        bgColorClass: 'bg-yellow-400',
        textColorClass: 'text-yellow-400',
        svg: '/svg-defs.svg#notification-bell-24',
      },
      info: {
        title: 'heads up',
        bgColorClass: 'bg-cyan-500',
        textColorClass: 'text-cyan-500',
        svg: '/svg-defs.svg#info-circle-24',
      },
    };

    return details[this.args.toastType] || details['success'];
  }
}
