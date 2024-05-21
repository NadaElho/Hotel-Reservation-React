import { useEffect, useState } from "react";

const ModeSwitch = () => {  
  const [dark, setDark] = useState(localStorage.getItem("dark") || "light");

  useEffect(() => {
    dark == "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, []);

  const darkModeHandler = () => {
    let newMode = dark == "light" ? "dark" : "light";
    setDark(newMode);
    localStorage.setItem("dark", newMode);
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={() => {
        darkModeHandler();
      }}
    >dark</button>
  );
};

export default ModeSwitch;
