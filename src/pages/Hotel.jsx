import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation,Keyboard } from "swiper/modules";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);

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
        Explore stays in our branches
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
                      {hotel.name_en} branch
                    </p>
                    <span className="text-primary dark:text-PrimaryDark">
                      {hotel.address_en}
                    </span>
                  </div>
                  <div>
                    <Link to={`branch/${hotel._id}`}>
                      <button className="bg-primary text-white py-2 px-6 rounded-full dark:bg-PrimaryDark dark:text-customDark font-semibold">
                        Check out
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
