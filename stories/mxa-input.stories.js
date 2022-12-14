import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::Input',
};

export const Default = () =>
  hbs`<Mxa::Input class="mb-2" disabled={{false}} @value="Sun" />`;

export const Disabled = () =>
  hbs`<Mxa::Input class="mb-2" disabled={{true}} @value="Rain" />`;

export const Placeholder = () =>
  hbs`<Mxa::Input class="mb-2" @placeholder="Your Name" />`;
