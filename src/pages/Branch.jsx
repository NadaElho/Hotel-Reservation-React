import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Branch() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="container flex-1 md:w-64 w-full">
          <img
            className="w-full md:w-auto"
            src="./public/assets/aboutbranch.png"
            alt="About Branch"
          />
        </div>
        <div className="container flex-1 md:w-32 w-full flex flex-col items-center justify-center">
          <h1 className="text-center mt-10 text-5xl md:text-5xl playfair-display text-main-800 font-semibold">
            About Cairo Branch
          </h1>
          <p className="text-start m-5 md:m-10 text-lg md:text-xl playfair-display text-main-800 font-medium">
            A charming retreat nestled in the heart of Zamalek, Cairo's vibrant
            island neighbourhood. Our hotel offers a fusion of modern comforts
            and traditional elegance, providing guests with a memorable stay in
            this bustling metropolis.
          </p>
          <p className="text-start m-5 md:m-10 text-lg md:text-xl playfair-display text-main-800 font-medium">
            Step into our tranquil oasis and experience impeccable hospitality
            from the moment you arrive. Whether you're visiting for business or
            leisure, our dedicated staff is committed to ensuring your every
            need is met, from personalized service to thoughtful amenities.
          </p>
          <a className="btn btn-wide rounded-3xl bg-main-800 text-white text-center mt-5 hover:bg-main-400 hover:text-white">
            Book now
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="container flex-1 w-full md:w-64 order-1 md:order-2">
          <img
            className="w-auto"
            src="./public/assets/view-accomodations.png"
            alt="About Branch"
          />
        </div>
        <div className="container flex-1 w-full md:w-32 flex flex-col items-center justify-center order-2 md:order-1">
          <h1 className="text-center mt-10 text-5xl playfair-display text-main-800 font-semibold">
            Sleep with us
          </h1>
          <p className="text-start m-10 text-xl playfair-display text-main-800 font-medium">
            Welcome to our Rooms at [Hotel Name] in Zamalek, Cairo. Each of our
            thoughtfully designed accommodations offers a perfect blend of
            comfort, style, and convenience to ensure a memorable stay for every
            guest.
          </p>
          <p className="text-start m-10 text-xl playfair-display text-main-800 font-medium">
            Welcome to our Rooms at [Hotel Name] in Zamalek, Cairo. Each of our
            thoughtfully designed accommodations offers a perfect blend of
            comfort, style, and convenience to ensure a memorable stay for every
            guest.
          </p>
          <a className="btn btn-wide rounded-3xl bg-main-800 text-white text-center mt-5 hover:bg-main-400 hover:text-white">
            View Accommodations
          </a>
        </div>
      </div>

      <div className="mt-10">
        <Slider {...settings}>
          <div>
            <img src="./public/assets/slider1.png"></img>
          </div>
          <div>
            <img src="./public/assets/slider2.png"></img>
          </div>
          <div>
            <img src="./public/assets/slider3.png"></img>
          </div>
          <div>
            <img src="./public/assets/slider4.png"></img>
          </div>
          <div>
            <img src="./public/assets/slider5.png"></img>
          </div>
          <div>
            <img src="./public/assets/slider6.png"></img>
          </div>
        </Slider>
      </div>
      <div>
        <h1 className="text-center mt-52 text-5xl playfair-display text-main-800 font-semibold">
          Check out our other branches
        </h1>
        <div className="container mx-auto  ">
          <Slider {...setting}>
            <div className="w-96 h-full mx-10 mt-10 ">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img1.png"
              />
            </div>
            {/*  */}
            <div className="w-96 h-full mx-10 mt-40">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img2.png"
              />
            </div>
            {/*  */}
            <div className="w-96 h-full mx-10 mt-10">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img3.png"
              />
            </div>
            {/*  */}
            <div className="w-96 h-full mx-10 mt-40">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img4.png"
              />
            </div>
            {/*  */}
            <div className="w-96 h-full mx-10 mt-10">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img5.png"
              />
            </div>
            {/*  */}
            <div className="w-96 h-full mx-10 mt-40">
              <img
                className="h-full w-80 object-cover"
                src="/assets/img6.png"
              />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
