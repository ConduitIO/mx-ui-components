import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::FormField',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <div class={{this.containerClass}}>
    <Mox::FormField @id="form-field-example">
      <:icon>
        <Mox::Icon @iconName="connectors-16" class="text-white" />
      </:icon>
      <:title>
        Encrypt connecting with SSL/TLS
      </:title>
      <:description>
        We recommend encrypting connections to your Resources.
      </:description>
      <:controls>
        <Mox::Toggle
          @id="form-field-example"
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
};
ToggleFormFieldFullWidth.parameters = {
  layout: 'fullscreen',
};

export const ToggleFormFieldInContainer = Template.bind({});
ToggleFormFieldInContainer.args = {
  toggleAction: () => {},
  containerClass: 'w-container',
};
