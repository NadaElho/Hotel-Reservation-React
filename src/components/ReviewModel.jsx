import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "../../interceptor";

export function ReviewModel({ addReview, id }) {
  const [openModal, setOpenModal] = useState(true);
  const [review, setReview] = useState({
    title: "",
    rating: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(`/reviews/${id}`);
      setReview(data.data);
    }
    fetchData();
  }, [id]);

  function onCloseModal() {
    setOpenModal(false);
  }
  
  const handleAddReview = async () => {
    const userId = localStorage.getItem("userId");
    const { data } = await axiosInstance.post("/reviews", {
      title: review.title,
      rating: review.rating,
      userId,
      roomId : id
    });
    addReview(data.data, id);
    onCloseModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleChangeRating = (newRating) => {
    setReview({
      ...review,
      rating: newRating,
    });
  };
  return (
    <div className={`fixed bg-gray-400 inset-0 bg-opacity-50 z-50 flex justify-center items-center ${openModal ? "block" : "hidden"}`}>
      <Modal
        className="w-1/2 mx-auto"
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header className="" />
        <Modal.Body className="">
          <div className="mx-10 flex flex-col gap-10 justify-center h-80 mb-5 ">
            <h3 className="text-lg text-primary opacity-80 font-semibold text-gray-900 dark:text-white">
              Write a review
            </h3>
            <textarea
              className="border border-primary py-10 px-4 rounded-3xl outline-0 bg-transparent placeholder-style"
              id="email"
              placeholder="write what do you think"
              value={review.title}
              name="title"
              required
              onChange={handleChange}
            />

            <div className="w-full flex justify-between items-center text-custom">
              <p className="text-lg">overall rating</p>
              <ReactStars
                size={30}
                value={review.rating}
                onChange={handleChangeRating}
              />

              <button
                onClick={handleAddReview}
                className="w-44 py-1 px-4 bg-primary text-white opacity-95 rounded-full inline-flex justify-center items-center dark:bg-[#E2C8AD] dark:text-customDark"
              >
                Add
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
