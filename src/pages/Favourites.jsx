import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Favourites = () => {
  const [favouriteRooms, setFavouiteRooms] = useState(null);
  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(
        `/rooms/favourites/${localStorage.getItem("userId")}`
      );
      let roomsId = data.data.map((reservationUser) => reservationUser._id);
      const roomsResponse = await axiosInstance.get(
        `/rooms?roomsId=${roomsId.join(",")}`
      );
      setFavouiteRooms(roomsResponse.data.data);
    })();
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {favouriteRooms ? (
        favouriteRooms.map((room) => {
          return <Card room={room} key={room._id} />;
        })
      ) : (
        <div className="h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Favourites;
