import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import { action as sbAction } from '@storybook/addon-actions';

const connectorTypes = [
  { name: 'source', value: 'source' },
  { name: 'sink', value: 'sink' },
];

const connectorTypesCustom = [
  { name: 'My environment', value: 'my-environment', type: 'Self-Hosted' },
  { name: 'Meroxa environment', value: 'meroxa-environment', type: 'Private' },
  { name: 'Common', value: 'common', type: 'Common' },
];

const connectorTypesDisabled = [
  { name: 'My environment', value: 'my-environment', isDisabled: false },
  { name: 'Meroxa environment', value: 'meroxa-environment', isDisabled: true },
  { name: 'Common', value: 'common', isDisabled: false },
];

const resourceTypes = [
  { name: 'Postgres', value: 'postgres' },
  { name: 'MongoDB', value: 'mongodb' },
];

export default {
  title: 'Mxa::Select',
  argTypes: {
    options: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mxa::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}}
      @isDisabled={{this.isDisabled}}
    />
  </div>
`,
  context: args,
});

const CustomOptionsTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mxa::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}} as |setSelectedOption|>

      {{#each this.connectorTypes as |connector|}}
        <Mxa::Select::Option
          @option={{connector}}
          @selectedOption={{this.selectedConnectorType}}
          @setSelectedOption={{setSelectedOption}}
          @optionNameKey="name"
          @optionValueKey="value"
          @optionCategoryKey={{this.categoryKey}} />
      {{/each}}
    </Mxa::Select>
  </div>
`,
  context: args,
});

const CustomOptionsBlockTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mxa::Select
      @label='Type'
      @options={{this.resourceTypes}}
      @selectedOption={{this.selectedResourceType}}
      @onChange={{this.setResourceType}} as |setSelectedOption|>

      {{#each this.resourceTypes as |resource|}}
        <Mxa::Select::Option
          @option={{resource}}
          @selectedOption={{this.selectedResourceType}}
          @setSelectedOption={{setSelectedOption}}
          @optionNameKey="name"
          @optionValueKey="value">
            <img
              src="/{{resource.value}}.svg"
              alt=""
              role="none"
              class="flex-shrink-0 h-6 w-6"
            />
        </Mxa::Select::Option>
      {{/each}}
    </Mxa::Select>
  </div>
`,
  context: args,
});

const DisabledOptionsTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mxa::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}} as |setSelectedOption|>
      {{#each this.connectorTypes as |connector|}}
        <Mxa::Select::Option
          @option={{connector}}
          @selectedOption={{this.selectedConnectorType}}
          @setSelectedOption={{setSelectedOption}}
          @optionNameKey="name"
          @optionValueKey="value"
          @isDisabled={{connector.isDisabled}} />
      {{/each}}
    </Mxa::Select>
  </div>
`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  connectorTypes: connectorTypes,
  selectedConnectorType: connectorTypes[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: null,
};

export const Short = Template.bind({});
Short.args = {
  connectorTypes: connectorTypes,
  selectedConnectorType: connectorTypes[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: 'w-20',
};

export const Disabled = Template.bind({});
Disabled.args = {
  connectorTypes: connectorTypes,
  selectedConnectorType: connectorTypes[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: null,
  isDisabled: true,
};

export const CustomOptions = CustomOptionsTemplate.bind({});
CustomOptions.args = {
  connectorTypes: connectorTypesCustom,
  selectedConnectorType: connectorTypesCustom[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: 'w-48',
  categoryKey: 'type',
};

export const IconOptions = CustomOptionsBlockTemplate.bind({});
IconOptions.args = {
  resourceTypes: resourceTypes,
  selectedResourceType: resourceTypes[0],
  isEditing: false,
  setResourceType: action(function (value) {
    this.set('selectedResourceType', value);
  }),
  wrapperClass: 'w-48',
};

export const DisabledOptions = DisabledOptionsTemplate.bind({});
DisabledOptions.args = {
  connectorTypes: connectorTypesDisabled,
  selectedConnectorType: connectorTypesDisabled[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: 'w-48',
};
