import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mox Dark/Mox::ConfirmModal',
};

const actionsData = {
  destroyConnector: action('destroyConnector'),
  hideDeleteConnectorModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <Mox::ConfirmModal
    @onDismiss={{this.hideDeleteConnectorModal}}
    @confirmableActionName={{this.confirmActionName}}
    @entityName={{this.selectedNode.name}}
    @confirmedAction={{fn this.destroyConnector this.selectedNode}}
    @isTextInputRequired={{this.isInputTextRequired}}
  >
    {{this.modalText}}
  </Mox::ConfirmModal>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  isInputTextRequired: true,
  confirmActionName: 'Delete',
  modalText:
    "Deleting a connector cannot be undone. Please input your connector's name below to confirm you would like to delete this connector",
  selectedNode: {
    name: 'foo',
  },
  ...actionsData,
};

export const SoftConfirm = Template.bind({});
SoftConfirm.args = {
  isInputTextRequired: false,
  confirmActionName: 'Update',
  modalText: 'Do you really want to update this?',
  selectedNode: {
    name: 'bar',
  },
  ...actionsData,
};
