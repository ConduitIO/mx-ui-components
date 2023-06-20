import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Input',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  inputAction: () => {},
};

const Template = (args) => ({
  template: hbs`
  <Mox::Input
    @value={{this.value}} @onInput={{this.inputAction}}
    @placeholder={{this.placeholder}} @label={{this.label}}
    disabled={{this.isDisabled}} @isRequired={{this.isRequired}}
    @isValid={{this.isValid}} @error={{this.error}} />`,
  context: args,
});

const TemplateStackedFormFields = (args) => ({
  template: hbs`
  <div class="flex flex-col">
    <Mox::Input
      @value={{this.value}} @onInput={{this.inputAction}}
      @placeholder={{this.placeholder}} @label={{this.label}}
      disabled={{this.isDisabled}} @isRequired={{this.isRequired}}
      @isValid={{this.isValid}} @error={{this.error}} />
    <Mox::Input
      @value={{this.secondValue}} @onInput={{this.inputAction}}
      @placeholder={{this.placeholder}} @label={{this.secondLabel}}
      disabled={{this.isDisabled}} @isRequired={{this.isRequired}}
      @isValid={{this.isValid}} @error={{this.secondError}} />
  </div>`,
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

export const Errors = Template.bind({});
Errors.args = {
  value: '',
  placeholder: 'Your Name',
  label: 'Name',
  isRequired: true,
  isValid: false,
  error: 'You forgot to specify a planet',
  inputAction: () => {},
};

export const Stacked = TemplateStackedFormFields.bind({});
Stacked.args = {
  value: 'Mercury',
  secondValue: 'Moon',
  placeholder: 'Your Name',
  label: 'Planet',
  secondLabel: 'Other',
  isRequired: true,
  isValid: false,
  error: 'You forgot to specify a planet',
  secondError: 'You forgot to specify a natural satellite',
  inputAction: () => {},
};
