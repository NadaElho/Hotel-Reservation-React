import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { LanguageContext } from "../providers/LanguageContext";
import { useState, useContext, useEffect } from "react";

export default function About() {
  const { t } = useContext(LanguageContext);
  {
    t("headline1", "paragraph1", "headline2", "paragraph2", "button");
  }
  const [about, setAbout] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAbout(true);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center p-8 overflow-hidden">
          <Loader />
        </div>
      ) : about ? (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full md:w-64 my-5">
              <img
                className="w-auto rounded-3xl"
                src="/assets/about1.png"
                alt="About"
              />
            </div>
            <div className="flex-1 w-full md:w-32 flex flex-col items-center justify-center">
              <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold dark:text-[#E2C8AD]">
                {t("about.headline1")}
              </h1>
              <p className="text-start m-5 md:m-10 text-lg md:text-xl playfair-display text-main-800 font-medium dark:text-[#CBB7A4]">
                {t("about.paragraph1")}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full md:w-64 order-1 md:order-2 my-5">
              <img
                className="w-auto rounded-3xl"
                src="/assets/about2.png"
                alt="About"
              />
            </div>
            <div className="flex-1 w-full md:w-32 flex flex-col items-center justify-center order-2 md:order-1">
              <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold dark:text-[#E2C8AD]">
                {t("about.headline2")}
              </h1>
              <p className="text-start m-10 text-xl playfair-display text-main-800 font-medium dark:text-[#CBB7A4]">
                {t("about.paragraph2")}
              </p>

              <Link
                to="/"
                className="w-72 rounded-3xl px-4 py-2 bg-main-800 text-white text-center mt-5 hover:bg-main-400 hover:text-white dark:text-[#1D1D1D] dark:bg-[#E2C8AD]"
              >
                {t("about.button")}
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
