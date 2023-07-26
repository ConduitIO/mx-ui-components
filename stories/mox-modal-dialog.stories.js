import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mox Dark/Mox::ModalDialog',
};

const actionsData = {
  submit: action('destroyConnector'),
  hideModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <div class="dark">
    <Mox::ModalDialog @onDismiss={{this.hideModal}}>
      <:title>
        {{this.title}}
      </:title>
      <:body>
        <p class="text-sm">Check them out in your team inbox!</p>
      </:body>
      <:footer as |footer|>
        <footer.secondaryAction>Cancel</footer.secondaryAction>
        <footer.primaryAction @onClick={{this.submit}}>Go to my inbox</footer.primaryAction>
      </:footer>
    </Mox::ModalDialog>
  </div>
  `,
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
