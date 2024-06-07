import Amenity from "../components/Amenity";
import Hotel from "./Hotel";
import LimitedRooms from "./LimitedRooms";
import Views from "./Views";
import Branches from "./Branches";
import { useLocation } from "react-router";
import { useEffect, useRef } from "react";

const Home = () => {
  const branchesRef = useRef(null)
  const { hash } = useLocation();
  useEffect(() => {
    if (hash =="#branches" && branchesRef?.current) {
      branchesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <div>
      <Amenity />
      <div ref={branchesRef}>
        <Branches />
      </div>
      <LimitedRooms />
      <Views />
      <Hotel />
    </div>
  );
};

export default Home;
