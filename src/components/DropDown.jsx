import { Link } from "react-router-dom";
const DropDown = () => {
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
        <button
  data-collapse-toggle="navbar-hamburger"
  type="button"
  className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-primary rounded-lg  focus:outline-none focus:border-none bg-transparent"
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
      className="bg-body dropdown-content z-[1] menu rounded-box w-56 h-40 space-y-1 text-primary font-semibold"
    >
      <Link to="/branches">
        <li>Branches</li>
      </Link>
      <hr className="border-t-1 border-primary" />
      <Link to="/rooms">
        <li>All rooms</li>
      </Link>
      <hr className="border-t-1 border-primary" />
      <Link to="/login">
        <li>Log in</li>
      </Link>
      <hr className="border-t-1 border-primary" />
      <Link to="/signup">
        <li>Sign up</li>
      </Link>
      <hr className="border-t-1 border-primary" />
      <Link to="/logout">
        <li>Log out</li>
      </Link>
    </ul>
      </div>
    </>
  );
};

export default DropDown;
