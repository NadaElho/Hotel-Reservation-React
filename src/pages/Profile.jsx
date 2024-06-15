import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../../interceptor";
import Loader from "../components/Loader";
import { Outlet } from "react-router";
import Tabs from "../components/Tabs";

const Profile = ({handleLog}) => {
  const [userData, setUserData] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get(
        `/users/${localStorage.getItem("userId")}`
      );
      setUserData(data.data);
    })();
  }, [imageChanged]);

  const handleImageChange = async (e) => {
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    try {
      await axiosInstance.patch(
        `/users/${localStorage.getItem("userId")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setImageChanged((prev) => !prev);
  };

  return (
    <div className="p-4">
      {userData ? (
        <div className="flex justify-between gap-5 flex-col md:flex-row">
          <Sidebar
            data={userData}
            handleImageChange={handleImageChange}
            imageChanged={imageChanged}
            handleLog={handleLog}
          />
          <div className="w-full rounded-3xl">
            <Tabs/>
            <Outlet />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
