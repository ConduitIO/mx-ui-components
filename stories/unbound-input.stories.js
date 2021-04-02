import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::UnboundInput',
};

const Template = (args) => ({
  template: hbs`<Mxa::UnboundInput
    class="mb-2" @onInput={{this.inputAction}}
    @isValid={{this.isValid}}
    @label={{this.label}}
    @id={{this.id}}
    @isRequired={{this.isRequired}}
  />`,
  context: args,
});

export const ValidUnbound = Template.bind({});
ValidUnbound.args = {
  inputAction: () => {},
  isValid: true,
};

export const InvalidUnbound = Template.bind({});
InvalidUnbound.args = {
  inputAction: () => {},
  isValid: false,
};

export const LabeledUnbound = Template.bind({});
LabeledUnbound.args = {
  inputAction: () => {},
  isValid: false,
  label: 'Your name',
  id: 'unique-name-field',
  isRequired: true,
};
