import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { IoIosStar } from "react-icons/io";
import { format } from "date-fns";
import LinesEllipsis from "react-lines-ellipsis";
import { ReviewModel } from "./ReviewModel";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Reviews = ({
  truncated,
  toggleTruncated,
  reviews,
  addReview,
  handleDelete,
}) => {
  const [showModel, setShowModel] = useState(false);
  const handleShowModel = () => {
    setShowModel(!showModel);
  };
  console.log(reviews)
  return (
    <div className="container mt-16 mx-10">
      <h3 className="text-custom font-semibold text-lg">{`${+reviews.length} Reviews`}</h3>
      <div className="w-8 flex justify-between items-center gap-2 ">
        <span>
          <IoIosStar className="text-[#ffd700] text-xl" />
        </span>
        <span className="text-custom mt-1">
          {reviews.roomId && reviews.roomId.ratingAvg}
        </span>
      </div>
      <div className=" flex flex-wrap">
        {reviews.length > 0
          ? reviews.map((review, index) => (
              <div key={review._id} className=" w-1/2 mb-8">
                <div className="flex flex-col mt-16">
                  <div className="flex gap-6">
                    {review.userId &&
                      review.userId.images &&
                      review.userId.images && (
                        <img
                          src={review.userId.images[0]}
                          className="object-cover w-20 h-20 rounded-full"
                        />
                      )}
                    <div>
                      <span className="text-primary font-semibold">
                        {review.userId.firstName &&
                          review.userId.firstName +
                            " " +
                            review.userId.lastName}
                      </span>
                      <p className="text-custom">Professional member</p>
                    </div>
                  </div>
                  <div className="w-96 flex justify-between items-center">
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={24}
                      isHalf={true}
                      edit={false}
                      color="#e4e5e9"
                    />
                    {review.date && (
                      <p className="text-primary font-semibold">
                        {format(new Date(review.date), "MMMM yyyy")}
                      </p>
                    )}
                    <div className="flex gap-4 justify-center items-center">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-primary text-2xl cursor-pointer"
                      >
                        <MdDeleteOutline />
                      </button>
                      <button className="text-primary text-xl cursor-pointer">
                        <FaRegEdit />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap  text-primary w-96 h-auto opacity-80 mt-4 dark:text-[#CBB7A4]">
                    {truncated[index] ? (
                      <div className="text-custom">
                        {review.title}
                        <button
                          className="underline"
                          onClick={() => toggleTruncated(index)}
                        >
                          Less
                        </button>
                      </div>
                    ) : (
                      <LinesEllipsis
                        text={review.title}
                        maxLine={2}
                        ellipsis={
                          <button onClick={() => toggleTruncated(index)}>
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
        <div className="w-full flex gap-4 my-10">
          <Link to= "/allReviews" className="w-42 py-1 px-4 bg-primary text-white opacity-95 rounded-full inline-flex justify-center items-center dark:bg-[#E2C8AD] dark:text-customDark">
            Show all reviews
          </Link>
          <button
            onClick={handleShowModel}
            className="w-42 py-1 px-4 bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold inline-flex items-center justify-center dark:border-[#E2C8AD] dark:text-[#E2C8AD]"
          >
            Write a review
          </button>
        </div>
        {showModel && <ReviewModel addReview={addReview} />}
      </div>
    </div>
  );
};

export default Reviews;
