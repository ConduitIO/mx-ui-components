import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::SearchInput',
  parameters: {
    backgrounds: {
      default: 'Mute',
      values: [
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Mute',
          value: '#F3F4F6',
        },
      ],
    },
  },
  inputAction: () => {},
};

const Template = (args) => ({
  template: hbs`
  <Mox::SearchInput class="mb-2" @onInput={{this.inputAction}} @value={{this.value}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  inputAction: () => {},
};

export const WithValue = Template.bind({});
WithValue.args = {
  inputAction: () => {},
  value: 'Artemis',
};
