import { createContext } from "react";
import { useTranslation } from "react-i18next";
export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const ltrLangs = ["en"];
  const { t, i18n } = useTranslation();
  i18n.resolvedLanguage = localStorage.getItem("lang");
  document.dir = ltrLangs.includes(i18n.resolvedLanguage) ? "ltr" : "rtl";

  const toggleLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    document.dir = ltrLangs.includes(i18n.resolvedLanguage) ? "ltr" : "rtl";
  };

  return (
    <LanguageContext.Provider value={{ t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
