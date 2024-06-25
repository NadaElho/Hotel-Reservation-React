import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import Card from "../components/Card";

const Deals = () => {
  const [rooms, setRooms] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const { t } = useContext(LanguageContext);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/rooms");
      const data = res.data.data;
      setRooms(data);

      const subData = await axiosInstance.get("/subscriptions");
      setSubscription(subData.data.data);
    }
    fetchData();
    if (userId) {
      (async function () {
        const { data } = await axiosInstance.get(`/users/${userId}`);
        setUserData(data.data);
        console.log(data.data);
      })();
    }
  }, [userId]);

  const roomDeals = rooms.filter(
    (room) =>
      room.promotionId.length > 0 || (userData && userData.subscriptionId)
  );
  console.log(roomDeals);
  return (
    <div className="container mx-auto mt-20 px-4  overflow-hidden">
      <h2 className="text-primary text-2xl font-secondary  mb-10 mx-2 sm:mx-10 sm:text-4xl dark:text-PrimaryDark  ">
        {t("rooms.deals")}
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 80,
          },

          1200: {
            slidesPerView: 3, 
            spaceBetween: 100
          },
          1240 : {
            slidesPerView: 3, 
            spaceBetween: 40
          }

     
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {roomDeals.map((room) => (
          <SwiperSlide key={room._id}>
            <Card room={room} userData={userData} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Deals;
