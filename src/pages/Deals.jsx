import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
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
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import ReactStars from "react-rating-stars-component";
import { CiHeart } from "react-icons/ci";

const Deals = () => {
  const [rooms, setRooms] = useState([]);
  const [subscription,setSubscription] = useState([])
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      const data = res.data.data;
      setRooms(data);

      const subData = await axiosInstance.get("/subscriptions");
      setSubscription(subData.data.data)
      console.log(subData.data.data);
    }
    fetchData();
  }, []);

  const shuffleRoom = rooms.sort(() => Math.random() - 0.5);
  const limitedRooms = shuffleRoom.slice(0, 9);

  return (
    <div className="container mx-auto mt-20 px-4  overflow-hidden">
      <h2 className="text-primary text-2xl font-secondary uppercase mb-10 mx-2 sm:mx-10 sm:text-4xl dark:text-PrimaryDark  ">
        {t("rooms.Check-rooms")}
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
        modules={[EffectCoverflow, Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {limitedRooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative w-[320px] h-64 rounded-3xl overflow-hidden mt-10 ">
              <img
                className="h-full w-full object-cover"
                src={room.images}
                alt="Room"
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
              <div className=" absolute bottom-0 left-0 flex  items-center ">
                <div className="p-3 w-40 bg-secondary rounded dark:bg-[#7C6555]  ">
                  <p className="text-white font-semibold text-sm">
                    {`${
                      room.hotelId && isArabic
                        ? room.hotelId.name_ar
                        : room.hotelId.name_en
                    } branch`}
                  </p>
                  <p className="text-white text-sm">
                    {room.roomTypeId && room.roomTypeId.type_en}
                  </p>
                  <ReactStars
                    value={room.ratingAvg}
                    edit={false}
                    color="#ffffff"
                  />
                  <div className=" flex text-xs space-x-2">
                    <span className="text-primary dark:text-[#ffffff]">
                      ${room.price}
                    </span>
                    <a className="text-primary mt-0.5 dark:text-[#ffffff]">
                      <AiOutlineExclamationCircle />
                    </a>
                    <span className="text-primary dark:text-[#ffffff]">
                      {t("rooms.Per-night")}
                    </span>
                  </div>
                  <p className="text-primary font-500 text-xs font-semibold dark:text-[#ffffff]">
                    {t("rooms.taxes-fees")}
                  </p>
                </div>
                {/*  */}
                <div className=" mx-6 mt-16">
                  <Link to={`reservation-room/${room._id}`}>
                    <button className="bg-primary text-white text-xs py-1 w-32  rounded-full dark:bg-[#E2C8AD] dark:text-customDark ">
                      {t("rooms.Reserve-Now")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Deals;
