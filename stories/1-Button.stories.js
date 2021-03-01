import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Button',
  argTypes: {
    children: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`<Mxa::Button @buttonType={{this.buttonType}}>{{this.children}}</Mxa::Button>`,
  context: args,
});

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
  buttonType: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  buttonType: 'secondary',
};
