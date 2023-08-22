import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::FilterInput',
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#111827',
        },
        {
          name: 'Gray',
          value: '#1f2937',
        },
        {
          name: 'Sky',
          value: '#06B6D4',
        },
      ],
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <div class="dark w-full">
      <Mox::FilterInput
        @availableTags={{this.availableTags}}
        @placeholder={{this.placeholder}}
        @onSelect={{this.selectAction}}
        @theme={{this.theme}}>
        <:label>{{this.label}}</:label>
      </Mox::FilterInput>
    </div>`,
  context: args,
});

const SimpleLabelTemplate = (args) => ({
  template: hbs`
    <div class="dark">
      <Mox::FilterInput @availableTags={{this.availableTags}}
        @placeholder={{this.placeholder}}
        @onSelect={{this.selectAction}}
        @theme={{this.theme}}
        @label={{this.label}} />
    </div>`,
  context: args,
});

const tags = [{
  group: 'dystopias',
  exclusive: true,
  categories: [
    {
      category: 'dystopian-anime',
      options: [
        { name: 'akira', value: 'akira' },
        { name: 'neon genesis evangelion', value: 'nge' },
        { name: 'ghost in the shell', value: 'wamdue' },
      ]
    },
    {
      category: 'dystopian-books',
      options: [
        { name: '1984', value: '1984' },
        { name: 'brave new world', value: 'bnw' },
        { name: 'hunger games', value: 'hunger' },
      ],
    },
  ],
},
{
  group: 'utopias',
  exclusive: true,
  categories: [
    {
      category: 'utopian-anime',
      options: [
        { name: 'aria', value: 'aria' },
        { name: 'neon genesis evangelion', value: 'nge' },
        { name: 'ghost in the shell', value: 'wamdue' },
      ]
    },
    {
      category: 'utopian-books',
      options: [
        { name: 'new atlantis', value: 'new atlantis' },
      ],
    },
  ],
},
{
  group: 'keywords',
  category: 'query',
  exclusive: true,
  custom: true,
  noKey: true,
  queryValues: { query: null },
}];

export const Default = Template.bind({});
Default.args = {
  availableTags: tags,
  placeholder: 'No entry required',
  selectAction: () => {},
  label: 'Filter Me!'
};

export const Secondary = Template.bind({});
Secondary.args = {
  availableTags: tags,
  placeholder: 'an alternative theme...',
  selectAction: () => {},
  theme: 'secondary',
  label: 'Filter me (secondary)!',
};

export const HiddenLabel = SimpleLabelTemplate.bind({});
HiddenLabel.args = {
  availableTags: tags,
  placeholder: 'label can be read by screenreaders only',
  selectAction: () => {},
  label: 'hidden labelz',
  theme: 'secondary',
};
