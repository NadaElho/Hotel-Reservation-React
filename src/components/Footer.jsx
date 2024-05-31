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
    <div className="bg-footer h-96">
      <div className=" w-100 flex flex-col justify-between mx-20 mt-10">
        <div className="w-100 flex justify-between mt-10">
          {/* contact */}
          <div>
            <div>
              <img src="/assets/logo.png" alt="" width={"70px"} />
            </div>

            <ul className="w-80 flex justify-between text-custom text-sm mt-5 opacity-80">
              <li>Product & Service</li>
              <li>Recourses</li>
              <li>Contact</li>
              <li>About</li>
            </ul>
            <ul className="w-40	flex justify-between text-custom text-sm mt-5 opacity-80">
              <li>
                <FaFacebook />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaTwitter />
              </li>
              <li>
                <FaBehance />
              </li>
              <li>
                <FaLinkedin />
              </li>
              <li>
                <FaGithub />
              </li>
            </ul>
          </div>
          {/* 1 */}

          <div >
            <p className="text-primary font-secondary font-semibold text-2xl	">Ready to get started?</p>
            <p className="text-custom">Dicover Egypt through your eyes</p>
          </div>
          {/* 2 */}
          <div className="w-100">
            <span className="text-custom font-medium"> our branches </span>
            <ul className="text-custom text-sm mx-2 opacity-80">
              <li>Luxor</li>
              <li>Aswan</li>
              <li>Giza</li>
              <li>Cairo</li>
              <li>Siwa Qasis</li>
              <li>White desert</li>
              <li>Sinai</li>
            </ul>
          </div>
          {/* 3 */}
          <div>
            <span className="text-custom font-medium">Telephones</span>
            <ul className="text-custom text-sm text-center opacity-80">
              <li>026846899</li>
              <li>026846899</li>
              <li>026846899</li>
              <li>026846899</li>
              <li>026846899</li>
              <li>026846899</li>
              <li>026846899</li>
            </ul>
          </div>
        </div>
        <div className="h-px my-8 bg-custom opacity-40 "> </div>
        {/* contact*/}
        {/* copyRight */}
        <div className="w-100 flex justify-between">
          <ul className="w-40 justify-between flex text-custom  text-sm opacity-80">
            <li>English</li>
            <li>Privacy</li>
            <li>Legal</li>
          </ul>
          {/*  */}

          <p className="justify-between flex text-custom  text-xs opacity-80">&copy;2024 groub 4. All Rights Reversed</p>
        </div>
      </div>
    </div>
    // parent
  );
};

export default Footer;
