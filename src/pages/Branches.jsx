import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { Link } from "react-router-dom";

const Branches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/hotels");
      const data = res.data.data;
      setBranches(data);
    }
    fetchData();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 3
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
    <>
     <div className="container mx-auto flex flex-col lg:flex-row justify-between mt-36 hidden lg:flex">
        <h2 className="text-primary text-4xl font-secondary uppercase font-bold mx-10">
          Discover our Branches
        </h2>
        <p className="w-64 py-1 text-primary font-custom font-semibold mx-10">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <div className="container mx-auto mt-8">
        <Carousel
          responsive={responsive}
          containerClass="carousel-container"

          infinite={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
        >
          {branches.map((branch) => (
            <div key={branch.id} className="px-2">
              <Link to={`branch/${branch._id}`}>
                <div className="mx-10 lg:mx-10 relative rounded-t-full rounded-3xl cursor-pointer overflow-hidden h-[480px] md:h-[480px] w-[400px] md:w-[350px]">
                  <img
                    src={branch.images[1]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 w-full text-white">
                    <p className="font-400 text-3xl font-secondary">
                      {branch.name_en}
                    </p>
                    <p className="opacity-80">{branch.address_en}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Branches;
