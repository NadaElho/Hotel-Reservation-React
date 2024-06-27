import imgLight from "/notFoundLight.svg";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname != "/not-found") {
      navigate("/not-found", { replace: true });
    }
  }, []);
  return (
    <div className="flex h-screen justify-center items-center overflow-hidden">
      <img
        className=" w-1/2"
        src={ imgLight}
        alt=""
      />
    </div>
  );
};

export default NotFound;
