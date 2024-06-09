import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../interceptor";
import Branches from "./Branches";
import Loader from "../components/Loader";
import { LanguageContext } from "../providers/LanguageContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../src/index.css";

const Branch = () => {
  const { t } = useContext(LanguageContext);
  {
    t(
      "no-branch",
      "check-out",
      "About",
      "Branch",
      "Sleep-with-us",
      "accommodation-desc",
      "View-Accommodations"
    );
  }
  const [branch, setBranch] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/hotels/${id}`);
        const data = res.data.data;
        setBranch(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center p-8 overflow-hidden">
          <Loader />
        </div>
      ) : branch ? (
        <>
          <div className="flex flex-col md:flex-row my-5 container">
            <div className="flex-1 w-full md:w-64">
              <img
                className="w-full md:w-auto"
                src={branch.images[0]}
                alt="About Branch"
              />
            </div>
            <div className="flex-1 w-full md:w-32 flex flex-col items-center justify-center">
              <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold">
                About {branch.name_en} Branch
              </h1>
              <p className="text-start m-5 md:m-10 text-lg md:text-xl playfair-display text-main-800 font-medium">
                {branch.description_en}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full md:w-64 order-1 md:order-2 my-5">
              <img
                className="w-auto rounded-3xl"
                src={branch.images[1]}
                alt={t("branch.View-Accommodations")}
              />
            </div>
            <div className="flex-1 w-full md:w-32 flex flex-col items-center justify-center order-2 md:order-1">
              <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold">
                {t("branch.Sleep-with-us")}
              </h1>
              <p className="text-start m-10 text-xl playfair-display text-main-800 font-medium">
                {t("branch.accommodation-desc")}
                <br />
                <address>{branch.address_en}</address>
                {branch.phoneNumber[0]}
              </p>

              <button
                className="w-72 rounded-3xl px-4 py-2 bg-main-800 text-white text-center mt-5 hover:bg-main-400 hover:text-white"
                onClick={() => navigate("/rooms")}
              >
                {t("branch.View-Accommodations")}
              </button>
            </div>
          </div>

          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper mt-10"
          >
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider1.png"
                alt="Slider 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider2.png"
                alt="Slider 2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider3.png"
                alt="Slider 3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider4.png"
                alt="Slider 4"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider5.png"
                alt="Slider 5"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-auto"
                src="/assets/slider6.png"
                alt="Slider 6"
              />
            </SwiperSlide>
          </Swiper>

          <div>
            <h1 className="text-center mt-52 text-5xl playfair-display text-main-800 font-semibold">
              {t("branch.check-out")}
            </h1>
            <Branches />
          </div>
        </>
      ) : (
        <div className="text-center w-full mt-10">
          <p className="text-2xl text-primary text-center font-semibold">
            {t("branch.no-branch")}
          </p>
        </div>
      )}
    </>
  );
};

export default Branch;
