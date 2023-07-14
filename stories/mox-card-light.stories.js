import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::Card',
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    idd: { control: 'text' },
    icon: { control: 'text' },
    logo: { control: 'text' },
    logoAlt: { control: 'text' },
    buttonType: { control: 'text' },
  },
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
  template: hbs`
  <div class="flex flex-col space-y-4 box-border w-container">
    <Mox::Card>
      <:title>
        {{this.title}}
      </:title>
      <:subtitle>
        {{this.subtitle}}
      </:subtitle>
    </Mox::Card>
  </div>`,
  context: args,
  parameters: {
    background: 'Mute',
  },
});

const IconTemplate = (args) => ({
  template: hbs`
    <div class="flex flex-col space-y-4 box-border w-container">
      <Mox::Card>
        <:icon>
          <Mox::Icon @iconName={{this.icon}} />
        </:icon>
        <:title>
          <span>{{this.title}}</span>
        </:title>
        <:subtitle>
          {{this.subtitle}}
        </:subtitle>
        <:details>
          {{this.details}}
        </:details>
        <:menu>
          <button type="button">
            <Mox::Icon @iconName="action-menu-16" />
          </button>
        </:menu>
      </Mox::Card>
    </div>
  `,
  context: args,
});

const LogoTemplate = (args) => ({
  template: hbs`
    <div class="flex flex-col space-y-4 box-border w-container">
      <Mox::Card>
        <:icon>
          <img src={{this.logo}} alt={{this.logoAlt}} class="h-6 w-6" />
        </:icon>
        <:title>
          {{this.title}}
        </:title>
        <:subtitle>
          {{this.subtitle}}
        </:subtitle>
        <:menu>
          <button type="button">
            <Mox::Icon @iconName="action-menu-16" />
          </button>
        </:menu>
      </Mox::Card>
    </div>
  `,
  context: args,
});

export const WithIcon = IconTemplate.bind({});
WithIcon.args = {
  title: 'ecom-search-update',
  subtitle: 'Running on production',
  idd: 'ecom',
  icon: 'connectors-16',
  logo: null,
  buttonType: null,
  small: false,
  details: 'Last deployed from main 1 week ago by anonymous',
};

export const WithLogo = LogoTemplate.bind({});
WithLogo.args = {
  title:
    'ecom-search-update-but-with-a-veryveryveryveryveryveryextremely-elaborate-text',
  subtitle: 'JavaScript · Turbine Application · Deployed to Common · Feb 23',
  idd: 'ecom',
  icon: null,
  logo: '/brand-logo-example.svg',
  logoAlt: 'Meroxa',
  buttonType: null,
  small: false,
};

export const NoLogoNoMenu = Template.bind({});
NoLogoNoMenu.args = {
  title: 'ecom-search-update',
  subtitle: 'JavaScript · Turbine Application · Deployed to Common · Feb 23',
  idd: 'ecom',
  icon: null,
  logo: null,
  buttonType: null,
  small: false,
};
