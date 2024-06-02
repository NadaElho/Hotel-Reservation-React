import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";

const DropDown = ({ isScrolled }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative ml-3">
      <button
        type="button"
        id="user-menu-button"
        aria-expanded={show}
        aria-haspopup="true"
        onClick={() => setShow((prevShow) => !prevShow)}
        className="flex items-center"
      >
        <span className="sr-only">Open user menu</span>
        <RiMenu3Line size="2em" color={isScrolled ? "#52381D" : "white"} />
      </button>
      <div
        className={`${
          show ? "block" : "hidden"
        } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <Link
          to="/branches"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          All branches
        </Link>
        <Link
          to="/branch"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          branch
        </Link>
        <Link
          to="/rooms"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          All rooms
        </Link>
        <Link
          to="/login"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          Sign up
        </Link>
        <Link
          to="/logout"
          className="block px-4 py-2 text-sm text-gray-700"
          role="menuitem"
          tabIndex={-1}
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default DropDown;
