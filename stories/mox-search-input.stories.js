import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::SearchInput',
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#111827',
        },
        {
          name: 'Sky',
          value: '#06B6D4',
        },
      ],
    },
  },
  inputAction: () => {},
};

const Template = (args) => ({
  template: hbs`
  <div class="dark"><Mox::SearchInput class="mb-2" @onInput={{this.inputAction}} @value={{this.value}} /></div>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  inputAction: () => {},
};

export const WithValue = Template.bind({});
WithValue.args = {
  inputAction: () => {},
  value: 'Luna',
};
