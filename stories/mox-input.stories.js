import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox::Input',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  inputAction: () => {},
};

const Template = (args) => ({
  template: hbs`
  <Mox::Input class="mb-2" @value={{this.value}} @onInput={{this.inputAction}} @placeholder={{this.placeholder}} @label={{this.label}} disabled={{this.isDisabled}} @isRequired={{this.isRequired}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  value: 'Sun',
  placeholder: 'Name',
  label: 'Name',
  inputAction: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Rain',
  isDisabled: true,
  label: 'Name',
  inputAction: () => {},
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  value: '',
  placeholder: 'Your Name',
  label: 'Name',
  inputAction: () => {},
};

export const Required = Template.bind({});
Required.args = {
  value: 'Neptune',
  placeholder: 'Your Name',
  label: 'Name',
  isRequired: true,
  inputAction: () => {},
};
