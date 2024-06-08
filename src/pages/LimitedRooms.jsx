import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation,Keyboard } from "swiper/modules";

const LimitedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      const data = res.data.data;
      setRooms(data);
    }
    fetchData();
  }, []);

  const shuffleRoom = rooms.sort(() => Math.random() - 0.5);
  const limitedRooms = shuffleRoom.slice(0, 9);

  return (
    <div className="container mx-auto mt-20 px-4  overflow-hidden">
      <h2 className="text-primary text-2xl font-secondary uppercase mb-10 mx-2 sm:mx-10 sm:text-4xl dark:text-PrimaryDark  ">
        Check out our rooms
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
        {limitedRooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative w-[350px] h-64 rounded-3xl overflow-hidden mt-10 ">
              <img
                className="h-full w-full object-cover"
                src={room.images}
                alt="Room"
              />
              <div className=" absolute bottom-0 left-0 flex  items-center ">
                <div className="p-3 w-44 bg-secondary rounded dark:bg-[#7C6555]  ">
                  <p className="text-[#ffffff] font-semibold">
                    {`${room.hotelId && room.hotelId.name_en} branch`}
                  </p>
                  <div className=" flex text-xs space-x-2">
                    <span className="text-primary dark:text-[#ffffff]">
                      ${room.price}
                    </span>
                    <a className="text-primary mt-0.5 dark:text-[#ffffff]">
                      <AiOutlineExclamationCircle />
                    </a>
                    <span className="text-primary  dark:text-[#ffffff]">
                      Per night
                    </span>
                  </div>
                  <p className="text-primary font-500 dark:text-[#ffffff]">
                    Includes taxes & fees
                  </p>
                </div>
                {/*  */}
                <div className=" mx-6 mt-4">
                  <Link to={`reservation-room/${room._id}`}>
                    <button className="bg-primary text-white py-2 w-32  rounded dark:bg-[#E2C8AD] dark:text-customDark font-semibold">
                      Reserve Now
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

export default LimitedRooms;
