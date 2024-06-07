import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useNavigate } from "react-router-dom";
const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/amenities?limit=12&page=1");
      const data = res.data.data;
      setAmenities(data);
    }
    fetchData();
  }, []);
  const filterByAmenity = (amenityId) => {
    navigate(`/rooms?amenitiesIds=${amenityId}`);
  };

  return (
    <div className="container mx-auto hidden xl:block ">
      <div className="flex justify-between  mx-10 mt-10 ">
        {amenities.map((amenity) => (
          <div key={amenity._id} className="flex flex-col items-center">
            <div
              className="w-20 h-20 bg-secondary rounded-full flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => filterByAmenity(amenity._id)}
            >
              <img
                src={amenity.images[0]}
                alt="amenity"
                className="w-16 h-16 object-cover"
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
