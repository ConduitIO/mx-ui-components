import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';

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
  title: 'Mox Dark/Mox::Select',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
  argTypes: {
    options: { control: 'text' },
    buttonType: { control: 'text' },
  },
};

const Template = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mox::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}}
      @isDisabled={{this.isDisabled}}
      @isValid={{this.isValid}}
      @error={{this.error}}
    />
  </div>
`,
  context: args,
});

const CustomOptionsTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mox::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}} as |mox|>

      {{#each this.connectorTypes as |connector|}}
        <mox.option
          @option={{connector}}
          @selectedOption={{this.selectedConnectorType}}
          @optionNameKey="name"
          @optionValueKey="value"
          @optionCategoryKey={{this.categoryKey}} />
      {{/each}}
    </Mox::Select>
  </div>
`,
  context: args,
});

const CustomOptionsBlockTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mox::Select
      @label='Type'
      @options={{this.resourceTypes}}
      @selectedOption={{this.selectedResourceType}}
      @onChange={{this.setResourceType}} as |mox|>

      {{#each this.resourceTypes as |resource|}}
        <mox.option
          @option={{resource}}
          @selectedOption={{this.selectedResourceType}}
          @optionNameKey="name"
          @optionValueKey="value">
            <img
              src="/{{resource.value}}.svg"
              alt=""
              role="none"
              class="flex-shrink-0 h-6 w-6"
            />
        </mox.option>
      {{/each}}
    </Mox::Select>
  </div>
`,
  context: args,
});

const DisabledOptionsTemplate = (args) => ({
  template: hbs`
  <div class={{this.wrapperClass}}>
    <Mox::Select
      @label='Type'
      @options={{this.connectorTypes}}
      @selectedOption={{this.selectedConnectorType}}
      @onChange={{this.setConnectorType}} as |mox|>
      {{#each this.connectorTypes as |connector|}}
        <mox.option
          @option={{connector}}
          @selectedOption={{this.selectedConnectorType}}
          @optionNameKey="name"
          @optionValueKey="value"
          @isDisabled={{connector.isDisabled}} />
      {{/each}}
    </Mox::Select>
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

export const Errors = Template.bind({});
Errors.args = {
  connectorTypes: connectorTypes,
  selectedConnectorType: connectorTypes[0],
  isEditing: false,
  setConnectorType: action(function (value) {
    this.set('selectedConnectorType', value);
  }),
  wrapperClass: null,
  isValid: false,
  error: 'Invalid connector',
  inputAction: () => {},
};
