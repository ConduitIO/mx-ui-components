import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox::Input',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export const Default = () =>
  hbs`<Mox::Input class="mb-2" disabled={{false}} @value="Sun" />`;

export const Disabled = () =>
  hbs`<Mox::Input class="mb-2" disabled={{true}} @value="Rain" />`;

export const Placeholder = () =>
  hbs`<Mox::Input class="mb-2" @placeholder="Your Name" />`;
