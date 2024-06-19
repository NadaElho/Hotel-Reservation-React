import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const { t } = useContext(LanguageContext);
  const location = useLocation();
  const links = [
    { title: t("profile.account"), link: "" },
    { title: t("profile.favourites"), link: "favourites" },
    { title: t("profile.plans"), link: "plans" },
    { title: t("profile.history"), link: "history" },
  ];

  const isActive = links.some((link) => location.pathname.endsWith(link.link) && link.link !== "");

  return (
    <div>
      <div className="text-sm font-medium text-center md:mt-[70px]">
        <ul className="flex flex-wrap -mb-px">
          {links.map((link, i) => (
            <div key={link.title} className="my-2">
              <li className="me-2">
                <Link
                  className={`inline-block p-4 ${
                    (location.pathname.endsWith(link.link) && link.link !== "") || (!isActive && i === 0)
                      ? "text-main-800 border-b-2 border-main-800"
                      : "text-main-100"
                  } rounded-t-lg active dark:text-main-50 dark:border-main-50`}
                  to={link.link}
                >
                  {link.title}
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
