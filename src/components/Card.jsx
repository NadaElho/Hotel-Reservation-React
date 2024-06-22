import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";
import ReactStars from "react-rating-stars-component";

const Card = ({ room }) => {
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";

  return (
    <>
      <div className="relative w-[320px] h-64 rounded-3xl overflow-hidden mt-10 ">
        <img
          className="h-full w-full object-cover"
          src={room.images}
          alt="Room"
        />
        <div className="absolute top-2 px-2 w-full flex justify-between">
          {room.promotionId.map((promotion) => (
            <div
              className="bg-[#C2AF00] text-white px-2 py-1 rounded-full mt-2"
              key={promotion._id}
            >
              <p>{promotion.percentage}% off</p>
            </div>
          ))}
          <div className="absolute top-2 right-2 w-8 h-8 bg-white  flex justify-center items-center rounded-full ">
            <span className="text-red-900 text-3xl text-center cursor-pointer ">
              <CiHeart />
            </span>
          </div>
        </div>
        <div className=" absolute bottom-0 left-0 flex  items-center ">
          <div className="p-3 w-40 bg-secondary rounded dark:bg-[#7C6555]  ">
            <p className="text-white font-semibold text-sm">
              {`${
                room.hotelId.name_ar && isArabic
                  ? room.hotelId.name_ar
                  : room.hotelId.name_en
              } branch`}
            </p>
            <p className="text-white text-sm">
              {room.roomTypeId && room.roomTypeId.type_en}
            </p>
            <ReactStars value={room.ratingAvg} edit={false} color="#ffffff" />
            <div className=" flex text-xs space-x-2">
              <span className="text-primary dark:text-[#ffffff]">
                ${room.price}
              </span>
              <a className="text-primary mt-0.5 dark:text-[#ffffff]">
                <AiOutlineExclamationCircle />
              </a>
              <span className="text-primary dark:text-[#ffffff]">
                {t("rooms.Per-night")}
              </span>
            </div>
            <p className="text-primary font-500 text-xs font-semibold dark:text-[#ffffff]">
              {t("rooms.taxes-fees")}
            </p>
          </div>
          <div className=" mx-6 mt-16">
            <Link to={`reservation-room/${room._id}`}>
              <button className="bg-primary text-white text-xs py-1 w-32  rounded-full dark:bg-[#E2C8AD] dark:text-customDark ">
                {t("rooms.Reserve-Now")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
