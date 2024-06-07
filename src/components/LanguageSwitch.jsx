import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import english from "/english.svg"
import arabic from "/arabic.svg"
const LanguageSwitch = () => {
  const { toggleLanguage } = useContext(LanguageContext);
  return (
    <>
      <img src={localStorage.getItem("lang") == "ar" ? arabic : english} className="w-[35px] cursor-pointer" onClick={()=>toggleLanguage(localStorage.getItem("lang") == "en" ? "ar" : "en")}/>
    </>
  );
};

export default LanguageSwitch;
