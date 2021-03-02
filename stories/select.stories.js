import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

const connectorTypes = [
  { name: 'source', value: 'source' },
  { name: 'sink', value: 'sink' },
];

export default {
  title: 'Mxa::Select',
  argTypes: {
    options: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`
  <Mxa::Select
    @label='Type'
    @options={{this.connectorTypes}}
    @selectedOption={{this.selectedConnectorType}}
    @onChange={{this.setConnectorType}}
    @isDisabled={{this.isEditing}}
  />
`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  connectorTypes: connectorTypes,
  selectedConnectorType: connectorTypes[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
};
