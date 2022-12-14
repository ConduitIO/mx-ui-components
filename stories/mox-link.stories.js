import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::Link',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Mox::Link @route={{this.route}} @externalUrl={{this.url}} @model={{this.model}} @isButton={{this.isButton}}>
    {{this.text}}
  </Mox::Link>`,
  context: args,
});

export const LinkToInternalPage = Template.bind({});
LinkToInternalPage.args = {
  route: 'application',
  model: 3,
  url: null,
  isButton: false,
  text: 'Internal Link',
};

export const LinkToExternalPage = Template.bind({});
LinkToExternalPage.args = {
  route: null,
  model: null,
  url: 'https://github.com/ConduitIO/mx-ui-components',
  isButton: false,
  text: 'External Link',
};

export const ButtonLikeLink = Template.bind({});
ButtonLikeLink.args = {
  route: 'application',
  model: 3,
  url: null,
  isButton: true,
  text: 'Button',
};
