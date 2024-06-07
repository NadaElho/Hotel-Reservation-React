import DateRangePickerComponent from "../components/DateRangePicker";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ReservationCard from "../components/ReservationCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";

function BookingForm() {
  const [payment, setPayment] = useState("cash");
  const storedCheckIn = localStorage.getItem("checkin");
  const storedCheckOut = localStorage.getItem("checkout");
  const [selectedDates, setSelectedDates] = useState([
    storedCheckIn ? new Date(storedCheckIn) : new Date(),
    storedCheckOut
      ? new Date(storedCheckOut)
      : new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [roomData, setRoomData] = useState({});
  const { id } = useParams();
  const [disabledDates, setDisabledDates] = useState([]);
  const navigate = useNavigate("reservations");

  async function reserve() {
    try {
      await axiosInstance.post("/reservations", {
        userId: localStorage.getItem("userId"),
        roomId: roomData._id,
        checkIn: selectedDates[0],
        checkOut: selectedDates[1],
        status: "663a8186e3427acea0ef0b56",
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }

    if (payment == "stripe") {
      const { data } = await axiosInstance.get(
        `/reservations/${localStorage.getItem("userId")}`
      );
      data.data.forEach((reservation) => {
        if (reservation.status.name_en == "pending") {
          (async function () {
            localStorage.setItem("reservationId", reservation._id);
            try {
              const { data } = await axiosInstance.post(
                `/reservations/${reservation._id}/payment`
              );
              window.location.href = data.session.url;
            } catch (err) {
              toast.error(err.response.data.message);
            }
          })();
        }
      });
    } else {
      toast.success("Room reserved successfully")
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`/rooms/${id}`);
      setRoomData(data.room);
      const res = await axiosInstance.get(`/rooms/${id}/roomReserved`);
      setDisabledDates(res.data.data);
    })();
  }, [id]);

  const differenceBetweenDays =
    new Date(selectedDates[1]).getTime() - new Date(selectedDates[0]).getTime();
  const calcNoOfNights = Math.round(differenceBetweenDays) / (1000 * 3600 * 24);
  const calcTotalPrice = calcNoOfNights * roomData.price;

  const handleDate = (checkIn, checkOut) => {
    setSelectedDates(checkIn, checkOut);
  };

  const toggleHandler = () => {
    setShowCalendar((show) => (show = !show));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h2 className="text-3xl text-main-800 font-bold">Request to book</h2>
          <h2 className="text-2xl text-main-800 py-5 font-medium">Your trip</h2>
          <div className="flex w-[140px] md:w-[400px] justify-between flex-col md:flex-row">
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
                  from="form"
                />
              )}
            </div>
            <div className="flex justify-between gap-0 md:gap-4 flex-col md:flex-row">
              <div className=" flex md:flex-col justify-between items-center text-main-100 ">
                <span>Start</span>
                <div className="py-2 ">
                  {selectedDates[0]?.toString().substring(0, 11)}
                </div>
              </div>
              <div className=" flex md:flex-col justify-between items-center text-main-100">
                <span>End</span>
                <span className="py-2">
                  {selectedDates[1]?.toString().substring(0, 11)}
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl text-main-800 pb-3 pt-6 font-bold">
            Choose to pay
          </h2>
          <div>
            <div className="border border-main-100 my-4 rounded-2xl max-w-[300px]">
              <div className="flex justify-between border-main-100 border-b-2 p-2">
                <div className="text-main-400">
                  Pay {roomData.currency}
                  {calcTotalPrice} now
                </div>
                <input
                  type="radio"
                  className="radio accent-main-200"
                  value="cash"
                  name="pay"
                  id="pay"
                  checked={payment == "cash" ? true : false}
                  onChange={(e) => setPayment(e.target.value)}
                />
              </div>
              <div className="flex justify-between p-2">
                <div className="text-main-400">Pay with stripe</div>
                <input
                  type="radio"
                  className="radio accent-main-200"
                  name="pay"
                  id="pay"
                  value="stripe"
                  checked={payment == "stripe" ? true : false}
                  onChange={(e) => setPayment(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-main-200 font-bold text-xl pt-4 pb-2">
              Cancellation policy
            </h3>
            {new Date(selectedDates[0]) >
            new Date(new Date().setDate(new Date().getDate() + 2)) ? (
              <p className="text-main-200 font-bold py-3">
                <span className="text-main-800 font-bold">
                  Free cancellation before &nbsp;
                  {new Date(
                    new Date(selectedDates[0]).setDate(
                      new Date(selectedDates[0]).getDate() - 2
                    )
                  )
                    .toString()
                    .substring(0, 11)}
                </span>
                . Cancel before check-in on &nbsp;
                {new Date(
                  new Date(selectedDates[0]).setDate(
                    new Date(selectedDates[0]).getDate() - 1
                  )
                )
                  .toString()
                  .substring(0, 11)}
                for a partial refund
              </p>
            ) : (
              <p className="text-main-200 py-3">
                Cancellation today became not allowed
              </p>
            )}
          </div>
        </div>
        <div>
          {roomData._id && (
            <ReservationCard
              roomData={roomData}
              calcNoOfNights={calcNoOfNights}
              calcTotalPrice={calcTotalPrice}
              reserve={reserve}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default BookingForm;
