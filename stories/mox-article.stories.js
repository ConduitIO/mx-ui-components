import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Mox Dark/Mox::Article',
  argTypes: {
    content: { control: 'text' },
    title: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#111827',
        },
        {
          name: 'Sky',
          value: '#06B6D4',
        },
      ],
    },
  },
};

const Template = (args) => ({
  template: hbs`
  <div class="dark">
    <Mox::Article>
      {{this.content}}
    </Mox::Article>
  </div>`,
  context: args,
  parameters: {
    background: 'Dark',
  },
});

const HeaderTemplate = (args) => ({
  template: hbs`
  <div class="dark">
    <Mox::Article>
      <Mox::Article::Header>
        <:title>
          {{this.title}}
        </:title>
        <:subtitle>
          {{this.content}}
        </:subtitle>
      </Mox::Article::Header>
    </Mox::Article>
  </div>`,
  context: args,
  parameters: {
    background: 'Dark',
  },
});

const AnotherHeaderTemplate = (args) => ({
  template: hbs`
  <div class="dark">
    <Mox::Article>
      <Mox::Article::Header>
        {{this.title}}
      </Mox::Article::Header>

      {{this.content}}
    </Mox::Article>
  </div>`,
  context: args,
  parameters: {
    background: 'Dark',
  },
});


export const Default = Template.bind({});
Default.args = {
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum pulvinar posuere. Quisque viverra ante ut risus auctor ullamcorper. Integer cursus quis ex in ultrices. Phasellus mollis risus massa, eu mattis dui laoreet sed. Pellentesque vel mi sagittis, porta purus vel, vulputate dolor. Donec eget nulla libero. Aenean mi ante, elementum nec blandit ut, luctus id odio. Nunc venenatis, nulla sed sodales ultricies, mauris sapien aliquam leo, bibendum aliquet dui arcu at orci. Nam lacinia, risus condimentum scelerisque pretium, lectus urna pellentesque nulla, eu rhoncus neque arcu ac metus. Nunc vel lacinia quam, sed vehicula nulla. Nunc vel cursus nibh, et pharetra sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
};

export const WithFullHeader = HeaderTemplate.bind({});
WithFullHeader.args = {
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum pulvinar posuere.`,
  title: 'Integrations',
};

export const WithSimpleHeader = AnotherHeaderTemplate.bind({});
WithSimpleHeader.args = {
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum pulvinar posuere. Quisque viverra ante ut risus auctor ullamcorper. Integer cursus quis ex in ultrices. Phasellus mollis risus massa, eu mattis dui laoreet sed. Pellentesque vel mi sagittis, porta purus vel, vulputate dolor. Donec eget nulla libero. Aenean mi ante, elementum nec blandit ut, luctus id odio. Nunc venenatis, nulla sed sodales ultricies, mauris sapien aliquam leo, bibendum aliquet dui arcu at orci. Nam lacinia, risus condimentum scelerisque pretium, lectus urna pellentesque nulla, eu rhoncus neque arcu ac metus. Nunc vel lacinia quam, sed vehicula nulla. Nunc vel cursus nibh, et pharetra sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus.`,
  title: 'Integrations',
};

