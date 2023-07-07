import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::StatusBall',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export const Statuses = () => hbs`
<h3 class='text-base font-semibold text-white'>Status Ball Examples</h3>
<div class="flex space-x-2 justify-center">
  <Mox::StatusBall @status="healthy"/>
  <Mox::StatusBall @status="caution"/>
  <Mox::StatusBall @status="danger"/>
</div>
`;
