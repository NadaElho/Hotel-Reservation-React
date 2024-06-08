import { Link, useSearchParams } from "react-router-dom";
import success from "/success.png";
import fail from "/failed.png";
import axiosInstance from "../../interceptor";
import { LanguageContext } from "../providers/LanguageContext";
import { useContext } from "react";
function PaymentResult() {
  const [resultParam] = useSearchParams();
  const { t } = useContext(LanguageContext);  
  const isArabic = localStorage.getItem("lang") == "ar"
  const resultQuery = resultParam.toString().split("&")[0].split("=")[0];
  const price = resultParam.toString().split("&")[1]?.split("=")[1];
  let hours = new Date().getHours();
  const minutes =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  const ampm = hours >= 12 ? (isArabic ? " ًمساء" : "PM") : isArabic ? "صباحاً" : "am";
  hours = hours % 12 || 12;
  const tryPaymentAgain = async () => {
    const reservationId = localStorage.getItem("reservationId");
    const { data } = await axiosInstance.post(
      `/reservations/${reservationId}/payment`
    );
    window.location.href = data.session.url;
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="md:p-4">
        {resultQuery == "success" ? (
          <div className="py-5 flex justify-center flex-col">
            <h2 className="text-center pt-5 font-bold text-main-800 text-2xl md:text-3xl lg:text-4xl">
              {t("payment.payment-success")}
            </h2>
            <div className="flex py-5 justify-between gap-0 md:gap-20 items-center">
              <img
                src={success}
                className="hidden md:inline-block md:w-[200px] lg:w-[400px]"
              />
              <div className="border border-main-800 p-5 w-full rounded-3xl md:w-[400px] lg:w-[450px]">
                <p className="text-main-800 font-bold pt-4">
                  {t("payment.payment-processed")}
                </p>
                <p className="text-main-800 font-bold pb-4">
                  {t("payment.transaction-details")}
                </p>
                <div className="flex justify-between text-main-300">
                  <div className="font-bold">{t("payment.total")}</div>
                  <div>${price}</div>
                </div>
                <div className="flex justify-between text-main-300 py-4">
                  <div className="font-bold">{t("payment.paid-by")}</div>
                  <div>{t("payment.master-card")}</div>
                </div>
                <div className="flex justify-between text-main-300 pb-4">
                  <div className="font-bold">
                    {t("payment.transaction-date")}
                  </div>
                  <div>
                    {new Date().toLocaleDateString(
                      isArabic ? "ar-EG" : "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    , {hours}:{minutes}  &nbsp;
                    {ampm}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5">
              <Link
                to="/"
                className="rounded-3xl py-2 px-11 bg-main-800 text-white text-center"
              >
                {t("payment.back-home")}
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img className="w-3/4 lg:w-1/2 " src={fail} alt="" />
            <h2 className="text-center pt-5 font-bold text-main-800 text-2xl md:text-3xl lg:text-4xl">
              {t("payment.payment-failed")}
            </h2>
            <p className="text-sm py-2 text-main-200 text-center">
              {t("payment.error")}
            </p>
            <div className="text-center mt-11 mb-5">
              <button
                onClick={tryPaymentAgain}
                className="rounded-3xl py-2 px-11 mb-3 bg-main-800 text-white text-center"
              >
                {t("payment.try")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentResult;
