
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationUz from "./uz/translations.json";
import translationRu from "./ru/translations.json";
import translationEn from "./en/translations.json";

const resources = {
  uz: { translation: translationUz },
  ru: { translation: translationRu },
  en: { translation: translationEn }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz",
    fallbackLng: "uz",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
