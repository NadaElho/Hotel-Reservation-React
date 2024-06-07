import { useLocation } from "react-router";
import { Search } from "./Search";

const Hero = () => {
  const location = useLocation()
  return (
    <div className={`bg-[url("/bg.png")] bg-cover flex justify-center items-center ${location.pathname == "/" ? "h-screen" : "h-[400px]"}`}>
      <Search />
    </div>
  );
};

export default Hero;
