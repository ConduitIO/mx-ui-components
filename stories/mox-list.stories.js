import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox/Mox::List',
  parameters: {
    backgrounds: {
      default: 'Dark',
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <Mox::List>
    <:header>
      <Mox::List::Item @isHeader={{true}}>
        Name
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}}>
        Description
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}}>
        Difficulty
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}}>
        Rating
      </Mox::List::Item>
    </:header>
    <:body>
      <Mox::List::Row>
        <Mox::List::Item>
          Cheesecake
        </Mox::List::Item>
        <Mox::List::Item>
          Delicious cake with lemon flavour
        </Mox::List::Item>
        <Mox::List::Item>
          medium
        </Mox::List::Item>
        <Mox::List::Item>
          3 / 5
        </Mox::List::Item>
      </Mox::List::Row>
      <Mox::List::Row>
        <Mox::List::Item>
          Cherry Pie
        </Mox::List::Item>
        <Mox::List::Item>
          Grandma's signature dessert
        </Mox::List::Item>
        <Mox::List::Item>
          advanced
        </Mox::List::Item>
        <Mox::List::Item>
          5 / 5
        </Mox::List::Item>
      </Mox::List::Row>
    </:body>
  </Mox::List>
`,
  context: args,
});

export const Default = Template.bind({});
