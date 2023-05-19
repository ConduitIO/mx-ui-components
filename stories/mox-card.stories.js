import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::Card',
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
      default: 'Dark',
      values: [
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Mute',
          value: '#FBFBFB',
        },
        {
          name: 'Dark',
          value: '#111827',
        },
        {
          name: 'Sky',
          value: '#06B6D4',
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
    background: 'Dark',
  },
});

const IconTemplate = (args) => ({
  template: hbs`
    <div class="flex flex-col space-y-4 box-border w-container">
      <Mox::Card>
        <:icon>
          <Mox::Icon @iconName={{this.icon}} class="text-white" />
        </:icon>
        <:title>
          <span>{{this.title}}</span>
          <Mox::Badge @status="healthy">Running</Mox::Badge>
        </:title>
        <:subtitle>
          {{this.subtitle}}
        </:subtitle>
        <:menu>
          <button type="button">
            <Mox::Icon @iconName="action-menu-16" class="text-white" />
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
            <Mox::Icon @iconName="action-menu-16" class="text-white" />
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
  subtitle: 'JavaScript · Turbine Application · Deployed to Common · Feb 23',
  idd: 'ecom',
  icon: 'connectors-16',
  logo: null,
  buttonType: null,
  small: false,
};

export const WithLogo = LogoTemplate.bind({});
WithLogo.args = {
  title: 'ecom-search-update-but-with-a-veryveryveryveryveryvery-elaborate-text',
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
