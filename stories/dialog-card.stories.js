import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::DialogCard',
};

const TemplateSimple = (args) => ({
  template: hbs`<Mxa::DialogCard>
    <h1>{{this.titleText}}</h1>
    <h2>{{this.subTitleText}}</h2>
    <p>{{this.bodyText}}</p>
  </Mxa::DialogCard>`,
  context: args,
});

const TemplateExtended = (args) => ({
  template: hbs`<Mxa::DialogCard>
    <:title>{{this.titleText}}</:title>
    <:sub-title>{{this.subTitleText}}</:sub-title>
    <:body>
      <p>{{this.bodyText}}</p>
    </:body>
  </Mxa::DialogCard>`,
  context: args,
});

export const Default = TemplateExtended.bind({});
Default.args = {
  titleText: 'Dialog Card',
  subTitleText: 'A subtitle header',
  bodyText: 'This is a dialog card using the extended yield syntax',
  isContainer: true,
};

export const Simple= TemplateSimple.bind({});
Simple.args = {
  titleText: 'Fullscreen',
  subTitleText: 'Layout (fullscreen)',
  bodyText: 'This is a dialog card using the simple yield syntax',
  isContainer: true,
};
