import { useContext, useEffect, useState } from "react";
import Subscription from "./Subscription";
import { LanguageContext } from "../providers/LanguageContext";
import Confirm from "../components/Confirm";
import axiosInstance from "../../interceptor";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Plans = () => {
  const { t } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);
  const [subChanged, setSubChanged] = useState(false);
  const [userData, setUserData] = useState(null);

  const cancelSubscription = async () => {
    try {
      await axiosInstance.delete("/users/delete-subscription", {
        data: { user: localStorage.getItem("userId") },
      });
      setSubChanged(false);
      toast.success(t("subscription.cancelled"));
    } catch (err) {
      toast.error(t("subscription.cancel_error"));
    }
  };

  const addSubscription = async (id) => {
    try {
      await axiosInstance.patch(`/users/add-subscription/${id}`, {
        user: localStorage.getItem("userId"),
      });

      const { data } = await axiosInstance.post(
        `/subscriptions/${id}/payment`,
        { user: localStorage.getItem("userId") }
      );
      window.location.href = data.session.url;
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setSubChanged(true);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axiosInstance.get(
          `/users/${localStorage.getItem("userId")}`
        );
        setUserData(data.data);
      } catch (err) {
        toast.error(t("user.load_error"));
      }
    })();
  }, [t, subChanged]);

  return userData ? (
    <div>
      <h2 className="text-2xl text-main-800 dark:text-main-50  dark:border-main-25  my-5 w-fit py-2 font-medium border-b-2 border-main-800">
        {t("profile.plan")}
      </h2>
      <Subscription
        from="profile"
        addSubscription={addSubscription}
        subChanged={subChanged}
        userData={userData}
      />
      <div className={userData?.subscriptionId?.name_en ? "block" : "hidden"}>
        <h2 className="text-2xl text-main-800 dark:text-main-50 dark:border-main-25  my-5 w-fit py-2 font-medium border-b-2 border-main-800">
          {t("profile.end")}
        </h2>
        <p className="text-main-100 text-lg">
          {t("profile.after-cancellation")}
        </p>
        <button
          className="bg-main-800 px-6 py-2 dark:bg-main-25 dark:text-main-800  rounded-3xl text-white my-4"
          onClick={() => setShowModal(true)}
        >
          {t("profile.end")}
        </button>
      </div>
      {showModal && (
        <Confirm
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            cancelSubscription();
            setShowModal(false);
          }}
        />
      )}
    </div>
  ) : (
    <div className="h-screen">
      <Loader />
    </div>
  );
};

export default Plans;
