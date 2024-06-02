import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Branches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/api/v1/hotels");
      const data = res.data.data;
      setBranches(data);
    }
    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    className: "center",
    centerPadding: "100px",
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      <div className=" mx-20  flex justify-between mt-36 ">
        <h2 className="text-primary text-4xl font-secondary uppercase font-bold">
          Discover our Branches
        </h2>
        <p className="w-64 py-1 text-primary font-custom font-semibold">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <div className="container mx-auto mt-8">
        <Slider {...settings}>
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="relative rounded-t-full rounded-3xl cursor-pointer overflow-hidden mx-2 h-[480px] md:max-w-80 sm:max-w-full sm:mx-10  "
            >
              <img
                src={branch.images[1]}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 w-full text-white">
                <p className="font-400 text-3xl font-secondary">{branch.name_en}</p>
                <p className="opacity-80">{branch.address_en}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Branches;
