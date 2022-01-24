import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mxa::OverviewList',
};

const Template = (args) => ({
  template: hbs`
  <Mxa::OverviewList>
    <:header>
      <Mxa::OverviewList::HeaderItem>
        Name
      </Mxa::OverviewList::HeaderItem>
      <Mxa::OverviewList::HeaderItem>
        Description
      </Mxa::OverviewList::HeaderItem>
      <Mxa::OverviewList::HeaderItem>
        Difficulty
      </Mxa::OverviewList::HeaderItem>
      <Mxa::OverviewList::HeaderItem>
        Rating
      </Mxa::OverviewList::HeaderItem>
    </:header>
    <:body>
      <Mxa::OverviewList::Row>
        <Mxa::OverviewList::Item>
          Cheesecake
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          Delicious cake with lemon flavour
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          medium
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          3 / 5
        </Mxa::OverviewList::Item>
      </Mxa::OverviewList::Row>
      <Mxa::OverviewList::Row>
        <Mxa::OverviewList::Item>
          Cherry Pie
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          Grandma's signature dessert
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          advanced
        </Mxa::OverviewList::Item>
        <Mxa::OverviewList::Item>
          5 / 5
        </Mxa::OverviewList::Item>
      </Mxa::OverviewList::Row>
    </:body>
  </Mxa::OverviewList>
`,
  context: args,
});

export const Default = Template.bind({});
