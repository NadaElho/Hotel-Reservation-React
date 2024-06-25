import img from "/checkemail.png";
import { Link } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";

const CheckEmail = () => {
  const { t } = useContext(LanguageContext);
  {
    t("checkemail", "rememberpassword", "openemail", "sentemail", "login");
  }
  const handleEmailClick = () => {
    window.location.href = "mailto:";
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h3 className="text-2xl font-bold dark:text-grey-400 text-[#464646]  lg:mt-0">
        {t("checkemail.checkemail")}
      </h3>
      <h5 className="text-xs dark:text-main-150 text-[#81664B] mb-4 font-semibold">
        {t("checkemail.sentemail")}
      </h5>
      <div className=" lg:block ">
        <img src={img} alt="Check Email" className="object-cover" />
      </div>
      <button
        type="button"
        onClick={handleEmailClick}
        className="w-96 bg-[#52381D] dark:bg-main-25 dark:text-main-1000 rounded-full p-2 text-white disabled:opacity-50 my-2"
      >
        {t("checkemail.openemail")}
      </button>{" "}
      <p className="mt-2 text-[#464646] dark:text-main-150">
        {t("checkemail.rememberpassword")}
        <Link
          to="/login"
          className="text-[#52381D] dark:text-main-150 underline"
        >
          {t("checkemail.login")}
        </Link>
      </p>
    </div>
  );
};

export default CheckEmail;
