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

const SortableTemplate = (args) => ({
  template: hbs`
  <Mox::List @items={{this.listItems}}>
    <:header as |s|>
      <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "name"}} @sort={{fn s.sortByColumn "name"}}>
        Name
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "description"}} @sort={{fn s.sortByColumn "description"}}>
        Description
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "damage"}} @sort={{fn s.sortByColumn "damage"}}>
        Damage / Recovery
      </Mox::List::Item>
      <Mox::List::Item @isHeader={{true}} @isActive={{eq s.sortedBy "price"}} @sort={{fn s.sortByColumn "price"}}>
        Price
      </Mox::List::Item>
    </:header>
    <:body as |sortedItems|>
      {{#each sortedItems as |item|}}
        <Mox::List::Row>
          <Mox::List::Item>
            {{item.name}}
          </Mox::List::Item>
          <Mox::List::Item>
            {{item.description}}
          </Mox::List::Item>
          <Mox::List::Item>
            {{item.damage}}
          </Mox::List::Item>
          <Mox::List::Item>
            {{item.price}}
          </Mox::List::Item>
        </Mox::List::Row>
      {{/each}}
    </:body>
  </Mox::List>
`,
  context: args,
});

export const Default = Template.bind({});
export const Sortable = SortableTemplate.bind({});
Sortable.args = {
  listItems: [
    { name: 'Lunar Curtain', description: 'Casts [MBarrier] on the party.', damage: 0, price: 0 },
    { name: 'Fire Veil', description: 'Uses "Fire3" on all opponents', damage: 1200, price: 800 },
    { name: 'Stardust', description: 'Uses "Comet2" on all opponents', damage: 1120, price: 8000 },
    { name: 'Hi-Potion', description: 'Restores HP by 500', damage: 500, price: 300 },
  ],
};
