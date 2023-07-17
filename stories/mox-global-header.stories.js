import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::GlobalHeader',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = () => ({
  template: hbs`
  <div class="w-container">
	<Mox::GlobalHeader>
    <:global-links>
      <Mox::Tabs>
        <Mox::Tabs::Item class="text-base" @route="/">Applications</Mox::Tabs::Item>
        <Mox::Tabs::Item class="text-base" @route="">Resources</Mox::Tabs::Item>
      </Mox::Tabs>
    </:global-links>
    <:env-switcher>
      <button type="button" class="text-left text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500 focus:outline-none px-4" >
        <div class="uppercase text-xs" >Don Data</div>
        <div class="font-bold flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
        Common
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        </div>
      </button>
    </:env-switcher>
    <:user-menu>
      <img
        class="h-8 w-8 rounded-full"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
        alt="user-avatar"
      />
    </:user-menu>
  </Mox::GlobalHeader></div>`,
});

export const Default = Template.bind({});
