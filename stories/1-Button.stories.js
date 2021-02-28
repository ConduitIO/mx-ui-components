import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Button',
  argTypes: {
    children: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`<Mxa::Button @buttonType='secondary'>Cancel</Mxa::Button>`,
  context: args,
});

export const Text = Template.bind({});
Text.args = {
  children: 'Button',
};
