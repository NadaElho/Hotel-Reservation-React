import axiosInstance from "../../interceptor";
import { useEffect, useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1279, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1023, min: 640 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 639, min: 0 },
      items: 1
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <h2 className="text-primary text-2xl font-secondary uppercase mb-10 mx-2 sm:mx-10 sm:text-4xl  ">
        Explore stays in our branches
      </h2>
      <Carousel
        responsive={responsive}
        containerClass="carousel-container"
        infinite={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
      >
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="relative rounded-3xl overflow-hidden h-64  mx-2"
          >
            <img
              className="h-full w-full object-cover"
              src={hotel.images[0]}
              alt="Hotel"
            />
            <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-secondary rounded-t-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-primary font-bold">
                    {hotel.name_en} branch
                  </p>
                  <span className="text-primary">{hotel.address_en}</span>
                </div>
                <div>
                  <Link to={`branch/${hotel._id}`}>
                    <button className="bg-primary text-white py-2 px-6 rounded-full">
                      Check out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hotel;
