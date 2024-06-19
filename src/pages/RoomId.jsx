import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptor";
import RoomCard from "../components/RoomCard";
import Loader from "../components/Loader";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageContext";
import Reviews from "../components/Reviews";

const RoomId = ({truncated , toggleTruncated }) => {
  const [room, setRoom] = useState([]);
  const { id } = useParams();
  const [disabledDates, setDisabledDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews , setReviews] = useState([])
 
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get(`/rooms/${id}`);
      const roomData = res.data.room;
      setRoom(roomData);
      setLoading(false);
      const { data } = await axiosInstance.get(`/rooms/${id}/roomReserved`);
      setDisabledDates(data.data);
      // 
      const reviewData = await axiosInstance.get(`/reviews/${id}`);
      console.log(reviewData.data.data);
      setReviews(reviewData.data.data);
    }
     
    fetchData();
  }, [id]);

  const handleDelete = async(id)=>{
    console.log(id);
    await axiosInstance.delete(`/reviews/${id}`); 
    const deletedReview = reviews.filter((r)=>r._id !==id )
    setReviews(deletedReview)
  }

  const addReview = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center p-8 overflow-hidden ">
          <Loader />
        </div>
      ) : room ? (
        <div className="container mx-auto mt-8 ">
          <div className="mx-10" key={room._id}>
            <p className="text-primary font-bold text-3xl font-secondary dark:text-PrimaryDark">
              {`${
                room.hotelId && isArabic
                  ? room.hotelId.name_ar
                  : room.hotelId.name_en
              } ${t("rooms.branch")}`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-4 mt-4">
              {room.images &&
                room.images.map((image, index) => (
                  <div
                    key={index}
                    className={"col-span-1 md:col-span-2 lg:col-span-2"}
                  >
                    <img
                      className="h-[250px] w-full object-cover rounded-tl-lg"
                      src={image}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  justify-between mt-10">
            <div>
              <div className="mx-10 w-2/4 mt-8 ">
                <p className="text-primary font-600 text-3xl font-secondary dark:text-PrimaryDark">
                  {room.roomTypeId && isArabic
                    ? room.roomTypeId.type_ar
                    : room.roomTypeId.type_en}
                </p>
                <p className="text-primary mt-6 dark:text-[#CBB7A4]">
                  {isArabic ? room.description_ar : room.description_en}
                </p>
              </div>
              {/* sec2 */}
              <div className="mx-10 mt-10">
                <p className="text-primary font-semibold text-2xl dark:text-[#CBB7A4]">
                  {t("rooms.Amenitiy-vailable")}
                </p>
                <div className="flex mt-8">
                  <div className="flex flex-col gap-6">
                    {room.amenitiesIds &&
                      room.amenitiesIds.map((r) => (
                        <div key={r._id} className="flex gap-4 items-center">
                          <div className="w-10 h-10 bg-secondary rounded-full flex justify-center">
                            <img
                              src={r.images && r.images}
                              alt=""
                              width={"25px"}
                              height={"20px"}
                            />
                          </div>
                          <span className="dark:text-[#F0C7AD]">
                            {r.description_en && isArabic
                              ? r.description_ar
                              : r.description_en}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* amenity */}
            <div className="mt-6">
              <RoomCard disabledDates={disabledDates} roomData={room} />
            </div>
            {/* card */}
          </div>
          {/* reviews */}
          <Reviews truncated={truncated} toggleTruncated={toggleTruncated} reviews={reviews} addReview={addReview} handleDelete={handleDelete}/>
        </div>
      ) : (
        <div className="text-center w-full mt-10">
          <p className="text-2xl text-primary text-center font-semibold">
            {t("rooms.room-not-found")} .
          </p>
        </div>
      )}
    </>
  );
};

export default RoomId;
