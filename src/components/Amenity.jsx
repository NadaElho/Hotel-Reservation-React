import { useEffect, useState } from "react";
import axios from "axios";
const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/amenities");
        const data = res.data.data;
        console.log(data);
        setAmenities(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return (
   <div className="container mx-auto ">
     <div className=" w-100 flex justify-between mx-10 mt-10">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex flex-col items-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex justify-center text-center">
            <img
              src="https://www.itpedia.nl/wp-content/uploads/2018/07/wifi.png"
              alt="amenity"
              width={"50px"}
              height={"40px"}
            />
          </div>
          <p className="text-primary font-semibold">{amenity.name_en}</p>
        </div>
      ))}
    </div>
   </div>
  );
};

export default Amenity;
