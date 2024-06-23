import { useContext } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { LanguageContext } from "../providers/LanguageContext";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { PiTagChevronLight } from "react-icons/pi";

const Sidebar = ({ data, handleImageChange, handleLog }) => {
  const { t } = useContext(LanguageContext);
  const isDark = localStorage.getItem("dark") == "dark";

  return (
    <div className="w-full md:w-1/3 p-4 mt-[70px] me-2">
      <div className="flex gap-4 mb-4 items-center">
        <label
          htmlFor="uploadFile1"
          className="flex outline-none rounded cursor-pointer relative ms-0"
        >
          <div className="rounded-full w-[120px] h-[120px]">
            <img
              src={data.images[0]}
              alt=""
              className="rounded-full w-17 h-17"
            />
          </div>
          <input
            type="file"
            id="uploadFile1"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="absolute top-20 left-20 rtl:right-20 rounded-full w-10 h-10 bg-main-500 flex items-center justify-center">
            <IoCameraOutline color="white" size={"22px"} />
          </div>
        </label>
        <div className="flex flex-col text-main-800 dark:text-main-25">
          <p>{t("profile.hi")}</p>
          <h4 className="font-bold">
            <span className="capitalize">{data.firstName}</span>{" "}
            <span className="capitalize">{data.lastName}</span>
          </h4>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mt-2">
          <AiOutlineMail color={`${isDark ? "white" : "1D1D1D"}`} />
          {data.email}
        </div>
        {data.phoneNumber && (
          <div className={`flex items-center gap-2 mt-4`}>
            <MdOutlinePhone
              color={`${isDark ? "white" : "1D1D1D"}`}
              size={15}
            />
            {data.phoneNumber}
          </div>
        )}
        {data?.subscriptionId?.name_en && (
          <div className={`flex items-center gap-2 mt-4`}>
            <PiTagChevronLight
              color={`${isDark ? "white" : "1D1D1D"}`}
              size={15}
              className="rotate-90"
            />
            {localStorage.getItem("lang") == "ar" ? t("profile.member")+ " " + data.subscriptionId.name_ar :  data.subscriptionId.name_en + " " + t("profile.member")}
          </div>
        )}
        <button
          className="bg-main-800 text-white dark:bg-main-25 dark:text-main-800 rounded-3xl py-2 px-10 mt-8 hidden md:block"
          onClick={handleLog}
        >
          {t("drop-down.logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
