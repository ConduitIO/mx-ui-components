import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Card',
};

export const Default = () => hbs`<Mxa::Card>
<div class="font-medium mb-6">Uptime</div>
<div class="font-normal text-3xl">30m</div>
</Mxa::Card>`;
