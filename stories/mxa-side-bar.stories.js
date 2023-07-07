import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::SideBar',
};

const Template = (args) => ({
  template: hbs`<Mxa::SideBar @isDark={{this.isDark}}>
      <Mxa::SideBar::Item
        @route="application"
      >
      <div class="rounded w-10 h-10 overflow-hidden">
        <img src="/brand-logo-example.svg" alt="Brand Example" />
      </div>
      </Mxa::SideBar::Item>

      <Mxa::SideBar::Item
        @route="index"
        @query={{hash onboardingStep=null}}
        @isDark={{this.isDark}}
      >
        <Mxa::Icon @iconName="pipelines-16" />
        Pipelines
      </Mxa::SideBar::Item>
      <Mxa::SideBar::Item
        @route="index"
        @query={{hash onboardingStep=null}}
        @isDark={{this.isDark}}
      >
        <Mxa::Icon @iconName="connectors-16" />
        Resources
      </Mxa::SideBar::Item>

      <div class="flex-auto"></div>

      <Mxa::SideBar::Item
        @route="index"
        @query={{hash onboardingStep=null}}
        @isDark={{this.isDark}}
        @label="settings"
      >
        <Mxa::Icon @iconName="settings-16" @noStroke={{true}} />
      </Mxa::SideBar::Item>
    </Mxa::SideBar>`,
  context: args,
});

const LabellessTemplate = (args) => ({
  template: hbs`<Mxa::SideBar @isDark={{this.isDark}}>
      <Mxa::SideBar::Item
        @route="application"
        @isHome={{true}}
      >
      <div class="rounded w-10 h-10 overflow-hidden">
        <img src="/brand-logo-example.svg" alt="Brand Example" />
      </div>
      </Mxa::SideBar::Item>

      <Mxa::SideBar::Item
        @route="index"
        @label="Pipelines"
      >
        <Mxa::Icon @iconName="pipelines-16" />
      </Mxa::SideBar::Item>
      <Mxa::SideBar::Item
        @route="index"
        @label="Connectors"
      >
        <Mxa::Icon @iconName="connectors-16" />
      </Mxa::SideBar::Item>

      <div class="flex-auto"></div>

      <Mxa::SideBar::Item
        @route="index"
        @label="settings"
      >
        <Mxa::Icon @iconName="settings-16" @noStroke={{true}} />
      </Mxa::SideBar::Item>
    </Mxa::SideBar>`,
  context: args,
});

export const Default = Template.bind({});
Default.parameters = {
  layout: 'fullscreen',
};

export const Dark = Template.bind({});
Dark.args = {
  isDark: true,
};

Dark.parameters = {
  layout: 'fullscreen',
};

export const WithoutLabel = LabellessTemplate.bind({});

WithoutLabel.parameters = {
  layout: 'fullscreen',
};
