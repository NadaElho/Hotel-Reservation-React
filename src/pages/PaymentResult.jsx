import { Link, useSearchParams } from "react-router-dom";
import success from "/success.png";
import fail from "/failed.png";
import axiosInstance from "../../interceptor";
function PaymentResult() {
  const [resultParam] = useSearchParams();
  let resultQuery = resultParam.toString().split("&")[0].split("=")[0];
  let price = resultParam.toString().split("&")[1]?.split("=")[1];
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let ampm = hours >= 12 ? "PM" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const tryPaymentAgain = async () => {
    let reservationId = localStorage.getItem("reservationId");
    let { data } = await axiosInstance.post(
      `/reservations/${reservationId}/payment`
    );
    window.location.href = data.session.url;
  };
  return (
    <div>
      {resultQuery == "success" ? (
        <div className="py-5 flex justify-center flex-col">
          <h2 className="text-center pt-5 font-bold text-main-800 text-2xl md:text-3xl lg:text-4xl">
            Ticket payment successful
          </h2>
          <div className="flex py-5 justify-between items-center">
            <img
              src={success}
              className="hidden md:inline-block md:w-[250px] lg:w-[450px]"
            />
            <div className="border border-main-800 p-5 rounded-3xl w-screen md:w-[400px] lg:w-[450px]">
              <p className="text-main-800 font-bold pt-4">
                Your payment has been processed!
              </p>
              <p className="text-main-800 font-bold pb-4">
                Details of transaction are included below
              </p>
              <div className="flex justify-between text-main-300">
                <div className="font-bold">Total amount paid</div>
                <div>${price}</div>
              </div>
              <div className="flex justify-between text-main-300 py-4">
                <div className="font-bold">Paid by</div>
                <div>master card</div>
              </div>
              <div className="flex justify-between text-main-300 pb-4">
                <div className="font-bold">Transaction date</div>
                <div>
                  {new Date().toString().slice(0, 11)}, {hours}:{minutes}
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
              Back to home
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col">
          <img className="w-3/4 lg:w-1/2 " src={fail} alt="" />
          <h2 className="text-center pt-5 font-bold text-main-800 text-2xl md:text-3xl lg:text-4xl">
            Ticket payment failed
          </h2>
          <p className="text-sm py-2 text-main-200 text-center">
            Your transaction has failed due to some technical error, Please try
            again
          </p>
          <div className="text-center mt-11 mb-5">
            <button
              onClick={tryPaymentAgain}
              className="rounded-3xl py-2 px-11 mb-3 bg-main-800 text-white text-center"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentResult;
