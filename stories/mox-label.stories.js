import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Label',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export const DefaultLabel = () => hbs`
<div class="dark">
  <Mox::Label>Label</Mox::Label>
</div>`;

export const RequiredLabel = () => hbs`
<div class="dark">
  <Mox::Label @isRequired={{true}}>This is required</Mox::Label>
</div>`;
