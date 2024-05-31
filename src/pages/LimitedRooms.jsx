import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const LimitedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/api/v1/rooms");
      const data = res.data.data;
      console.log(data);
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
    // speed: 2500,
    // autoplaySpeed: 500,
    // cssEase: "linear",
    // pauseOnHover: true,
  };
  return (
    <>
    <div className=" container mx-auto mt-20 ">
    <h2 className="text-primary text-4xl font-secondary uppercase mx-10 ">Check out our room</h2>
       <Slider {...settings}>
        {limitedRooms.map((room) => (
          
          <div
            key={room._id}
            className="relative max-w-xs h-1/5	 rounded-2xl overflow-hidden h-64 mx-10 mt-10 "
            
          >
            <img
              key={room._id}
              className="h-full w-full object-cover"
              // src={room.images}
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
              alt="Sunset in the mountains"
            ></img>
            <div className="absolute bottom-0 left-0 flex items-center ">
              <div className="p-3 bg-secondary rounded ">
                <p className="text-white">{room.roomTypeId.type_en}</p>
                <div className=" flex text-xs  space-x-2">
                <span className="text-primary">${room.price}</span>
                <a className="text-primary mt-0.5 " ><AiOutlineExclamationCircle /></a>
                <span className="text-primary font-semibold ">Per night</span>
                </div>
                <p className="text-primary font-semibold">Includes taxes & fees</p>
              </div>
              <div className="mx-3 mt-3">
                <button className="bg-primary text-white py-1 px-3 rounded ">
                  Reserve Now
                </button>
              </div>
            </div>
          </div>

        ))}
      </Slider>

    </div>
   
    </>
  );
};

export default LimitedRooms;
