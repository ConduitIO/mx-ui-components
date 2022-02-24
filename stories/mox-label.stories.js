import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::Label',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export const DefaultLabel = () => hbs`<Mox::Label>Label</Mox::Label>`;

export const RequiredLabel = () => hbs`<Mox::Label @isRequired={{true}}>This is required</Mox::Label>`;
