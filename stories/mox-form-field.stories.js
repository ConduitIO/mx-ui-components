import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::FormField',
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
  <div class="dark {{this.containerClass}}">
    <Mox::FormField @id="form-field-example">
      <:icon>
        <Mox::Icon @iconName="connectors-16" />
      </:icon>
      <:title>
        Encrypt connecting with SSL/TLS
      </:title>
      <:description>
        We recommend encrypting connections to your Resources.
      </:description>
      <:controls>
        <Mox::Toggle
          @id={{this.toggleId}}
          @toggleAction={{this.toggleAction}}
        />
      </:controls>
    </Mox::FormField>
  </div>
`,
  context: args,
});

export const ToggleFormFieldFullWidth = Template.bind({});
ToggleFormFieldFullWidth.args = {
  toggleAction: () => {},
  toggleId: 'form-field-example-1',
};
ToggleFormFieldFullWidth.parameters = {
  layout: 'fullscreen',
};

export const ToggleFormFieldInContainer = Template.bind({});
ToggleFormFieldInContainer.args = {
  toggleAction: () => {},
  toggleId: 'form-field-example-2',
  containerClass: 'w-container',
};
