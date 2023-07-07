import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::TagsInput',
};

const Template = (args) => ({
  template: hbs`
    <Mxa::TagsInput @availableTags={{this.availableTags}} @placeholder={{this.placeholder}}>
      <:label-main>TAGS</:label-main>
      <:label-extra>Query and filter your data sources by using tags.</:label-extra>
    </Mxa::TagsInput>`,
  context: args,
});

const SimpleLabelTemplate = (args) => ({
  template: hbs`
    <Mxa::TagsInput @availableTags={{this.availableTags}} @placeholder={{this.placeholder}}>
      <:label-main>TAGS</:label-main>
    </Mxa::TagsInput>`,
  context: args,
});

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  availableTags: ['attack', 'beast', 'colossal'],
  placeholder: 'No entry required',
};

export const SimpleInput = SimpleLabelTemplate.bind({});
SimpleInput.args = {
  availableTags: ['self', 'explana', 'tory', 'default', 'label'],
  placeholder: 'no extra explanation in the label',
};
