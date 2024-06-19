import { useContext, useState } from "react";
import Subscription from "./Subscription";
import { LanguageContext } from "../providers/LanguageContext";
import Confirm from "../components/Confirm";
import axiosInstance from "../../interceptor";

const Plans = () => {
  const { t } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);
  const [subChanged, setSubChanged] = useState(false);

  const cancelSubscription = async () => {
    await axiosInstance.delete("/users/delete-subscription", {
      user: localStorage.getItem("userId"),
    });
    setSubChanged(false);
  };

  const addSubscription = async (id) => {
    await axiosInstance.patch(`/users/add-subscription/${id}`, {
      user: localStorage.getItem("userId"),
    });
    setSubChanged(true);
  };

  return (
    <div>
      <h2 className="text-2xl text-main-800 dark:text-main-50 my-5 w-fit py-2 font-medium border-b-2 border-main-800">
        {t("profile.plan")}
      </h2>
      <Subscription
        from="profile"
        addSubscription={addSubscription}
        subChanged={subChanged}
      />
      <div className={subChanged ? 'block' : 'hidden'}>
        <h2 className="text-2xl text-main-800 dark:text-main-50 my-5 w-fit py-2 font-medium border-b-2 border-main-800">
          {t("profile.end")}
        </h2>
        <p className="text-main-100 text-lg">
          {t("profile.after-cancellation")}
        </p>
        <button
          className="bg-main-800 px-6 py-2 rounded-3xl text-white my-4"
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
  );
};

export default Plans;
