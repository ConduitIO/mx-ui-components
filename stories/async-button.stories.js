import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { Promise } from 'rsvp';

export default {
  title: 'Mxa::AsyncButton',
  argTypes: {
    children: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`<Mxa::AsyncButton @buttonType={{this.buttonType}} @onClick={{this.onClick}}>{{this.children}}</Mxa::AsyncButton>`,
  context: args,
});

function waitFor(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  buttonType: 'primary',
  onClick: action(function (value) {
    return waitFor(500);
  }),
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  buttonType: 'secondary',
  onClick: action(function () {
    return waitFor(1000);
  }),
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Button',
  buttonType: 'tertiary',
  onClick: action(function () {
    return waitFor(4000);
  }),
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Button',
  buttonType: 'danger',
  onClick: action(function () {
    return waitFor(8000);
  }),
};
