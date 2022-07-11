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
      <:body>{{this.message}}</:body>
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
  message: 'This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.',
};

export const Error = Template.bind({});
Error.args = {
  toastType: 'error',
  message: 'This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.',
};

export const Info = Template.bind({});
Info.args = {
  toastType: 'info',
  message: 'This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.',
};

export const Warning = Template.bind({});
Warning.args = {
  toastType: 'warning',
  message: 'This is a toast. Mmm toast. It is not a buttered toast, it is just a toast.',
};

export const LongText = Template.bind({});
LongText.args = {
  toastType: 'success',
  message: 'MMMMMMMMHHHhHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHMMMMMMMMMMMMmmmmmmmmmmmmmmmmmmmmmm.',
};
