import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
} from "swiper/modules";
import axiosInstance from "../../interceptor";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import ReactStars from "react-rating-stars-component";
import { FaRegStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const RoomRated = () => {
  const [rooms, setRooms] = useState([]);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      const data = res.data.data;
      setRooms(data);
    }
    fetchData();
  }, []);

  const topRatedRooms = rooms.sort((a, b) => b.ratingAvg - a.ratingAvg);
  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="flex flex-col font-secondary mx-2 sm:mx-10 dark:text-PrimaryDark ">
        <h2 className="text-primary text-2xl font-secondary sm:text-4xl dark:text-PrimaryDark ">
          our top rated rooms
        </h2>
        <div className="flex gap-1 items-center mt-4 text-custom ">
          <FaRegStar />
          <span>loved by the guests</span>
        </div>
      </div>
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
        modules={[EffectCoverflow, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {topRatedRooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative rounded-3xl overflow-hidden h-[320px]  mx-2">
              <img
                className="h-full w-full object-cover"
                src={room.images[0]}
                alt="room"
              />
              <div className="absolute top-2 px-2 w-full flex justify-between">
                {room.promotionId.map((promotion) => (
                  <div
                    className="bg-[#C2AF00] text-white px-2 py-1 rounded-full mt-2"
                    key={promotion._id}
                  >
                    <p>{promotion.percentage}% off</p>
                  </div>
                ))}

                <div className="absolute top-2 right-2 w-8 h-8 bg-white  flex justify-center items-center rounded-full ">
                  <span className="text-red-900 text-3xl text-center cursor-pointer ">
                    <CiHeart />
                  </span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <div className="bg-secondary rounded-t-2xl p-4 flex justify-between items-center dark:bg-[#27201B]">
                  <div>
                    <p className="text-white font-bold text-sm dark:text-PrimaryDark">
                      {room.hotelId.name_en + " " + "branch"}
                    </p>
                    <span className="text-white text-sm capitalize dark:text-PrimaryDark">
                      {room.roomTypeId.type_en + " " + "room"}
                    </span>
                    <ReactStars
                      value={room.ratingAvg}
                      edit={false}
                      color="#ffffff"
                    />
                  </div>
                  <div>
                    <Link to={`/rooms/${room._id}`}>
                      <button className="bg-primary text-white text-sm py-2 px-6 rounded-full dark:bg-PrimaryDark dark:text-customDark font-medium">
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

export default RoomRated;
