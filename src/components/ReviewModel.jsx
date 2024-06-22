import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "../../interceptor";
import { useParams } from "react-router";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const ReviewModel = ({ addReview, updateReview, currentReview, onClose }) => {
    const [openModal, setOpenModal] = useState(true);
  const [reviewData, setReviewData] = useState({
    title: "",
    rating: 0,
  });
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const { t } = useContext(LanguageContext);
  useEffect(() => {
    setReviewData(currentReview);
  }, [currentReview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewData({
      ...reviewData,
      [name]: value,
    });

    if (name === "title" || name === "rating") {
      setIsError(false);
    }
  };

  const handleChangeRating = (newRating) => {
    setReviewData({
      ...reviewData,
      rating: newRating,
    });
  };

  const handleUpdateReview = async () => {
    if (!reviewData.title || !reviewData.rating) {
      setIsError(true);
      return;
    }
    const { data } = await axiosInstance.patch(
      `/reviews/${currentReview._id}`,
      reviewData
    );
    updateReview(data.data);
    onClose();
  };

  const handleAddReview = async () => {
    if (!reviewData.title || !reviewData.rating) {
      setIsError(true);
      return;
    }
    const userId = localStorage.getItem("userId");
    const { data } = await axiosInstance.post("/reviews", {
      title: reviewData.title,
      rating: reviewData.rating,
      userId,
      roomId: id,
    });
    addReview(data.data);
    onClose();
  };

  return (
    <Modal
      className="w-1/2 mx-auto"
      show={true}
      size="md"
      onClose={onClose}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="mx-10 flex flex-col gap-10 justify-center h-80 mb-5 ">
          <h3 className="text-lg opacity-80 font-semibold text-gray-900 dark:text-white">
            {currentReview  ? t("reviews.Update-review") : t("reviews.write-review")}
          </h3>
          <textarea
            className="border border-primary py-10 px-4 rounded-3xl outline-0 bg-transparent placeholder-style dark:border-PrimaryDark dark:bg-dark-background dark:text-white"
            id="review"
            placeholder={t("reviews.placeholder")}
            value={reviewData ? reviewData.title : ""}
            name="title"
            required
            onChange={handleChange}
          />
          {isError && !reviewData.title && (
            <h1 className="text-red-600 text-lg">{t("reviews.enter-review")}</h1>
          )}

          {isError && !reviewData.rating && (
            <h1 className="text-red-600 text-lg">{t("reviews.choose-rating")}</h1>
          )}
          <div className="w-full flex justify-between items-center text-custom dark:text-white">
            <p className="text-lg dark:text-[#000000]">{t("reviews.Overall-rating")}</p>
            <ReactStars
              size={30}
              value={reviewData ? reviewData.rating : 0}
              onChange={handleChangeRating}
            />
            <button
              onClick={currentReview ? handleUpdateReview : handleAddReview}
              className="w-44 py-1 px-4 bg-primary text-white opacity-95 rounded-full inline-flex justify-center items-center dark:bg-PrimaryDark dark:text-customDark"
            >
              {currentReview ? t("reviews.update") : t("reviews.add")}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModel;
