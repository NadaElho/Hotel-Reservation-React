import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Branches = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  
  };
  

  return (
    <>
      <div className=" mx-20  flex justify-between mt-36 ">
        <h2 className="text-primary text-4xl font-secondary uppercase font-bold">Discover our Branches</h2>
        <p className="w-64 py-1 text-primary font-custom font-semibold">
          Embark on an unforgettable journey. Experience our unique culture, and
          create lifetime memories. Your adventure starts here!
        </p>
      </div>
      <div className="container mx-auto  ">
        <Slider {...settings}>
          <div className="w-96 h-full mx-10 mt-10 ">
            <img className="h-full w-80 object-cover" src="/assets/img1.png" />
          </div>
          {/*  */}
          <div className="w-96 h-full mx-10 mt-40">
            <img className="h-full w-80 object-cover" src="/assets/img2.png" />
          </div>
          {/*  */}
          <div className="w-96 h-full mx-10 mt-10">
            <img className="h-full w-80 object-cover" src="/assets/img3.png" />
          </div>
          {/*  */}
          <div className="w-96 h-full mx-10 mt-40">
            <img className="h-full w-80 object-cover" src="/assets/img1.png" />
          </div>
          {/*  */}
          <div className="w-96 h-full mx-10 mt-10">
            <img className="h-full w-80 object-cover" src="/assets/img1.png" />
          </div>
          {/*  */}
          <div className="w-96 h-full mx-10 mt-40">
            <img className="h-full w-80 object-cover" src="/assets/img1.png" />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Branches;
