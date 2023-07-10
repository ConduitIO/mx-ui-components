import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::Button',
  argTypes: {
    children: { control: 'text' },
    buttonType: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'White',
      values: [
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Mute',
          value: '#FBFBFB',
        },
      ],
    },
  },
};

const Template = (args) => ({
  template: hbs`<Mox::Button @buttonType={{this.buttonType}} @small={{this.small}} disabled={{this.isDisabled}}>{{this.children}}</Mox::Button>`,
  context: args,
  parameters: {
    background: 'Dark',
  },
});

const SmallTemplate = (args) => ({
  template: hbs`
    <div class="flex flex-col space-y-4 box-border">
      <Mox::Button @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mox::Button>
      <Mox::Button @buttonType="secondary" @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mox::Button>
      <Mox::Button @buttonType="danger" @small={{true}} disabled={{this.isDisabled}}>{{this.children}}</Mox::Button>
      <Mox::Button @buttonType="primary" @small={{true}} disabled>{{this.children}}</Mox::Button>
    </div>
  `,
  context: args,
});

export const Primary = Template.bind({});
Primary.args = {
  children: 'Create application',
  buttonType: null,
  small: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  buttonType: 'secondary',
  small: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Button',
  buttonType: 'primary',
  isDisabled: true,
  small: false,
};

export const Danger = Template.bind({});
Danger.args = {
  children: 'Button',
  buttonType: 'danger',
  small: false,
};

export const Small = SmallTemplate.bind({});
Small.args = {
  children: 'Small Button',
};
