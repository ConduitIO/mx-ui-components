import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::SearchInput',
};

const Template = (args) => ({
  template: hbs`<Mxa::SearchInput />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  name: 'Mxa::SearchInput',
};
