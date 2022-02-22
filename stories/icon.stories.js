import { hbs } from 'ember-cli-htmlbars';

let colorOptions = ['text-white', 'text-slate-100', 'text-orange-700', 'text-cyan-500'];

export default {
  title: 'Mxa::Icon',
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorOptions,
      },
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <div class="{{this.color}} flex flex-col space-y-4">
      <Mxa::Icon @iconName="connectors-16" @size={{this.size}} />
      <Mxa::Icon @iconName="pipelines-16" @size={{this.size}} />
      <Mxa::Icon @iconName="settings-16" @noStroke={{true}} @size={{this.size}} />
      <Mxa::Icon @iconName="search-16" @noStroke={{true}} @size={{this.size}} />
    </div>`,
  context: args,
});

export const Default = Template.bind({});
export const Large = Template.bind({});

Default.args = {
  allOptions: colorOptions,
  color: 'text-slate-100',
};

Large.args = {
  allOptions: colorOptions,
  color: 'text-slate-100',
  size: 'large',
};
