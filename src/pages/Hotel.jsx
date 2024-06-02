import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/api/v1/hotels");
      const data = res.data.data;
      console.log(data);
      setHotels(data);
    }
    fetchData();
  }, []);

  const settings = {
    centerMode: true,
    infinite: true,
    className: "center",
    centerPadding: "100px",
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false, 
          padding: "0", 
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <h2 className="text-primary text-4xl font-secondary uppercase mb-10 mx-2 sm:mx-10">
        Explore stays in our branches
      </h2>
      <Slider {...settings}>
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="relative rounded-3xl overflow-hidden h-64 mx-2 mt-10 md:max-w-80 sm:max-w-full ">
            <img
              className="h-full w-full object-cover"
              src={hotel.images}
              // src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww"
              alt="Sunset in the mountains"
            />
            <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-secondary rounded-t-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-primary font-bold">{hotel.name_en} branch</p>
                  <span className="text-primary">{hotel.address_en}</span>
                </div>
                <div>
                  <button className="bg-primary text-white py-2 px-6 rounded-full">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hotel;
