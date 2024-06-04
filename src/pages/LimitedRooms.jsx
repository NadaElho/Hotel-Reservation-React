import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
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

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 5000,
    RxMargin: "10px",
    autoplaySpeed: 1500,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <h2 className="text-primary text-4xl font-secondary uppercase mx-10">
        Check out our rooms
      </h2>
      <Slider {...settings}>
        {limitedRooms.map((room) => (
          <div
            key={room._id}
            className="relative  md:max-w-96 sm:max-w-full  h-64 rounded-3xl overflow-hidden mx-2 mt-10 "
          >
            <img
              className="h-full w-full object-cover"
              src={room.images}
              alt="Room"
            />
            <div className="absolute bottom-0 left-0 flex  items-center ">
              <div className="p-3 w-48 bg-secondary rounded  ">
                <p className="text-white ">{room.roomTypeId.type_en}</p>
                <div className=" flex text-xs space-x-2">
                  <span className="text-primary">${room.price}</span>
                  <a className="text-primary mt-0.5 ">
                    <AiOutlineExclamationCircle />
                  </a>
                  <span className="text-primary font-semibold ">Per night</span>
                </div>
                <p className="text-primary font-semibold">
                  Includes taxes & fees
                </p>
              </div>
              {/*  */}
              <div className=" mx-8 mt-4">
                <Link to="/reservation-room/:id">
                  <button className="bg-primary text-white py-2 w-36  rounded">
                    Reserve Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LimitedRooms;
