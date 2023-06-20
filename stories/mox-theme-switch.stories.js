import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::ThemeSwitch',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Mox::ThemeSwitch @isChecked={{this.isChecked}}>
      <:light-icon>
        <Mox::Icon @iconName="sun" @size="small" />
      </:light-icon>
      <:dark-icon>
        <Mox::Icon @iconName="moon" @size="small" />
      </:dark-icon>
    </Mox::ThemeSwitch>`,
  context: args,
});

export const DefaultTheme = Template.bind({});
DefaultTheme.args = {
  message: '',
  isChecked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  message: '',
  isChecked: true,
};
