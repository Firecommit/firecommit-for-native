const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-paper/babel',
    [
      'module-resolver',
      {
        alias: {
          '&': path.resolve(__dirname, 'src'),
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: './.env',
      },
    ],
  ],
};
