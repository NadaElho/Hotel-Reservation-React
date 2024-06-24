import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DateRangePickerComponent from "./DateRangePicker";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";
import ReactStars from "react-rating-stars-component";
import calculateTotalPrice from "../utils/calcTotalPrice";

const RoomCard = ({ disabledDates, roomData }) => {
  const storedCheckIn = localStorage.getItem("checkin");
  const storedCheckOut = localStorage.getItem("checkout");
  const [selectedDates, setSelectedDates] = useState([
    storedCheckIn ? new Date(storedCheckIn) : new Date(),
    storedCheckOut
      ? new Date(storedCheckOut)
      : new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const differenceBetweenDays =
    new Date(selectedDates[1]).getTime() - new Date(selectedDates[0]).getTime();
  const calcNoOfNights = Math.round(differenceBetweenDays) / (1000 * 3600 * 24);
  const calcTotalPrice = calcNoOfNights * roomData.price;
  const [showCalendar, setShowCalendar] = useState(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  useEffect(() => {
    const fetchDataAndCalculatePrice = async () => {
      try {
        const price = await calculateTotalPrice(roomData, 1);
        setPriceAfterDiscount(price);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAndCalculatePrice();
  }, [roomData]);

  const { t } = useContext(LanguageContext);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  const isArabic = localStorage.getItem("lang") == "ar";

  const handleDate = (checkIn, checkOut) => {
    setSelectedDates(checkIn, checkOut);
  };

  const toggleHandler = () => {
    setShowCalendar((show) => (show = !show));
  };

  return (
    <div className="p-4 w-100 md:max-w-[400px] border rounded-2xl border-main-800 mx-4 md:mx-0 dark:border-main-25">
      <h3 className="text-main-800 font-bold ml-2 text-xl dark:text-main-50">
        {t("booking.price-details")}
      </h3>
      <h4
        className={`text-sm text-main-400 dark:text-main-150 ml-2 ${
          priceAfterDiscount != roomData.price ? "line-through decoration-red-700" : ""
        }`}
      >
        ${roomData.price} {t("booking.per-night")}
      </h4>
      {priceAfterDiscount != roomData.price && (
        <h4 className={`text-sm text-main-400 dark:text-main-150 ml-2`}>
          ${priceAfterDiscount} {t("booking.per-night")}
        </h4>
      )}
      <div className="flex w-[140px] md:w-[350px] justify-between flex-col md:flex-row my-2">
        <div className="flex flex-col justify-between relative">
          <button
            className="text-white bg-main-100 dark:bg-main-600 dark:text-main-1000 dark:font-bold px-4 py-2 my-2 w-[140px] rounded-3xl flex items-center justify-between"
            onClick={toggleHandler}
          >
            <span>{t("booking.check-date")}</span>
            {showCalendar ? (
              <IoMdArrowDropup className="ml-2" />
            ) : (
              <IoMdArrowDropdown className="ml-2" />
            )}
          </button>
          {showCalendar && (
            <DateRangePickerComponent
              handleDate={handleDate}
              selectedDates={selectedDates}
              disabledDates={disabledDates}
              from="room"
            />
          )}
        </div>
        <div className="flex justify-between gap-0 md:gap-4 flex-col md:flex-row">
          <div className="flex md:flex-col justify-between items-center text-main-100 dark:text-main-10 text-sm">
            <span>{t("booking.start")}</span>
            <div className="py-2 dark:text-main-150">
              {selectedDates[0]?.toLocaleDateString(
                isArabic ? "ar-EG" : "en-US",
                options
              )}
            </div>
          </div>
          <div className="flex md:flex-col justify-between items-center text-main-100 dark:text-main-10 text-sm">
            <span>{t("booking.end")}</span>
            <span className="py-2 dark:text-main-150">
              {selectedDates[1]?.toLocaleDateString(
                isArabic ? "ar-EG" : "en-US",
                options
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6" dir="ltr">
        <ReactStars
          value={roomData.ratingAvg}
          edit={false}
          size={24}
          isHalf={true}
          color="#e4e5e9"
        />
      </div>
      <div className="text-center text-main-300 dark:text-main-50">
        {t("booking.stay")}
        <span className="text-white bg-main-300 dark:bg-main-600 dark:text-main-1000 dark:font-bold px-2 py-1 mx-2 rounded">
          {calcNoOfNights}
        </span>
        {t("booking.nights")}
      </div>
      <div className="text-main-800 my-4 text-center font-bold text-xl dark:text-main-25">
        <div>{t("booking.total")}</div>
        <div
          className={priceAfterDiscount != roomData.price ? "line-through decoration-red-700" : ""}
        >
          ${calcTotalPrice}
        </div>
        {priceAfterDiscount != calcTotalPrice && (
          <div>${priceAfterDiscount * calcNoOfNights}</div>
        )}
      </div>
      <Link
        to={`/reservation-room/${roomData._id}`}
        className="rounded-3xl bg-main-800 dark:bg-main-25 dark:text-main-1000 dark:font-bold block text-center mt-8 py-2 px-4 text-white w-full"
      >
        {t("booking.book-now")}
      </Link>
    </div>
  );
};

export default RoomCard;
