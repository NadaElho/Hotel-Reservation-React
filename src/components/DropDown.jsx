import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useContext, useState } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const DropDown = ({ isScrolled, logged, handleLog }) => {
  const [show, setShow] = useState(false);
  const {t} = useContext(LanguageContext)
  const links = [
    { name: t("drop-down.branches"), link: "/#branches" },
    { name: t("drop-down.rooms"), link: "/rooms" },
  ];
  return (
    <>
      <div className="relative ml-3" onClick={() => setShow((show) => !show)}>
        <div>
          <button
            type="button"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <RiMenu3Line
              size="2em"
              color={`${isScrolled && localStorage.getItem("dark") != "dark" ? "#52381D" : "white"}`}
            />
          </button>
        </div>
        <div
        dir={`${localStorage.getItem("lang") == 'ar' ? "rtl" : "ltr"}`}
          className={`${
            show ? "block" : "hidden"
          } absolute right-0 z-10 mt-0 w-48 origin-top-right rounded-md bg-grey-100 dark:bg-main-700 shadow-md py-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className="block px-4 py-2 text-sm text-main-400 dark:text-main-25"
              role="menuitem"
              tabIndex={-1}
            >
              {link.name}
            </Link>
          ))}
          {logged && (
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-main-400 dark:text-main-25"
              role="menuitem"
              tabIndex={-1}
            >
              {t("drop-down.login")}
            </Link>
          )}
          {!logged && (
            <Link
              className="block px-4 py-2 text-sm text-main-400 dark:text-main-25"
              role="menuitem"
              tabIndex={-1}
              to="/"
              onClick={handleLog}
            >
              {t("drop-down.logout")}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDown;
