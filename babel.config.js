const presets = [
  [
    '@babel/env',
    {
      targets: {
        chrome: '59'
      },
      useBuiltIns: 'usage'
    },
  ],
];

module.exports = { presets };
