import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::Toggle',
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
};

const Template = (args) => ({
  template: hbs`
    <label class="text-gray-700" for={{this.id}}>{{this.externalLabel}}</label>
    <Mox::Toggle
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
