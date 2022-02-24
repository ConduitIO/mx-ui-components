import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mxa/Mxa::ModalDialog',
};

const actionsData = {
  submit: action('destroyConnector'),
  hideModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <Mxa::ModalDialog @onDismiss={{this.hideModal}} @title={{this.title}} @isWide={{this.isWide}}>
    <p class="text-sm">Check them out in your team inbox!</p>
    <div class="mt-6">
      <Mxa::Button @buttonType="secondary" {{on "click" this.hideModal}}>Cancel</Mxa::Button>
      <Mxa::Button @buttonType="primary" {{on "click" this.submit}}>Go to my inbox</Mxa::Button>
    </div>
  </Mxa::ModalDialog>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'You got 2 new messages',
  ...actionsData,
};

export const Wide = Template.bind({});
Wide.args = {
  title: 'You got 2 new messages',
  isWide: true,
  ...actionsData,
};
