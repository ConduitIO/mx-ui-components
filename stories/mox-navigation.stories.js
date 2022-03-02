import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::Navigation',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = () => ({
  template: hbs`
  <Mox::Navigation>
	<Mox::NavigationItem @label="Apps" @route="index" @count="0" @isActive={{true}} />
	<Mox::NavigationItem @label="Resources" @route="index" @count="4" @isActive={{false}} />
  </Mox::Navigation>`,
});

export const Default = Template.bind({});
