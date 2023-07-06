import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::LinkButton',
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Mox::LinkButton @route={{this.route}} @externalUrl={{this.url}} @model={{this.model}} class={{this.activeClass}}>
      {{this.text}}
    </Mox::LinkButton>`,
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

export const ActiveLink = Template.bind({});
ActiveLink.args = {
  route: 'application',
  model: 3,
  url: null,
  isButton: false,
  text: 'Active Link',
  activeClass: 'active',
};

export const LinkToExternalPage= Template.bind({});
LinkToExternalPage.args = {
  route: null,
  model: null,
  url: 'https://github.com/ConduitIO/mx-ui-components',
  isButton: false,
  text: 'External Link',
};

