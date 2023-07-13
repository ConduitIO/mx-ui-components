import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Light/Mox::Label',
  parameters: {
    backgrounds: {
      default: 'Mute',
      values: [
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Mute',
          value: '#FBFBFB',
        },
      ],
    },
  },
};

export const DefaultLabel = () => hbs`
  <Mox::Label>Label</Mox::Label>
`;

export const RequiredLabel = () => hbs`
  <Mox::Label @isRequired={{true}}>This is required</Mox::Label>
`;
