import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::CodeBlock',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`<Mox::CodeBlock @value={{this.value}}/>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  value: 'sleeptoken deploy',
};
