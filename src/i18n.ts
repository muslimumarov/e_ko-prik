import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const SUPPORT_LOCALES = ["en", "ru", "uz"];
export const DEFAULT_LOCALE = "uz";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    fallbackLng: DEFAULT_LOCALE,
    debug: false,
    supportedLngs: SUPPORT_LOCALES,
    detection: {
      order: ["cookie"], // faqat cookie’dan o‘qisin
      caches: ["cookie"],
    },
    saveMissing: false,
    react: {
      useSuspense: false,
    },
  });
export default i18n;
