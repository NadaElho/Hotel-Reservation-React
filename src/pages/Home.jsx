import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import axiosInstance from "../../interceptor";
import Amenity from "../components/Amenity";
import Hotel from "./Hotel";
import LimitedRooms from "./LimitedRooms";
import Views from "./Views";
import Branches from "./Branches";
import Map from "../components/Map";

const Home = () => {
  const branchesRef = useRef(null);
  const { hash } = useLocation();
  const [branches, setBranches] = useState([]);
  const [position, setPosition] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/hotels");
      const data = res.data.data;
      setBranches(data);
      const positions = res.data.data.map((branch) => ({
        longitude: branch.longitude,
        latitude: branch.latitude,
        title: branch.name_en
      }));
      setPosition(positions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (hash === "#branches" && branchesRef.current) {
      branchesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);


  return (
    <div>
      {position.length > 0 && (
        <>
          <Amenity />
          <div ref={branchesRef}>
            <Branches />
          </div>
          <Map position={position} />
          <LimitedRooms />
          <Views />
          <Hotel />
        </>
      )}
    </div>
  );
  
};

export default Home;
