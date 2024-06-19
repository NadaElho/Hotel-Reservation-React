import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { IoAddCircleOutline } from "react-icons/io5";
import translationEN from "../languages/en.json";
import translationAR from "../languages/ar.json";

const Subscription = ({ from, addSubscription, subChanged }) => {
  const [subscription, setSubscription] = useState([]);
  const [userData, setUserData] = useState(null);
  const isArabic = localStorage.getItem("lang") == "ar";
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/subscriptions`);
        const data = res.data.data;
        setSubscription(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    (async function () {
      let { data } = await axiosInstance.get(
        `/users/${localStorage.getItem("userId")}`
      );
      setUserData(data.data);
    })();
  }, [subChanged]);

  const cardStyles = {
    width: "270px",
    height: "580px",
    borderRadius: "40px",
    border: "1px solid #10324E",
  };

  const renderAdvantages = (advantages) => {
    return advantages.map((advantage, index) => (
      <li key={index} className="flex items-start">
        {advantage.name_en.startsWith("Increased") ? (
          <IoAddCircleOutline
            className={`mt-1 ${isArabic ? "ml-2" : "mr-2"} `}
            style={{ width: "35px", height: "20px" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={`mt-1 ${isArabic ? "ml-2" : "mr-2"} `}
          />
        )}
        {isArabic ? advantage.name_ar : advantage.name_en}
      </li>
    ));
  };

  const renderPlans = () => {
    return subscription.map((plan) => {
      const isMostPopular = plan.name_en === "Professional Plan";
      return (
        <div
          key={plan._id}
          className={`bg-[#10324E] mt-0 lg:mt-24 text-[#fff7f2] p-6 rounded-lg flex flex-col justify-between mx-auto relative ${
            isMostPopular ? "lg:top-[-80px]" : ""
          }`}
          style={cardStyles}
        >
          <div className="relative mb-4">
            {isMostPopular && (
              <span className="absolute w-32 text-center -top-9 left-1/2 transform -translate-x-1/2  bg-[#fff7f2] text-primary px-2 py-1 rounded-full text-base font-medium border-2 border-[#523832]">
                {isArabic
                  ? translationAR.subscription.mostpopular
                  : translationEN.subscription.mostpopular}
              </span>
            )}
            <div>
              <div className={`${
                  userData.subscriptionId?._id == plan._id
                    ? "inline-block"
                    : "hidden"
                } mb-4 text-right w-full`}>
                <span
                className={`rounded-xl bg-white px-4 py-1 mt-2 inline-block text-[#10324E]`}
              >
                {isArabic
                  ? translationAR.profile.active
                  : translationEN.profile.active}
              </span>
              </div>
              <h4 className="text-3xl mt-3 font-semibold text-center">
                {isArabic ? plan.name_ar : plan.name_en}
              </h4>
              <p className="text-2xl mb-10 font-semibold text-center">
                <span className="text-lg">$</span>
                {plan.price === 0 ? "Free" : `${plan.price}`}
                {plan.price > 0 && (
                  <span className="text-2xl font-normal">
                    {isArabic
                      ? translationAR.subscription.month
                      : translationEN.subscription.month}
                  </span>
                )}
              </p>
              <ul
                className={`list-none space-y-2 font-normal ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {renderAdvantages(plan.subscriptionAdvantageIds)}
              </ul>
            </div>
          </div>
          <button
            className={`w-full mt-4 bg-[#134D7D] text-[#FFF7F2] px-4 py-2 rounded-full `}
            onClick={()=>addSubscription(plan._id)}
          >
            {plan.name_en === "Basic plan"
              ? isArabic
                ? translationAR.subscription.getStarted
                : translationEN.subscription.getStarted
              : isArabic
              ? translationAR.subscription.upgrade
              : translationEN.subscription.upgrade}
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      {userData && subscription && (
        <div
          className={`${
            from === "profile" ? "bg-transparent" : "bg-gray-50"
          } roboto flex justify-center items-center min-h-screen`}
        >
          <div className="w-full p-4 md:p-16 lg:p-16 flex flex-col justify-center items-center mx-auto">
            <h1
              className={`${
                from === "profile" ? "hidden" : "block"
              } text-primary dark:text-main-25 text-4xl font-secondary uppercase text-left ml-2 mt-2 w-full`}
            >
              <Link to="/">APEX</Link>
            </h1>
            <div
              className={`mt-16 lg:mt-0 ${
                isArabic ? "text-right" : "text-left"
              } relative`}
            >
              <div>
                <h3
                  className={`${
                    from === "profile" ? "hidden" : "block"
                  } font-bold text-gray-600 text-4xl ${
                    isArabic ? "text-right" : "left-36 top-20"
                  }`}
                >
                  {isArabic
                    ? translationAR.subscription.chooseyourplan
                    : translationEN.subscription.chooseyourplan}
                </h3>
                <h5
                  className={`${
                    from === "profile" ? "hidden" : "block"
                  } text-xl mb-2 text-main-400 font-normal ${
                    isArabic ? "text-right" : "left-36 top-32"
                  }`}
                >
                  {isArabic
                    ? translationAR.subscription.pickplan
                    : translationEN.subscription.pickplan}
                </h5>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                {renderPlans()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
