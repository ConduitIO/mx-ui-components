import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::TextArea',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`<Mox::TextArea class="mb-2"
    @value={{this.value}} @onInput={{this.inputAction}}
    @placeholder={{this.placeholder}} @label={{this.label}}
    disabled={{this.isDisabled}} @isRequired={{this.isRequired}}
    @isValid={{this.isValid}} @error={{this.error}} />`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  value: 'Moon',
  placeholder: 'Name',
  label: 'Name',
  inputAction: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Sun',
  isDisabled: true,
  label: 'Name',
  inputAction: () => {},
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  value: '',
  placeholder: 'Name',
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

export const Errors = Template.bind({});
Errors.args = {
  value: '',
  placeholder: 'e.g. Saturn',
  label: 'Planet Name',
  isRequired: true,
  isValid: false,
  error: 'You forgot to specify a planet',
  inputAction: () => {},
};
