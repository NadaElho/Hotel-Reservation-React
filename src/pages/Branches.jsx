// Branches.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../src/index.css";
import { FreeMode, Pagination } from "swiper/modules";

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

  return (
    <>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between mt-36 lg:flex">
        <h2 className="text-primary text-4xl font-secondary uppercase font-bold mx-10">
          Discover our Branches
        </h2>
        <p className="w-64 py-1 text-primary font-custom font-semibold mx-10">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper container mx-auto mt-8"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {branches.map((branch) => (
          <SwiperSlide key={branch._id}>
            <div className="px-2">
              <Link to={`/branch/${branch._id}`}>
                <div className="mx-10 lg:mx-10 relative rounded-t-full rounded-3xl cursor-pointer overflow-hidden h-[480px] md:h-[480px] w-[400px] md:w-[350px]">
                  <img
                    src={branch.images[2]}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Branches;
