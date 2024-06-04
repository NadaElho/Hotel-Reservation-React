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
    dots: false,
    infinite: true,
    className: "center",
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    <>
      <div className="container mx-auto sm:flex justify-between mt-36 hidden">
        <h2 className="text-primary text-4xl font-secondary uppercase font-bold mx-10">
          Discover our Branches
        </h2>
        <p className="w-64 py-1 text-primary font-custom font-semibold">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <div className="container mx-auto mt-8 overflow-hidden">
        <Slider {...settings}>
          {branches.map((branch) => (
            <div key={branch.id} className="mx-2">
              <Link to={`branch/${branch._id}`}>
                <div className="relative rounded-t-full rounded-3xl cursor-pointer overflow-hidden h-[480px] md:max-w-80 sm:max-w-full">
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
        </Slider>
      </div>
    </>
  );
};

export default Branches;
