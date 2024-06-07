import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";

const DropDown = ({ isScrolled, logged, handleLog }) => {
  const [show, setShow] = useState(false);
  const links = [
    { name: "All branches", link: "/#branches" },
    { name: "All rooms", link: "/rooms" },
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
              color={`${isScrolled ? "#52381D" : "white"}`}
            />
          </button>
        </div>
        <div
          className={`${
            show ? "block" : "hidden"
          } absolute right-0 z-10 -mt-2 w-48 origin-top-right rounded-md bg-grey-100 shadow-md py-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className="block px-4 py-2 text-sm text-main-400"
              role="menuitem"
              tabIndex={-1}
            >
              {link.name}
            </Link>
          ))}
          {logged && (
            <Link
              to="/login"
              className="block px-4 py-2 text-sm text-main-400"
              role="menuitem"
              tabIndex={-1}
            >
              Log in
            </Link>
          )}
          {!logged && (
            <Link
              className="block px-4 py-2 text-sm text-main-400"
              role="menuitem"
              tabIndex={-1}
              to="/"
              onClick={handleLog}
            >
              Log out
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDown;
