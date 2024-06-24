import { useEffect, useState } from "react";
import axiosInstance from "../../interceptor";
import Card from "../components/Card";
import Loader from "../components/Loader";

const Favourites = () => {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    (async function () {
      const { data } = await axiosInstance.get(`/users/${userId}`);
      setUserData(data.data);
    })();
  }, [userId]);

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {userData && userData.favouriteRooms ? (
        userData.favouriteRooms.map((room) => {
          return <Card room={room} key={room._id} userData={userData}/>;
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
