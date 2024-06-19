import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoKeyOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";

function History() {
  const [userReservations, setUserReservations] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    getAllUserReservations();
  }, []);

  const nextSlider = (reservationIndex) => {
    setUserReservations((prev) => {
      const newReservations = [...prev];
      if (
        newReservations[reservationIndex].changeImage <
        newReservations[reservationIndex].images.length - 1
      ) {
        newReservations[reservationIndex].changeImage += 1;
      }
      return newReservations;
    });
  };

  const prevSlider = (reservationIndex) => {
    setUserReservations((prev) => {
      const newReservations = [...prev];
      if (newReservations[reservationIndex].changeImage > 0) {
        newReservations[reservationIndex].changeImage -= 1;
      }
      return newReservations;
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-amber-400";
      case "canceled":
        return "text-red-800";
      case "Completed":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getAllUserReservations = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/reservations/${localStorage.getItem("userId")}`
      );
      let roomsId = data.data.map(
        (reservationUser) => reservationUser.roomId._id
      );
      const roomsResponse = await axiosInstance.get(
        `/rooms?roomsId=${roomsId.join(",")}`
      );
      const roomsData = roomsResponse.data.data;

      const formattedData = data.data.map((reservationUser) => {
        const checkInDate = new Date(
          reservationUser?.checkIn
        )
        const checkOutDate = new Date(
          reservationUser?.checkOut
        )
        const timeDifference = checkOutDate - checkInDate;
        const numberOfNights = timeDifference / (1000 * 3600 * 24);
        const roomDetails = roomsData.find(
          (room) => room._id === reservationUser.roomId._id
        );

        return {
          id: reservationUser._id,
          user: reservationUser.userId,
          room: roomDetails,
          status: reservationUser.status,
          checkIn: new Date(reservationUser?.checkIn).toLocaleDateString(isArabic ? "ar-EG" : "en-US", options),
          checkOut: new Date(reservationUser?.checkOut).toLocaleDateString(isArabic ? "ar-EG" : "en-US", options),
          night: numberOfNights,
          images: roomDetails.images,
          changeImage: 0,
        };
      });
      setUserReservations(formattedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        console.log(err.response?.data?.message);
      }
      console.log(err.response?.data || err.message, "err");
    }
  };
  if (isLoading) {
    return (
      <div className="lg:p-14 p-7 sm:ml-64 h-full">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-16 lg:py-10 p-7 ">
      {userReservations.length ? (
        userReservations.map((reservation, index) => (
          <div key={reservation.id} className="">
            <div className="border border-main-800 rounded-3xl xl:w-full p-5 md:p-10 mb-10 text-main-400">
              <div className="grid grid-cols-1 md:grid-cols-3 ">
                <div>
                  <p className="text-3xl text-main-800 mb-4  font-bold">
                    {isArabic
                      ? reservation.room.title_ar
                      : reservation.room.title_en}
                  </p>
                  <div>
                    <p className="font-bold text-main-800">
                      {t("profile.date")}
                    </p>
                    <p>
                      {reservation.checkIn} - {reservation.checkOut}
                    </p>
                    <p>
                      {reservation.night} {t("booking.nights")}
                    </p>
                  </div>
                  <div className=" mt-5">
                    <p className="text-main-800 font-bold">
                      {t("profile.status")}
                    </p>
                    <p className={getStatusClass(reservation.status.name_en)}>
                      {isArabic
                        ? reservation.status.name_ar
                        : reservation.status.name_en}
                    </p>
                  </div>
                </div>
                <div className="flex justify-evenly items-center col-span-0 lg:col-span-2 col-span-3 my-2 w-100 rtl:flex-row-reverse">
                  <button
                    className={`${
                      reservation.changeImage === 0
                        ? "opacity-50 border-main-100 "
                        : " border-main-800"
                    } border rounded-full hidden md:block p-1`}
                    onClick={() => prevSlider(index)}
                    disabled={reservation.changeImage === 0}
                  >
                    <GrFormPrevious className="text-xl" />
                  </button>
                  <div className="mx-0 md:mx-3 w-52 h-52 md:w-72 overflow-hidden flex justify-center items-center">
                    <img
                      className="rounded-3xl object-cover object-center w-full h-full"
                      src={reservation.images[reservation.changeImage]}
                      alt="Current Branch"
                    />
                  </div>
                  <button
                    className={`${
                      reservation.changeImage === reservation.images.length - 1
                        ? "opacity-50 border-main-100 "
                        : " border-main-800 "
                    } border rounded-full  mx-0 md:mx-3 hidden md:block p-1`}
                    onClick={() => nextSlider(index)}
                    disabled={
                      reservation.changeImage === reservation.images.length - 1
                    }
                  >
                    <MdOutlineNavigateNext className="text-xl" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold text-main-800">
                  {t("profile.amenities")}
                </p>
                <p>
                  {reservation.room.amenitiesIds
                    .map((amenity) =>
                      isArabic ? amenity.name_ar : amenity.name_en
                    )
                    .join(", ")}
                </p>
              </div>
              <div className="flex mt-4 ">
                <div className="me-32 flex items-center">
                  <p className=" rounded-full text-3xl text-white bg-main-300 p-3 me-2 w-14 h-14">
                    <IoKeyOutline />
                  </p>
                  <div>
                    <p>
                      <span className="font-bold">{t("profile.id")}: </span> #
                      {reservation.id.slice(0, 8)}
                    </p>
                    <p>
                      <span className="font-bold">
                        {t("profile.room-type")}:{" "}
                      </span>
                      {isArabic
                        ? reservation.room.roomTypeId.type_ar
                        : reservation.room.roomTypeId.type_en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>{t("profile.no-reservations")}</div>
      )}
    </div>
  );
}

export default History;
