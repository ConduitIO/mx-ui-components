import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Toggle',
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
};

const Template = (args) => ({
  template: hbs`
    <div class="dark">
      <label class="text-gray-300" for={{this.id}}>{{this.externalLabel}}</label>
      <Mox::Toggle
        @toggleAction={{this.toggleAction}}
        @id={{this.id}}
        @label={{this.label}}
      />
  </div>`,
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
