import { Link } from "react-router-dom";
const DropDown = () => {
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56 py-4"
        >
          <Link>
            <li>All branches</li>
          </Link>
          <hr />
          <Link to="/rooms">
            <li>All rooms</li>
          </Link>
          <hr />

          <Link>
            <li>log in</li>
          </Link>
          <hr />

          <Link>
            <li>Sign up</li>
          </Link>
          <hr />

          <Link>
            <li>Log out</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default DropDown;
