import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Node',
  argTypes: {
    name: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`<Mxa::Node @name={{this.name}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  name: 'Mxa::Node',
};
