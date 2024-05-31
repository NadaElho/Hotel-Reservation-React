import Amenity from "../components/Amenity";
import Hotel from "./Hotel";
import LimitedRooms from "./LimitedRooms";
import Rooms from "./Rooms";
import Views from "./Views";
import Branches from "./Branches";

const Home = () => {
  return (
    <div>
      <Amenity /> 
      <Branches/>
      <LimitedRooms />
      <Rooms />
      <Views /> 
      <Hotel /> 
    </div>
  );
};

export default Home;
