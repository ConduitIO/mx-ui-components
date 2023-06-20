import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Accordion',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};


const Template = (args) => ({
  template: hbs`
    <Mox::Accordion @isOpen={{this.isOpen}} @route="/">
      <:header>
        <Mox::Icon @iconName={{this.iconName}} @noStroke={{this.noStroke}} />
        <h3 class="text-lg">{{this.accordionTitle}}</h3>
        <Mox::Badge @status={{this.status}}>{{this.statusTitle}}</Mox::Badge>
      </:header>
      <:body>
        {{this.accordionContent}}
      </:body>
    </Mox::Accordion>
  `,
  context: args,
});

export const Default = Template.bind({});
Default.args = {
  iconName: 'settings-16',
  status: 'neutral',
  statusTitle: 'Updated',
  noStroke: true,
  accordionTitle: 'My Settings',
  accordionContent: 'Accordion content',
  isOpen: false,
};

export const Opened = Template.bind({});
Opened.args = {
  iconName: 'connector-16',
  status: 'caution',
  statusTitle: 'Warning',
  noStroke: true,
  accordionTitle: 'Mox::Accordion',
  accordionContent: 'Initialize Accordion in opened state',
  isOpen: true,
};
