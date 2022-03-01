import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::SearchInput',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  inputAction: () => {},
};

const Template = (args) => ({
  template: hbs`
  <Mox::SearchInput class="mb-2" @onInput={{this.inputAction}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  inputAction: () => {},
};
