import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { t } from "i18next";

const Favourites = () => {
  const [userData, setUserData] = useState(null);
  const [favouriteRooms, setFavouriteRooms] = useState(null);
  const [changed, setChanged] = useState(false);
  const [favouriteRoomsIds, setFavouriteRoomsIds] = useState(null);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/users/${userId}`);
        setUserData(data.data);
        const FavRooms = data.data.favouriteRooms.map((room) => room._id);
        setFavouriteRoomsIds(FavRooms);
        setFavouriteRooms(data.data.favouriteRooms);
        setLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [userId, changed]);

  const handleAddToFavourite = async (roomId) => {
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
  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-center md:justify-start flex-wrap gap-4">
      {userData && userData.favouriteRooms.length > 0 ? (
        userData.favouriteRooms.map((room) => {
          return (
            <Card
              room={room}
              key={room._id}
              userData={userData}
              favouriteRoomsIds={favouriteRoomsIds}
              handleAddToFavourite={handleAddToFavourite}
              from="favourites"
            />
          );
        })
      ) : (
        <div className="h-screen text-main-800 dark:text-main-25 mt-12 text-3xl">
          <div>{t("profile.no-fav")}</div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
