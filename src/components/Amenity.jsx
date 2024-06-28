import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto w-full hidden lg:block  ">
      <div className="flex gap-2 text-2x1 mt-6">
        <span className="w-6 h-6  flex items-center justify-center ms-2 border border-primary rounded-lg dark:border-custom">
          <HiAdjustmentsHorizontal className="text-primary text-lg flex items-center justify-center dark:text-PrimaryDark" />
        </span>

        <span className="flex items-center justify-center text-primary font-semibold dark:text-PrimaryDark">
          {t("rooms.filter")}
        </span>
      </div>

        <Slider {...settings}>
          {amenities.map((amenity) => (
            <div
              key={amenity._id}
              className="py-4 mx-7 !w-20 flex flex-col items-center mt-4 "
            >
              <div
                className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center cursor-pointer dark:bg-[#7C6555]"
                onClick={() => filterByAmenity(amenity._id)}
              >
                  <img
                    src={amenity.images[0]}
                    alt="amenity"
                    className="w-12 h-12 object-cover"
                  />
                </div>
                <p className="text-primary text-center  mt-2 font-semibold dark:text-PrimaryDark">
                  {isArabic ? amenity.name_ar : amenity.name_en}
                </p>
            </div>
          ))}
        </Slider>
      </div>
  );
};

export default Amenity;
