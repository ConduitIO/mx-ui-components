import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Mox Light/Mox::Modal',
  parameters: {
    backgrounds: {
      default: 'Mute',
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

const actionsData = {
  submit: action('destroyConnector'),
  hideModal: action('hideDeleteConnectorModal'),
};

const Template = (args) => ({
  template: hbs`
  <Mox::Modal @onDismiss={{this.hideModal}}>
    <:content as |content|>
      <p class="text-sm">Check them out in your team inbox!</p>
      <div class="mt-6">
        <content.secondaryAction>Cancel</content.secondaryAction>
        <content.primaryAction @onClick={{this.submit}}>Go to my inbox</content.primaryAction>
      </div>
    </:content>
  </Mox::Modal>`,
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
