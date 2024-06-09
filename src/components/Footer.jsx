import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaBehance,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Footer = () => {

  //
  const {t} = useContext(LanguageContext)

  return (
    <footer className="bg-footer dark:bg-[#1D1D1D] mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/assets/logo.png" alt="" width={"70px"} />
            </a>
          </div>
          <div className="mb-6 md:mb-0">
            <a href="#" className="items-center">
              <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-PrimaryDark text-primary font-secondary">
                {t("footer.start")}
              </p>
              <p className="self-center text-custom whitespace-nowrap dark:text[#B4997E]">
                {t("footer.discover")}
              </p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom uppercase dark:text-[#FBFAF9]">
                {t("footer.resource")}
              </h2>
              <ul className=" text-custom text-sm opacity-80 dark:text-[#FBFAF9]">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    {t("footer.Poducts")}
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    {t("footer.Service")}
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    {t("footer.Contact")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {t("footer.About")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom dark:text-white dark:text-[#FBFAF9]">
                {t("footer.branches")}
              </h2>
              <ul className=" text-custom text-sm opacity-80 dark:text-[#FBFAF9]">
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                  {t("footer.luxor")}
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                  {t("footer.aswan")}
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                  {t("footer.cairo")}
                  </a>
                </li>{" "}
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                     {t("footer.sinai")}
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                  {t("footer.giza")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline ">
                    {t("footer.Siwa Qasis")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom dark:text-[#FBFAF9]">
                {t("footer.Telephones")}
              </h2>
              <ul className=" text-custom text-sm opacity-80 dark:text-[#FBFAF9]">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    024597659
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    024593687
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    028906932
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    024845021
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    020298022
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    024186008
                  </a>
                </li>
              </ul>
            </div>
            {/*  */}
          </div>
        </div>
        <hr className="my-6 border-secondary sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-custom opacity-80 sm:text-center dark:text-[#FBFAF9]">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Apex™
            </a>
            . {t("footer.copy-right")}.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 ">
            <a
              href="#"
              className="text-custom opacity-80  dark:text-[#FBFAF9]"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:text-[#FBFAF9] ms-5"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:text-[#FBFAF9] ms-5"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:text-[#FBFAF9] ms-5"
            >
              <FaBehance />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:text-[#FBFAF9] ms-5"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:text-[#FBFAF9] ms-5"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
