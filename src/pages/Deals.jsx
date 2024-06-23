import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
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
import Card from "../components/Card";

const Deals = () => {
  const [rooms, setRooms] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      const data = res.data.data;
      setRooms(data);

      const subData = await axiosInstance.get("/subscriptions");
      setSubscription(subData.data.data)
    }
    fetchData();
  }, []);

  const shuffleRoom = rooms.sort(() => Math.random() - 0.5);
  const limitedRooms = shuffleRoom.slice(0, 9);

  return (
    <div className="container mx-auto mt-20 px-4  overflow-hidden">
      <h2 className="text-primary text-2xl font-secondary  mb-10 mx-2 sm:mx-10 sm:text-4xl dark:text-PrimaryDark  ">
        {t("rooms.deals")}
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
            <Card room={room}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Deals;