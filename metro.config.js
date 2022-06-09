/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const MetroConfig = require('@ui-kitten/metro-config');
/**
 * @see https://akveo.github.io/react-native-ui-kitten/docs/guides/improving-performance
 */
const evaConfig = {
  evaPackage: '@eva-design/eva',
};
const assetExts = [
  'bmp', 'gif', 'jpg', 'jpeg',
  'png', 'psd', 'svg', 'webp',
  'm4v', 'mov', 'mp4', 'mpeg',
  'mpg', 'webm', 'aac', 'aiff',
  'caf', 'm4a', 'mp3', 'wav',
  'html', 'pdf', 'yaml', 'yml',
  'otf', 'ttf', 'zip', 'bin'
]
module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    assetExts,
  },
});

