import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::NotificationCard',
};

const TemplateDefault= (args) => ({
  template: hbs`
    <Mxa::NotificationCard @isError={{this.isError}} @onDismiss={{this.dismissAction}} @message={{this.message}} />`,
  context: args,
});

const TemplateError = (args) => ({
  template: hbs`
    <Mxa::NotificationCard @error={{this.error}} @onDismiss={{this.dismissAction}} />`,
  context: args,
});

export const Default = TemplateDefault.bind({});
Default.args = {
  dismissAction: () => {},
  isError: false,
  message: 'Rimmy Silks Pipeline successfully created',
  error: null,
};

export const Error = TemplateError.bind({});
Error.args = {
  dismissAction: () => {},
  error: {
    message: 'Something went wrong',
    details: ['error 1', 'error 2', 'another error'],
  }
};

export const SimpleError = TemplateDefault.bind({});
SimpleError.args = {
  dismissAction: () => {},
  message: 'Something went wrong',
  isError: true,
};
