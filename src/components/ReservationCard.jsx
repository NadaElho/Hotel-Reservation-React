import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

function ReservationCard({ roomData, calcNoOfNights,  calcTotalPrice, reserve}) {
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar"

  return (
    <div className="p-4 w-full md:w-[300px] lg:w-[400px] border rounded-2xl border-main-800">
      <div className="flex justify-between gap-2 border-b-2 border-main-800 pb-2">
       {roomData.images && <img className="w-[100px] rounded-2xl" src={roomData?.images[0]} alt="" />}
        <div>
          <h3 className="font-bold text-main-800 text-xl">{isArabic ? roomData.hotelId?.name_ar : roomData.hotelId?.name_en}</h3>
          <p className="text-main-800 py-1">{isArabic ? roomData.title_ar : roomData.title_en}</p>
        </div>
      </div>
      <h4 className="py-3 text-xl text-main-800 font-bold">{t("booking.price-details")}</h4>
      <div className="flex justify-between text-main-300">
        <div>
          {roomData.currency}
          {roomData.price} x {calcNoOfNights}
        </div>
        <div className="font-bold">
          {roomData.currency}
          {calcTotalPrice}
        </div>
      </div>
      <h5 className="py-2 text-main-300">{calcNoOfNights} {t("booking.nights")}</h5>
      <div className="flex pb-2 justify-between text-main-300">
        <div>{isArabic ? roomData.hotelId?.name_ar : roomData.hotelId?.name_en}</div>
        <div>{isArabic ? roomData.hotelId?.address_ar : roomData.hotelId?.address_en}</div>
      </div>
      <h5 className="pb-5 pt-1 text-main-300">{isArabic ? roomData.roomTypeId?.type_ar : roomData.roomTypeId?.type_en}</h5>
      <button className="rounded-3xl bg-main-800 py-2 px-4 text-white w-full" onClick={reserve}>{t("booking.book-now")}</button>
    </div>
  );
}
export default ReservationCard;
