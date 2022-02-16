import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::Badge',
};

export const Badges = () => hbs`
<div class="mb-2">
	<h3 class='text-base font-semibold'>Default</h3>
	<Mxa::Badge>Foobar</Mxa::Badge>
</div>
<div>

<h3 class='text-base font-semibold'>Badge Examples</h3>
	<div class="space-x-2">
		<Mxa::Badge @color="bg-saffron-100">Error</Mxa::Badge> <Mxa::Badge @color="bg-teal-600">Healthy</Mxa::Badge> <Mxa::Badge @color="bg-slate-100">Pending</Mxa::Badge> <Mxa::Badge @color="bg-slate-20">Paused</Mxa::Badge>
	</div>
</div>
`;
