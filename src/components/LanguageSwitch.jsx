import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import img from "/toggle.svg"
const LanguageSwitch = () => {
  const { toggleLanguage, t } = useContext(LanguageContext);
  return (
    <>
      <img src={img} className="w-[25px] cursor-pointer" onClick={()=>toggleLanguage(localStorage.getItem("lang") == "en" ? "ar" : "en")}/>
    </>
  );
};

export default LanguageSwitch;
