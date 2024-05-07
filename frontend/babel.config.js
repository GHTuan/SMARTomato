module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    // [
    //   '@tamagui/babel-plugin',
    //   {
    //     components: ['tamagui'],
    //     config: './tamagui.config.ts',
    //     importsWhitelist: ['constants.js', 'colors.js'],
    //     logTimings: true,
    //     disableExtraction: process.env.NODE_ENV === 'development',
    //   },
    // ],
  ],
};
