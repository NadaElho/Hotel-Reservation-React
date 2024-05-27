import DateRangePickerComponent from "../components/DateRangePicker";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ReservationCard from "../components/ReservationCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";

function BookingForm() {
  const [payment, setPayment] = useState("cash");
  const [selectedDates, setSelectedDates] = useState([
    new Date(localStorage.getItem("checkin")) || new Date(),
    new Date(localStorage.getItem("checkout")) ||
      new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [roomData, setRoomData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate("reservations")

  async function reserve() {
    await axiosInstance.post("/reservations", {
      userId: localStorage.getItem("userId"),
      roomId: roomData._id,
      checkIn: selectedDates[0],
      checkOut: selectedDates[1],
      status: "663a8186e3427acea0ef0b56",
    });
    if(payment == "stripe"){
      let {data} = await axiosInstance.get(`/reservations/${localStorage.getItem("userId")}`)
      data.data.forEach((reservation)=>{
      console.log(reservation.status.name_en);
        if(reservation.status.name_en == "pending"){
         (async function(){
            let {data} = await axiosInstance.post(`/reservations/${reservation._id}/payment`)
            window.location.href= data.session.url
          })()
        }
      })
    }else{
      navigate("/")
    }
  }

  useEffect(() => {
    (async function () {
      let { data } = await axiosInstance.get(`/rooms/${id}`);
      setRoomData(data.room);
    })();
  }, []);

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
          <h2 className="text-2xl text-main-800 py-3 font-medium">Your trip</h2>
          <div className="flex w-[300px] justify-between">
            <div className="flex flex-col justify-between relative">
              <button
                className="text-white bg-main-100 px-4 py-2 my-2 rounded-full flex items-center justify-between"
                onClick={toggleHandler}
              >
                <span>Check-in date</span>
                {showCalendar ? (
                  <IoMdArrowDropup className="ml-2" />
                ) : (
                  <IoMdArrowDropdown className="ml-2" />
                )}
              </button>
              <button
                className="text-white bg-main-100 px-4 py-2 rounded-full flex items-center justify-between"
                onClick={toggleHandler}
              >
                Check-out date <IoMdArrowDropdown className="ml-2" />
              </button>
              {showCalendar && (
                <DateRangePickerComponent
                  handleDate={handleDate}
                  selectedDates={selectedDates}
                />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-main-100 py-2 my-2 w-[100px] flex justify-between items-center">
                {selectedDates[0]?.toString().substring(0, 11)}
              </div>
              <span className="text-main-100 py-2 w-[100px] flex justify-between items-center">
                {selectedDates[1]?.toString().substring(0, 11)}
              </span>
            </div>
          </div>
          <h2 className="text-2xl text-main-800 pb-3 pt-6 font-bold">
            Choose to pay
          </h2>
          <div>
            <div className="border border-main-100 my-4 rounded-2xl max-w-[300px]">
              <div className="flex justify-between border-main-100 border-b-2 p-2">
                <div className="text-main-400">
                  Pay {roomData.currency}{calcTotalPrice} now
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
