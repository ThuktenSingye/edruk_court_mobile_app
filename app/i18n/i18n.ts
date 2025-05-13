import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LauguageDetector from 'i18next-react-native-language-detector';

import en from './en.json';
import dz from './dz.json';

i18n
  .use(LauguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Ensure fallbackLng is correctly typed
    resources: {
      en: {translation: en},
      dz: {translation: dz},
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
