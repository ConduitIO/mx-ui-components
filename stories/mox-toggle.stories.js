import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Toggle',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <label class="text-gray-300" for={{this.id}}>{{this.externalLabel}}</label>
    <Mox::Toggle
      class="mb-2"
      @toggleAction={{this.toggleAction}}
      @id={{this.id}}
      @label={{this.label}}
  />`,
  context: args,
});

export const Toggle = Template.bind({});
Toggle.args = {
  toggleAction: () => {},
  label: 'Your name',
  id: null,
  externalLabel: null,
};

export const ToggleWithExternalLabel = Template.bind({});
ToggleWithExternalLabel.args = {
  toggleAction: () => {},
  label: null,
  id: 'my-toggle-id-1',
  externalLabel: 'External Toggle Label',
};
