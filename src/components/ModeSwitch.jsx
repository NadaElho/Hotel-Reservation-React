const ModeSwitch = ({ handleMode, mode }) => {
  const darkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      stroke="#7C6555"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M10.177 7.677A4.5 4.5 0 014.323 1.823a4.502 4.502 0 002.676 8.823A4.502 4.502 0 0010.177 7.677z"
      />
    </svg>
  );

  const lightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
      stroke="white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M6 1.5v0.5m0 8v0.5m4.5-4.5h-0.5M2 6H1.5m7.682 3.182l-.354-.354M3.171 3.171l-.354-.354m6.364 0l-.354.354M3.171 8.828l-.354.354M8 6a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  return (
    <>
      <button
        className={`w-10 h-5 rounded-full ${
          mode == "dark" ? "bg-main-600" : "bg-grey-500"
        } flex items-center transition duration-300 focus:outline-none shadow`}
        onClick={handleMode}
      >
        <div
          className={`w-6 h-6 relative rounded-full transition duration-500 transform ${
            mode == "dark"
              ? "bg-white translate-x-full"
              : "bg-main-600 -translate-x-2"
          } p-1 text-white`}
        >
          {mode == "dark" ? darkIcon : lightIcon}
        </div>
      </button>
    </>
  );
};

export default ModeSwitch;
