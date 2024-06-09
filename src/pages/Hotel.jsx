import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation,Keyboard } from "swiper/modules";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
 const {t} = useContext(LanguageContext)
  const isArabic = localStorage.getItem("lang") == "ar"
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/hotels");
      const data = res.data.data;
      setHotels(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-20 px-4">
      <h2 className="text-primary text-2xl font-secondary uppercase mb-10 mx-2 sm:mx-10 sm:text-4xl dark:text-PrimaryDark ">
        {t("rooms.Explore-branches")}
      </h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow,  Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {hotels.map((hotel) => (
          <SwiperSlide key={hotel._id}>
            <div className="relative rounded-3xl overflow-hidden h-64  mx-2">
              <img
                className="h-full w-full object-cover"
                src={hotel.images[0]}
                alt="Hotel"
              />
              <div className="absolute bottom-0 left-0 w-full">
                <div className="bg-secondary rounded-t-2xl p-4 flex justify-between items-center dark:bg-[#27201B]">
                  <div>
                    <p className="text-primary font-bold dark:text-PrimaryDark">
                      {isArabic ? hotel.name_ar : hotel.name_en} {t("rooms.branch")}
                    </p>
                    <span className="text-primary dark:text-PrimaryDark">
                      {isArabic ? hotel.address_ar : hotel.address_en}
                    </span>
                  </div>
                  <div>
                    <Link to={`branch/${hotel._id}`}>
                      <button className="bg-primary text-white py-2 px-6 rounded-full dark:bg-PrimaryDark dark:text-customDark font-semibold">
                        {t("rooms.checkout")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hotel;
