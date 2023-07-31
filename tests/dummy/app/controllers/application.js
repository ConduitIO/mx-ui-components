import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  availableTags = ['source', 'destination', 'function'];
  placeholder = 'Search...';

  allTags = [
    {
      group: 'connectors',
      exclusive: true,
      categories: [
        {
          category: 'source',
          options: [
            { name: 'sqlserver', value: 'sqlserver' }
          ]
        },
        {
          category: 'destination',
          options: [
            { name: 'snowflake-sink', value: 'snowflake-sink' },
            { name: 'my-sql-destiny', value: 'my-sql-destiny' }
          ],
        },
        {
          category: 'function',
          options: [{ name: 'anonymize-123', value: 'anonymize-123' }]
        },
      ],
    },
    {
      group: 'timeInterval',
      exclusive: true,
      categories: [
        {
          category: 'since',
          options: [
            { name: 'Past hour', value: 'Past hour', queryValues: [{ start: '2023-05-01T00:01:22Z' }, { end: '2023-05-01T00:16:22Z' }]},
            { name: 'Past 24 hours', value: 'Past 24 hours', queryValues: [{ start: '2023-05-01T00:01:22Z' }, { end: '2023-05-01T00:16:22Z' }]},
            { name: 'Past 72 hours', value: 'Past 72 hours', queryValues: [{ start: '2023-05-01T00:01:22Z' }, { end: '2023-05-01T00:16:22Z' }]},
            { name: 'Past 7 days', value: 'Past 7 days', queryValues: [{ start: '2023-05-01T00:01:22Z' }, { end: '2023-05-01T00:16:22Z' }]},
          ],
        },
      ],
    },
    { group: 'keywords',
      category: 'query',
      exclusive: true,
      custom: true,
      noKey: true,
      queryValues: { query: null },
    },
  ];

  @action
  selectFilter() {
    // noop
  }
}
