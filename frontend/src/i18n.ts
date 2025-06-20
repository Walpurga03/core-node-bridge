import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { deTranslations } from "./locales/de/translation";
import { enTranslations } from "./locales/en/translation";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: deTranslations },
      en: { translation: enTranslations }
    },
    lng: "de",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;