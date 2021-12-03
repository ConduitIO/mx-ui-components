export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'Mute',
    values: [
      {
        name: 'White',
        value: '#ffffff',
      },
      {
        name: 'Mute',
        value: '#FBFBFB',
      },
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
  layout: 'centered',
};
