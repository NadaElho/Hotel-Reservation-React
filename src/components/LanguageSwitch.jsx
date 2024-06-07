import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const LanguageSwitch = () => {
  const { toggleLanguage, t } = useContext(LanguageContext);
  return (
    <>
      <button onClick={()=>toggleLanguage(localStorage.getItem("lang") == "en" ? "ar" : "en")}>translate</button>
      <div>{t("hello")}</div>
    </>
  );
};

export default LanguageSwitch;
