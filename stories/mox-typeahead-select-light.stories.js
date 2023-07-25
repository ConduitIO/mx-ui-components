import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';

const options = [
  { name: 'Apple', value: 'apple' },
  { name: 'Banana', value: 'banana' },
  { name: 'Carrot', value: 'carrot' },
];

export default {
  title: 'Mox Light/Mox::TypeaheadSelect',
  argTypes: {
    options: { control: 'text' },
    buttonType: { control: 'text' },
  },
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
          value: '#F3F4F6',
        },
      ],
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mox::TypeaheadSelect
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}}
      @isDisabled={{this.isEditing}}
      @label={{this.label}}
      @id={{this.id}}
      @isValid={{this.isValid}}
      @error={{this.error}}
    />
  </div>
`,
  context: args,
});

const LabelledTemplate = (args) => ({
  template: hbs`
  <Mox::Label for={{this.id}}>Food</Mox::Label>
  <div class={{this.wrapperClass}}>
    <Mox::TypeaheadSelect
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}}
      @isDisabled={{this.isEditing}}
      @id={{this.id}}
    />
  </div>
`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  connectorTypes: options,
  selectedConnectorType: options[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: null,
  label: 'Fruit',
  id: 'fruit-basket',
};

export const Short = Template.bind({});
Short.args = {
  connectorTypes: options,
  selectedConnectorType: options[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: 'w-20',
  label: 'Fruit',
  id: 'fruit-basket',
};

export const ExternalLabel = LabelledTemplate.bind({});
ExternalLabel.args = {
  connectorTypes: options,
  selectedConnectorType: options[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: null,
  id: 'fruit-basket',
};

export const Disabled = Template.bind({});
Disabled.args = {
  connectorTypes: options,
  selectedConnectorType: options[0],
  isEditing: true,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  label: 'Fruit',
  id: 'fruit-basket',
};

export const Errors = Template.bind({});
Errors.args = {
  connectorTypes: options,
  selectedConnectorType: options[0],
  isEditing: true,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  label: 'Fruit',
  id: 'fruit-basket',
  isValid: false,
  error: 'No more fruit',
};
