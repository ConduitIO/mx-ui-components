import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::Button',
  argTypes: {
    children: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`<Mxa::Button @buttonType={{this.buttonType}} @noFill={{this.noFill}} @small={{this.small}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>`,
  context: args,
});

const SmallTemplate = (args) => ({
  template: hbs`
    <Mxa::Button @buttonType="primary"  @noFill={{this.noFill}} @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>
    <Mxa::Button @buttonType="secondary" @noFill={{this.noFill}} @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>
    <Mxa::Button @buttonType="tertiary"  @noFill={{this.noFill}} @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>
    <Mxa::Button @buttonType="danger" @noFill={{this.noFill}} @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>
    <Mxa::Button @buttonType="danger" @noFill={{true}} @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mxa::Button>
    <Mxa::Button @buttonType="primary"  @noFill={{this.noFill}} @small={{true}} disabled>{{this.children}}</Mxa::Button>
  `,
  context: args,
});

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  buttonType: 'primary',
  small: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  buttonType: 'secondary',
  small: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Button',
  buttonType: 'tertiary',
  small: false,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Button',
  buttonType: 'danger',
  small: false,
};

export const DangerNoFill = Template.bind({});
DangerNoFill.args = {
  children: 'Button',
  buttonType: 'danger',
  noFill: true,
  small: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Button',
  buttonType: 'primary',
  isDisabled: true,
  small: false,
};

export const Small = SmallTemplate.bind({});
Small.args = {
  children: 'Small Button',
};
