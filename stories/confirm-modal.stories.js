import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mxa::ConfirmModal',
};

export const actionsData = {
  destroyConnector: action('destroyConnector'),
  hideDeleteConnectorModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <Mxa::ConfirmModal
  @onDismiss={{this.hideDeleteConnectorModal}}
  @confirmableActionName='Delete'
  @entityName={{this.selectedNode.name}}
  @entityType='Connector'
  @confirmedAction={{fn this.destroyConnector this.selectedNode}}
  @isTextInputRequired={{true}}
  as
  |entityName|
  >
  Deleting a connector cannot be undone. Please input your connector's name <code>({{entityName}})</code> below to confirm you would like to delete this connector
  </Mxa::ConfirmModal>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  isInputTextRequired: true,
  selectedNode: {
    name: 'foo',
  },
  ...actionsData,
};
