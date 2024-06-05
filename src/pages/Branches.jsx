import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mx-4 md:mx-10 lg:mx-20 flex flex-col lg:flex-row justify-between mt-16 md:mt-24 lg:mt-36 space-y-6 lg:space-y-0">
        <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl font-secondary uppercase font-bold">
          Discover our Branches
        </h2>
        <p className="w-full lg:w-64 py-1 text-primary font-custom font-semibold">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <div className="container mx-auto mt-8">
        <Slider {...settings}>
          {branches.map((branch) => (
            <Link
              key={branch.id}
              to={`branch/${branch._id}`}
              className="relative rounded-t-full rounded-3xl cursor-pointer overflow-hidden mx-2 h-[480px] md:max-w-80 sm:max-w-full sm:mx-10"
            >
              <img
                src={branch.images[2]}
                alt={branch.name_en}
                className="h-full w-auto object-cover"
              />
              <div className="absolute bottom-6 left-6 w-full text-white">
                <p className="font-400 text-3xl font-secondary">
                  {branch.name_en}
                </p>
                <p className="opacity-80">{branch.address_en}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Branches;
