import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::FormField',
  parameters: {
    backgrounds: {
      default: 'White',
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
  <div class={{this.containerClass}}>
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
