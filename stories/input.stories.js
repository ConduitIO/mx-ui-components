import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Input',
};

export const Default = () => hbs`<Mxa::Input class="mb-2" disabled={{false}}/>`;

export const Disabled = () => hbs`<Mxa::Input class="mb-2" disabled={{true}}/>`;

export const Placeholder = () => hbs`<Mxa::Input class="mb-2" @placeholder="Your Name" />`;
