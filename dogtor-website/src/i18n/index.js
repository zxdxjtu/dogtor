import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言包
import en from './locales/en.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 传递 i18n 实例给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,
    fallbackLng: 'en', // 默认语言为英文
    debug: false,
    
    // 语言检测选项
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React 已经默认转义了
    },

    // 命名空间
    defaultNS: 'translation',
    ns: ['translation'],
  });

export default i18n;