import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Favourites = () => {
  const [userData, setUserData] = useState(null);
  const [favouriteRooms, setFavouriteRooms] = useState(null);
  const [changed, setChanged] = useState(false);
  const [favouriteRoomsIds, setFavouriteRoomsIds] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/users/${userId}`);
        setUserData(data.data);
        const FavRooms = data.data.favouriteRooms.map((room) => room._id);
        setFavouriteRoomsIds(FavRooms);
        setFavouriteRooms(data.data.favouriteRooms)
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [userId, changed]);

  const handleAddToFavourite = async (roomId) => {
    console.log(userData.favouriteRooms)
    if (userData.favouriteRooms.includes(roomId)) {
      setFavouriteRooms((prev) => prev.filter((favRoom) => favRoom !== roomId));
      setChanged((prev) => !prev);
    } else {
      await axiosInstance.post(`/rooms/favourites/${userId}`, {
        roomId,
      });
      setFavouriteRooms((prev) => [...prev, roomId]);
      setChanged((prev) => !prev);
    }
  };
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {userData && userData.favouriteRooms ? (
        userData.favouriteRooms.map((room) => {
          return (
            <Card
              room={room}
              key={room._id}
              userData={userData}
              favouriteRoomsIds={favouriteRoomsIds}
              handleAddToFavourite={handleAddToFavourite}
            />
          );
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
