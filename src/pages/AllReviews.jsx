import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import Reviews from "../components/Reviews";
import { useParams } from "react-router";

const AllReviews = ({truncated , toggleTruncated}) => {
  const [reviews, setReviews] = useState([]);
  const [room, setRoom] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
        const res = await axiosInstance.get(`/rooms/${id}`);
        setRoom(res.data.room);
        
        const { data } = await axiosInstance.get(`/reviews/${id}`);
        setReviews(data.data);      
    }
      fetchData();
  }, [id]);
  return (
    <>
      <Reviews reviews={reviews} room={room} truncated={truncated} toggleTruncated={toggleTruncated} isShow={false} design={{widthProp:"md:w-full" , scroll: "overflow-y-scroll"}} />
    </>
  );
};

export default AllReviews;

