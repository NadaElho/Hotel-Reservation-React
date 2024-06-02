import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    async function fetchData() {
      
        const res = await axios.get("http://localhost:3000/api/v1/amenities");
        const data = res.data.data;
        setAmenities(data);
      }
      fetchData();

  }, []);

  return (
   <div className="container mx-auto hidden sm:block">
     <div className=" w-100 flex justify-between mx-10 mt-10 ">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex flex-col items-center">
         <Link to="/rooms" >
         <div className="w-20 h-20 bg-secondary rounded-full flex flex-col items-center justify-center text-center cursor-pointer">
            <img
            src={amenity.images[0]}
              alt="amenity"
              className="w-16 h-16 object-cover"
              
            />
          </div>
         </Link>
          <p className="text-primary font-semibold">{amenity.name_en}</p>
        </div>
      ))}
    </div>
   </div>
  );
};

export default Amenity;
