import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaBehance,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-footer dark:bg-gray-900 mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/assets/logo.png" alt="" width={"70px"} />
            </a>
          </div>
          <div className="mb-6 md:mb-0">
            <a href="#" className="items-center">
              <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-primary font-secondary">
                Ready to get started?
              </p>
              <p className="self-center text-custom whitespace-nowrap dark:text-white">
                Dicover Egypt through your eyes
              </p>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom uppercase dark:text-white">
                Resources
              </h2>
              <ul className=" text-custom dark:text-gray-400 text-sm opacity-80">
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Poducts
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Service
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom dark:text-white">
                Our branches
              </h2>
              <ul className=" text-custom dark:text-gray-400 text-sm opacity-80">
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                    Luxor
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                    Aswan
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                    Cairo
                  </a>
                </li>{" "}
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                    Sinai
                  </a>
                </li>{" "}
                <li className="mb-2">
                  <a href="#" className="hover:underline ">
                    Giza
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline ">
                    Siwa Qasis
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold text-custom dark:text-white">
                Telephones
              </h2>
              <ul className=" text-custom dark:text-gray-400 text-sm opacity-80">
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
          <span className="text-sm text-custom opacity-80 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Apex™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 ">
            <a
              href="#"
              className="text-custom opacity-80  dark:hover:text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaBehance />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              className="text-custom opacity-80 hover:text-gray-900 dark:hover:text-white ms-5"
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
