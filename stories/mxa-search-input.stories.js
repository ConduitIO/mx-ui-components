import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::SearchInput',
};

const Template = (args) => ({
  template: hbs`<Mxa::SearchInput />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {};
