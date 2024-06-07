import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DateRangePickerComponent from "./DateRangePicker";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const handleDate = (checkIn, checkOut) => {
    setSelectedDates(checkIn, checkOut);
  };

  const toggleHandler = () => {
    setShowCalendar((show) => (show = !show));
  };
  return (
    <div className="p-4 w-full md:max-w-[500px] border rounded-2xl border-main-800">
      <h3 className="text-main-800 font-bold ml-2 text-lg">Price details</h3>
      <h4 className="text-sm text-main-400 ml-2">
        ${roomData.price} per night
      </h4>
      <div className="flex w-[140px] md:w-[400px] justify-between flex-col md:flex-row my-2">
        <div className="flex flex-col justify-between relative">
          <button
            className="text-white bg-main-100 px-4 py-2 my-2 w-[140px] rounded-3xl flex items-center justify-between"
            onClick={toggleHandler}
          >
            <span>Check date</span>
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
          <div className="flex md:flex-col justify-between items-center text-main-100 text-sm">
            <span>Start</span>
            <div className="py-2 ">
              {selectedDates[0]?.toString().substring(0, 11)}
            </div>
          </div>
          <div className="flex md:flex-col justify-between items-center text-main-100 text-sm">
            <span>End</span>
            <span className="py-2">
              {selectedDates[1]?.toString().substring(0, 11)}
            </span>
          </div>
        </div>
      </div>
      <div className="text-center text-main-300 mt-8">
        Your stay will be
        <span className="text-white bg-main-300 px-2 py-1 mx-2 rounded">
          {calcNoOfNights}
        </span>
        nights
      </div>
      <div className="text-main-800 my-4 text-center font-bold text-lg">
        <div>Total</div>
        <div>${calcTotalPrice}</div>
      </div>
      <Link
        to={`/reservation-room/${roomData._id}`}
        className="rounded-3xl bg-main-800 block text-center mt-8 py-2 px-4 text-white w-full"
      >
        Book now
      </Link>
    </div>
  );
};

export default RoomCard;
