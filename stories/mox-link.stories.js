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
  <Mox::Link @route={{this.route}} @externalUrl={{this.url}} @model={{this.model}}>
    Internal link
  </Mox::Link>`,
  context: args,
});

export const LinkToInternalPage = Template.bind({});
LinkToInternalPage.args = {
  route: 'application',
  model: 3,
  url: null,
};

export const LinkToExternalPage= Template.bind({});
LinkToExternalPage.args = {
  route: null,
  model: null,
  url: 'https://github.com/ConduitIO/mx-ui-components',
};
