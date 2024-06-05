import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../interceptor";
import { useParams, useNavigate } from "react-router-dom";
import Branches from "./Branches";

export default function Branch() {
  const [branch, setBranch] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/hotels/${id}`);
        const data = res.data.data;
        setBranch(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const branchSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <>
      {branch ? (
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
              <button
                className="w-72 rounded-3xl bg-main-800 text-white px-4 py-2 text-center mt-5 hover:bg-main-400 hover:text-white"
                onClick={() => navigate("/bookingform")}
              >
                Book now
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full md:w-64 order-1 md:order-2 my-5">
              <img
                className="w-auto rounded-3xl"
                src={branch.images[1]}
                alt="View Accommodations"
              />
            </div>
            <div className="flex-1 w-full md:w-32 flex flex-col items-center justify-center order-2 md:order-1">
              <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold">
                Sleep with us
              </h1>
              <p className="text-start m-10 text-xl playfair-display text-main-800 font-medium">
                The rooms in our hotel are meticulously designed to offer a
                sanctuary of comfort and relaxation. Each room boasts plush
                bedding with high-thread-count linens, ensuring a restful
                night’s sleep. The ambient lighting, coupled with carefully
                selected décor, creates a soothing atmosphere perfect for
                unwinding after a long day.
                <br />
                <address>{branch.address_en}</address>
                {branch.phoneNumber[0]}
              </p>

              <button
                className="w-72 rounded-3xl px-4 py-2 bg-main-800 text-white text-center mt-5 hover:bg-main-400 hover:text-white"
                onClick={() => navigate("/rooms")}
              >
                View Accommodations
              </button>
            </div>
          </div>

          <div className="mt-10 mx-8">
            <Slider {...sliderSettings}>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider1.png"
                  alt="Slider 1"
                />
              </div>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider2.png"
                  alt="Slider 2"
                />
              </div>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider3.png"
                  alt="Slider 3"
                />
              </div>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider4.png"
                  alt="Slider 4"
                />
              </div>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider5.png"
                  alt="Slider 5"
                />
              </div>
              <div>
                <img
                  className="w-auto"
                  src="/assets/slider6.png"
                  alt="Slider 6"
                />
              </div>
            </Slider>
          </div>

          <div>
            <h1 className="text-center mt-52 text-5xl playfair-display text-main-800 font-semibold">
              Check out our other branches
            </h1>
            <Branches />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}