import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate(); 
  const {t} = useContext(LanguageContext)
  const isArabic = localStorage.getItem("lang") == "ar"
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
    <div className="container mx-auto w-full  hidden xl:block">
      <div className="flex gap-2 text-2x1 mt-6">
        <span
        className="w-6 h-6  flex items-center justify-center ms-2 border border-primary rounded-lg dark:border-custom"
        >
          <HiAdjustmentsHorizontal className="text-primary text-lg flex items-center justify-center dark:text-PrimaryDark" />
        </span>

        <span className="flex items-center justify-center text-primary font-semibold dark:text-PrimaryDark">
          {t("rooms.filter")}
        </span>
      </div>

      <div className="rounded-3xl w-full flex items-center justify-center mt-4">
        <div className="flex justify-center items-center mx-10 my-8 gap-3">
          {amenities.map((amenity) => (
            <div key={amenity._id} className="flex flex-col items-center">
              <div
                className="w-20 h-20 bg-secondary rounded-full flex flex-col items-center justify-center text-center cursor-pointer dark:bg-[#7C6555]"
                onClick={() => filterByAmenity(amenity._id)}
              >
                <img
                  src={amenity.images[0]}
                  alt="amenity"
                  className="w-16 h-16 object-cover"
                />
              </div>
              <p className="text-primary font-semibold dark:text-PrimaryDark">
                { isArabic ? amenity.name_ar :  amenity.name_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenity;
