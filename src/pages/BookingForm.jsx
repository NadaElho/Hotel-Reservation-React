import DateRangePickerComponent from "../components/DateRangePicker";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ReservationCard from "../components/ReservationCard";
import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";
import { LanguageContext } from "../providers/LanguageContext";
import { Formik } from "formik";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import calculateTotalPrice from "../utils/calcTotalPrice";

function BookingForm() {
  const storedCheckIn = localStorage.getItem("checkin");
  const storedCheckOut = localStorage.getItem("checkout");
  const isArabic = localStorage.getItem("lang") == "ar";
  const [payment, setPayment] = useState("cash");
  const [selectedDates, setSelectedDates] = useState([
    storedCheckIn ? new Date(storedCheckIn) : new Date(),
    storedCheckOut
      ? new Date(storedCheckOut)
      : new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [userData, setUserData] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const { id } = useParams();
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate("reservations");
  const formRef = useRef();
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

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  async function reserve() {
    try {
      await axiosInstance.post("/reservations", {
        userId: localStorage.getItem("userId"),
        roomId: roomData._id,
        checkIn: selectedDates[0],
        checkOut: selectedDates[1],
        status: "663a8186e3427acea0ef0b56",
      });
      if (payment == "stripe") {
        const { data } = await axiosInstance.get(
          `/reservations/${localStorage.getItem("userId")}`
        );
        const reversedData = data.data.reverse()
        for (const reservation of reversedData) {
          if (reservation.status.name_en === "pending") {
            try {
              localStorage.setItem("reservationId", reservation._id);
              const { data } = await axiosInstance.post(`/reservations/${reservation._id}/payment`);
              window.location.href = data.session.url;
              break;
            } catch (err) {
              toast.error(err.response.data.message);
            }
          }
        }
      } else {
        toast.success(t("booking.room-reserved-successfully"));
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`/rooms/${id}`);
      setRoomData(data.room);
      const res = await axiosInstance.get(`/rooms/${id}/roomReserved`);
      setDisabledDates(res.data.data);
    })();

    (async function () {
      const { data } = await axiosInstance.get(
        `/users/${localStorage.getItem("userId")}`
      );
      setUserData(data.data);
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

  const validate = (values) => {
    const errors = {};
    if (!values.fname) {
      errors.fname = t("form.fname-req");
    }
    if (!values.lname) {
      errors.lname = t("form.lname-req");
    }
    if (!values.email) {
      errors.email = t("form.email-req");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.phone = t("form.invalid-phone");
    }
    if (!values.phone) {
      errors.phone = t("form.phone-req");
    } else if (!/^\d{11}$/i.test(values.phone)) {
      errors.phone = t("form.invalid-phone");
    }

    return errors;
  };

  const reserveNow = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const onSubmit = async (
    { fname, lname, phone, email },
    { setSubmitting }
  ) => {
    try {
      await axiosInstance.patch(
        `/users/${localStorage.getItem("userId")}`,
        {
          firstName: fname,
          lastName: lname,
          phoneNumber: phone,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      reserve();
    } catch (err) {
      console.log(err);
    }
    setSubmitting(false);
  };

  const isDark = localStorage.getItem("dark") == "dark";

  const [disabled, setDisabled] = useState({
    fName: true,
    lName: true,
    phone: true,
  });

  const toggleDisable = (property) => {
    setDisabled((prev) => ({ ...prev, [property]: !prev[property] }));
  };

  return (
    <div className="container mx-auto mt-8 ">
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h2 className="text-3xl text-main-800 dark:text-main-50 font-bold">
            {t("booking.request-book")}
          </h2>
          <h2 className="text-2xl text-main-800 dark:text-main-50 py-5 font-medium">
            {t("booking.details")}
          </h2>
          {userData && (
            <Formik
              innerRef={formRef}
              initialValues={{
                email: userData.email,
                fname: userData.firstName,
                lname: userData.lastName,
                phone: userData.phoneNumber,
              }}
              validate={validate}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className="text-white">
                  <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
                    <div className="w-full md:w-1/2 my-2">
                      <label
                        htmlFor="fname"
                        className="text-main-800 dark:text-main-25 text-base mb-2"
                      >
                        {t("form.fname")}
                      </label>
                      <div className="flex items-center gap-2 rounded-full border text-main-800 dark:text-main-25  bg-transparent border-main-300 dark:border-main-250 p-2">
                        <FaRegUser color={`${isDark ? "white" : "#1D1D1D"}`} />
                        <input
                          type="text"
                          name="fname"
                          placeholder={t("form.fname")}
                          className="border-0 outline-none placeholder:text-main-500 dark:placeholder:text-main-1000 w-full"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fname}
                          disabled={disabled.fName}
                        />
                        <MdOutlineEdit
                          size={25}
                          onClick={() => toggleDisable("fName")}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="text-red-500 text-sm ms-2">
                        {touched.fname && errors.fname}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 my-2">
                      <label
                        htmlFor="lname"
                        className="text-main-800 dark:text-main-25 text-base mb-2"
                      >
                        {t("form.lname")}
                      </label>
                      <div className="flex items-center gap-2 rounded-full border text-main-800 dark:text-main-25  bg-transparent border-main-300 dark:border-main-250 p-2">
                        <FaRegUser color={`${isDark ? "white" : "#1D1D1D"}`} />
                        <input
                          type="text"
                          name="lname"
                          placeholder={t("form.lname")}
                          className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lname}
                          disabled={disabled.lName}
                        />
                        <MdOutlineEdit
                          size={25}
                          onClick={() => toggleDisable("lName")}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="text-red-500 text-sm ms-2">
                        {touched.lname && errors.lname}
                      </div>
                    </div>
                  </div>
                  <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white me-2">
                    <div className="w-full md:w-1/2 my-2">
                      <label
                        htmlFor="email"
                        className="text-main-800 dark:text-main-25 text-base mb-2"
                      >
                        {t("form.email")}
                      </label>
                      <div className="flex items-center gap-2 rounded-full border text-main-800 dark:text-main-25  bg-transparent border-main-300 dark:border-main-250 p-2">
                        <AiOutlineMail
                          color={`${isDark ? "white" : "#1D1D1D"}`}
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder={t("form.email")}
                          className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          disabled
                        />
                      </div>
                      <div className="text-red-500 text-sm ms-2">
                        {touched.email && errors.email}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 my-2">
                      <label
                        htmlFor="phone"
                        className="text-main-800 dark:text-main-25 text-base mb-2"
                      >
                        {t("form.phone")}
                      </label>
                      <div className="flex items-center gap-2 rounded-full border text-main-800 dark:text-main-25  bg-transparent border-main-300 dark:border-main-250 p-2">
                        <MdOutlinePhone
                          color={`${isDark ? "white" : "#1D1D1D"}`}
                        />
                        <input
                          type="text"
                          name="phone"
                          placeholder={t("form.phone")}
                          className="border-0 outline-none placeholder:text-slate-200 dark:placeholder:text-main-1000 w-full"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          disabled={disabled.phone}
                        />
                        <MdOutlineEdit
                          size={25}
                          onClick={() => toggleDisable("phone")}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="text-red-500 text-sm ms-2">
                        {touched.phone && errors.phone}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
          <h2 className="text-2xl text-main-800 dark:text-main-50 py-5 font-medium">
            {t("booking.trip")}
          </h2>
          <div className="flex w-[140px] md:w-[400px] justify-between flex-col md:flex-row">
            <div className="flex flex-col justify-between relative">
              <button
                className="text-white bg-main-100 dark:text-main-1000 dark:font-bold dark:bg-main-600 px-4 py-2 my-2 w-[140px] rounded-3xl flex items-center justify-between"
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
                  from="form"
                />
              )}
            </div>
            <div className="flex justify-between gap-0 md:gap-4 flex-col md:flex-row">
              <div className=" flex md:flex-col justify-between items-center text-main-100 dark:text-main-150">
                <span>{t("booking.start")}</span>
                <div className="py-2 ">
                  {selectedDates[0]?.toLocaleDateString(
                    isArabic ? "ar-EG" : "en-US",
                    options
                  )}
                </div>
              </div>
              <div className=" flex md:flex-col justify-between items-center text-main-100 dark:text-main-150">
                <span>{t("booking.end")}</span>
                <span className="py-2">
                  {selectedDates[1]?.toLocaleDateString(
                    isArabic ? "ar-EG" : "en-US",
                    options
                  )}
                </span>
              </div>
            </div>
          </div>
          <h2 className="text-2xl text-main-800 dark:text-main-50 pb-3 pt-6 font-bold">
            {t("booking.choose-pay")}
          </h2>
          <div>
            <div className="border border-main-100 my-4 rounded-2xl max-w-[300px]">
              <div className="flex justify-between border-main-100 border-b-2 p-2">
                <div className="text-main-400 dark:text-main-150">
                  {t("booking.pay")} {roomData.currency}
                  {calcNoOfNights * priceAfterDiscount} {t("booking.now")}
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
                <div className="text-main-400 dark:text-main-150">
                  {t("booking.pay-stripe")}
                </div>
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
            <h3 className="text-main-200 dark:text-main-50 font-bold text-xl pt-4 pb-2">
              {t("booking.policy")}
            </h3>
            {new Date(selectedDates[0]) >
            new Date(new Date().setDate(new Date().getDate() + 2)) ? (
              <p className="text-main-200 font-bold py-3">
                <span className="text-main-800 dark:text-main-25 font-bold">
                  {t("booking.free-cancel")} &nbsp;
                  {new Date(
                    new Date(selectedDates[0]).setDate(
                      new Date(selectedDates[0]).getDate() - 2
                    )
                  ).toLocaleDateString(isArabic ? "ar-EG" : "en-US", options)}
                </span>
                . {t("booking.before")} &nbsp;
                {new Date(
                  new Date(selectedDates[0]).setDate(
                    new Date(selectedDates[0]).getDate() - 1
                  )
                ).toLocaleDateString(isArabic ? "ar-EG" : "en-US", options)}
                {t("booking.refund")}
              </p>
            ) : (
              <p className="text-main-200 dark:text-main-150 py-3">
                {t("booking.cancel-not-allowed")}
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
              reserve={reserveNow}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default BookingForm;
