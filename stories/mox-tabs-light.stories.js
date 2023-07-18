import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::Tabs',
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

const Template = (args) => ({
  template: hbs`<Mox::Tabs>
    <Mox::Tabs::Item @isActive={{this.isActive}}>Item One</Mox::Tabs::Item>
    <Mox::Tabs::Item class={{this.linkClass}}>Item Two</Mox::Tabs::Item>
  </Mox::Tabs>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  isActive: false,
  linkClass: null,
  route: 'application',
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  linkClass: null,
  route: 'application',
};

export const ActiveClass = Template.bind({});
ActiveClass.args = {
  isActive: false,
  linkClass: 'active',
  route: 'application',
};
