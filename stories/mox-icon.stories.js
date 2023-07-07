import { hbs } from 'ember-cli-htmlbars';

let colorOptions = [
  'text-white',
  'text-gray-300',
  'text-red-500',
  'text-cyan-500',
];

export default {
  title: 'Mox Dark/Mox::Icon',
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: colorOptions,
      },
    },
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <div class="{{this.color}} flex flex-col space-y-4">
      <Mox::Icon @iconName="connectors-16" @size={{this.size}} />
      <Mox::Icon @iconName="pipelines-16" @size={{this.size}} />
      <Mox::Icon @iconName="settings-16" @noStroke={{true}} @size={{this.size}} />
      <Mox::Icon @iconName="search-16" @noStroke={{true}} @size={{this.size}} />
    </div>`,
  context: args,
});

export const Default = Template.bind({});
export const Large = Template.bind({});
export const Small = Template.bind({});
export const XSmall = Template.bind({});

Default.args = {
  allOptions: colorOptions,
  color: 'text-gray-300',
};

Large.args = {
  allOptions: colorOptions,
  color: 'text-gray-300',
  size: 'large',
};

Small.args = {
  allOptions: colorOptions,
  color: 'text-gray-300',
  size: 'small',
};

XSmall.args = {
  allOptions: colorOptions,
  color: 'text-gray-300',
  size: 'x-small',
};
