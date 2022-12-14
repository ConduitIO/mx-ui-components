import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';

export default {
  title: 'Mox/Mox::Upload',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`<div class="w-72">
    <Mox::Upload @isActive={{this.isActive}}
      @label={{this.label}}
      @format={{this.format}}
      @isCompact={{this.isCompact}}
      @onInput={{this.inputAction}} />
    </div>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Pokemon',
  format: '.jpeg',
  isCompact: false,
  inputAction: action(function (value) {
    this.set('currentValue', value);
  }),
};

export const Compact = Template.bind({});
Compact.args = {
  label: 'Digimon',
  format: '.csv,.png',
  isCompact: true,
  inputAction: action(function (value) {
    this.set('currentValue', value);
  }),
};
