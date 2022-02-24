import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa/Mxa::Card',
};

const Template = (args) => ({
  template: hbs`<Mxa::Card @isContainer={{this.isContainer}}>
    <:title>{{this.titleText}}</:title>
    <:sub-title>{{this.subTitleText}}</:sub-title>
    <:body>
      <p>{{this.bodyText}}</p>
    </:body>
  </Mxa::Card>`,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  titleText: 'Centered',
  subTitleText: 'Layout (centered)',
  bodyText: 'You may toggle the isContainer argument to review different width sizes',
  isContainer: true,
};

export const FullLayout= Template.bind({});
FullLayout.args = {
  titleText: 'Fullscreen',
  subTitleText: 'Layout (fullscreen)',
  bodyText: 'You may toggle the isContainer argument to review different width sizes',
  isContainer: true,
};
FullLayout.parameters = {
  layout: 'fullscreen',
};
