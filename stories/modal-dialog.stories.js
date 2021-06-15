import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mxa::ModalDialog',
};

const actionsData = {
  submit: action('destroyConnector'),
  hideModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <Mxa::ModalDialog @onDismiss={{this.hideModal}}>
    <h1>You got 2 new messages</h1>
    <p>Check them out in your team inbox!</p>
    <div class="mt-6">
      <Mxa::Button @buttonType="secondary" {{on "click" this.hideModal}}>Cancel</Mxa::Button>
      <Mxa::Button @buttonType="primary" {{on "click" this.submit}}>Go to my inbox</Mxa::Button>
    </div>
  </Mxa::ModalDialog>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  ...actionsData,
};
