import { hbs } from 'ember-cli-htmlbars';

let sizeOptions = [
  'all',
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
];

export default {
  title: 'Fonts',
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: sizeOptions,
      },
    },
  },
};

const Template = (args) => ({
  template: hbs`
  {{#if (eq this.size "all")}}
    {{#each this.allOptions as |size|}}
      {{#unless (eq size "all")}}
      <div class="mt-8">
        <p class="text-sm text-right text-purple-600">{{concat ".text-" size}}</p>
        <p class={{concat "text-" size}}>Build enterprise grade data pipelines in minutes not months</p>
      </div>
      {{/unless}}
    {{/each}}
  {{else}}
    <div class="mt-8">
      <p class="text-sm text-right text-purple-600">{{concat ".text-" this.size}}</p>
      <p class={{concat "text-" this.size}}>Build enterprise grade data pipelines in minutes not months</p>
    </div>
  {{/if}}
  `,
  context: args,
});

export const FontSizes = Template.bind({});
FontSizes.args = {
  size: 'sm',
  allOptions: sizeOptions,
};
