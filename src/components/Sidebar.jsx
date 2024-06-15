import { useContext } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { LanguageContext } from "../providers/LanguageContext";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";

const Sidebar = ({ data, handleImageChange, handleLog }) => {
  const { t } = useContext(LanguageContext);
  const isDark = localStorage.getItem("dark") == "dark";

  return (
    <div className="w-full md:w-1/4 p-4 mt-[70px]">
      <div className="flex gap-4 mb-4 items-center">
        <label
          htmlFor="uploadFile1"
          className="flex outline-none rounded cursor-pointer relative ms-0"
        >
          <img src={data.images[0]} alt="" className="rounded-full w-14 h-14" />
          <input
            type="file"
            id="uploadFile1"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="absolute top-9 left-9 rtl:right-9 rounded-full w-6 h-6 bg-main-500 flex items-center justify-center">
            <IoCameraOutline color="white" />
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
        <div className="flex items-center gap-2 mt-4">
          <MdOutlinePhone color={`${isDark ? "white" : "1D1D1D"}`} size={15}/>
          {data.phoneNumber}
        </div>
        <button className="bg-main-800 text-white rounded-3xl py-2 px-10 mt-8 hidden md:block" onClick={handleLog}>
          {t("drop-down.logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
