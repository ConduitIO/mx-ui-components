import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Label',
};

export const DefaultLabel = () => hbs`<Mxa::Label>Label</Mxa::Label>`;

export const RequiredLabel = () => hbs`<Mxa::Label @isRequired={{true}}>This is required</Mxa::Label>`;
