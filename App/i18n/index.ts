import I18n from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';

I18n.fallbacks = true;
// I18n.locale = 'ar'; // change the default to ar
// TODO: translate the app when finish
// TODO: forceRTL
I18n.translations = {
  en,
  ar,
};

export default I18n;
