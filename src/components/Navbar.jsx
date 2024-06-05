import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const Navbar = ({logged, handleLog}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= screen.availHeight - 50
        ? setIsScrolled(true)
        : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full fixed z-50 mx-auto top-0 left-1/2 transform -translate-x-1/2 shadow-none ${
        isScrolled ? "bg-grey-100" : "bg-transparent"
      }`}
    >
      <nav className="w-full flex justify-center bg-transparent">
        <div className="flex justify-between items-center w-full max-w-screen-lg px-2">
          <Link to="/">
            <img src="/assets/logo.png" alt="Logo" width={"70px"} />
          </Link>
          <div className="flex space-x-4">
            {/* <ModeSwitch mode={handleMode} /> */}
            {/* <div>translate</div> */}
            <DropDown isScrolled={isScrolled} logged={logged} handleLog={handleLog}/>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
