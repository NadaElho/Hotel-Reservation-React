import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import english from "/english.svg";
import englishDark from "/englishdark.svg";
import arabic from "/arabic.svg";
import arabicDark from "/arabicdark.svg";

const LanguageSwitch = ({ isScrolled }) => {
  const { toggleLanguage } = useContext(LanguageContext);
  return (
    <>
      <img
        src={
          localStorage.getItem("lang") == "ar"
            ? isScrolled && localStorage.getItem("dark") != "dark"
              ? arabicDark
              : arabic
            : isScrolled && localStorage.getItem("dark") != "dark"
            ? englishDark
            : english
        }
        className="w-[35px] cursor-pointer"
        onClick={() =>
          toggleLanguage(localStorage.getItem("lang") == "en" ? "ar" : "en")
        }
      />
    </>
  );
};

export default LanguageSwitch;
