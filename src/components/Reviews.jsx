import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { IoIosStar } from "react-icons/io";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import LinesEllipsis from "react-lines-ellipsis";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewModel from "./ReviewModel";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";

const Reviews = ({
  truncated,
  toggleTruncated,
  reviews,
  addReview,
  handleDelete,
  updateReview,
  isUpdated,
  room,
  isShow = true,
  design = {},
  id,
}) => {
  const [showModel, setShowModel] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  const reviewUser = reviews.find(
    (review) => review.userId._id === localStorage.getItem("userId")
  );

  const handleShowModel = (review) => {
    setCurrentReview(review);
    setShowModel(true);
  };
  return (
    <div className={`container mt-16 mx-10 ${design.scroll}`}>
      <h3 className="text-custom font-semibold text-lg dark:text-[#CBB7A4]">
        {isArabic ? (
          <>
            {t("reviews.reviews")} {reviews.length}
          </>
        ) : (
          <>
            {reviews.length} {t("reviews.reviews")}
          </>
        )}
      </h3>
      <div className="w-8 flex justify-between items-center gap-2 ">
        {isArabic ? (
          <>
            <span className="text-custom mt-1 dark:text-[#CBB7A4]">
              {room && room.ratingAvg
                ? room.ratingAvg
                : room.ratingAvg}
            </span>
            <span>
              <IoIosStar className="text-[#ffd700] text-xl" />
            </span>
          </>
        ) : (
          <>
            <span>
              <IoIosStar className="text-[#ffd700] text-xl" />
            </span>
            <span className="text-custom mt-1 dark:text-[#CBB7A4]">
              {room && room.ratingAvg
                ? room.ratingAvg.toFixed(1)
                : room.ratingAvg}
            </span>
          </>
        )}
      </div>
      <div className={`flex flex-wrap`}>
        {reviews.length > 0
          ? reviews.map((review, index) => (
              <div
                key={review._id}
                className={`w-full md:w-1/2 mb-8 ${design.widthProp}`}
              >
                <div className="flex flex-col  mt-16 gap-3">
                  <div className="flex gap-6 w-80 md:w-64 justify-between">
                    {review.userId && review.userId.images && (
                      <img
                        src={review.userId.images[0]}
                        className="object-cover w-20 h-20 rounded-full"
                        alt="User"
                      />
                    )}
                    <div>
                      <span className="text-primary font-semibold dark:text-PrimaryDark">
                        {review.userId &&
                          `${review.userId.firstName} ${review.userId.lastName}`}
                      </span>
                      <p className="text-custom dark:text-PrimaryDark">
                        {t("reviews.member")}
                      </p>
                    </div>
                  </div>
                  <div className="w-80 lg:w-96 flex justify-between items-center">
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={24}
                      isHalf={true}
                      edit={false}
                      color="#e4e5e9"
                    />
                    {review.date && (
                      <p className="text-primary font-semibold dark:text-PrimaryDark">
                        {format(new Date(review.date), "MMMM yyyy", {
                          locale: ar,
                        })}
                      </p>
                    )}
                    {isShow && (
                      <div className="flex gap-4 justify-center items-center">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="text-primary text-2xl cursor-pointer dark:text-PrimaryDark"
                        >
                          <MdDeleteOutline />
                        </button>
                        <button
                          onClick={() => handleShowModel(review)}
                          className="text-primary text-xl cursor-pointer dark:text-PrimaryDark"
                        >
                          <FaRegEdit />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap text-primary w-80 lg:w-[500px] h-auto opacity-80 mt-4 dark:text-PrimaryDark">
                    {truncated[index] ? (
                      <div className="text-custom w-full break-words dark:text-PrimaryDark">
                        {review.title}
                        <button
                          className="underline block"
                          onClick={() => toggleTruncated(index)}
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <LinesEllipsis
                        trimRight
                        basedOn="letters"
                        className="w-full break-words"
                        text={review.title}
                        maxLine={2}
                        color="PrimaryDark"
                        ellipsis={
                          <button
                            className=""
                            onClick={() => toggleTruncated(index)}
                          >
                            ...
                          </button>
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      {isShow && (
        <div className="w-ful flex gap-4 my-10">
          <Link
            to={`/allReviews/${room._id}`}
            className="w-[150px]  py-1 px-4 bg-primary font-semibold text-white opacity-95 rounded-full inline-flex justify-center items-center dark:bg-[#E2C8AD] dark:text-customDark"
          >
            {t("reviews.Show-all-reviews")}
          </Link>
          {!reviewUser && (
            <button
              onClick={() => handleShowModel()}
              className="w-[150px] py-1 px-4 bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold inline-flex items-center justify-center dark:border-[#E2C8AD] dark:text-[#E2C8AD]"
            >
              {t("reviews.write-review")}
            </button>
          )}
        </div>
      )}
      {showModel && (
        <ReviewModel
          addReview={addReview}
          updateReview={updateReview}
          isUpdated={isUpdated}
          currentReview={currentReview}
          onClose={() => setShowModel(false)}
          _id={id}
        />
      )}
    </div>
  );
};

export default Reviews;
