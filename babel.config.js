module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./App/components",
          "@Redux": "./App/Redux",
          "@Screens": "./App/Screens",
          "@i18n": ["./App/i18n"],
          "@Navigation": ["./App/Navigation"],
          "@types": ["./App/@types"],
        }
      }
    ]
  ]
};
