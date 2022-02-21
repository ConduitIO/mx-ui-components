import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox::Badge',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

export const Badges = () => hbs`
<div class="mb-2">
	<h3 class='text-base font-semibold text-white'>Default</h3>
	<Mox::Badge>Foobar</Mox::Badge>
</div>
<div>

<h3 class='text-base font-semibold text-white'>Badge Examples</h3>
	<div class="space-x-2">
		<Mox::Badge @status="danger">Error</Mox::Badge>
    <Mox::Badge @status="healthy">Healthy</Mox::Badge>
    <Mox::Badge @status="neutral">Building</Mox::Badge>
    <Mox::Badge @status="caution">Paused</Mox::Badge>
	</div>
</div>
`;
