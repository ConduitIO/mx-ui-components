import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::Toast',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Mox::Toast @toastType={{this.toastType}}>
      <:body>This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.</:body>
      <:controls as |controls|>
        <controls.dismissAction>
          Dismiss
        </controls.dismissAction>
      </:controls>
    </Mox::Toast>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {};

export const Success = Template.bind({});
Success.args = {
  toastType: 'success',
};

export const Error = Template.bind({});
Error.args = {
  toastType: 'error',
};

export const Info = Template.bind({});
Info.args = {
  toastType: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  toastType: 'warning',
};
