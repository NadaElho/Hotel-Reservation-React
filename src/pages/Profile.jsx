import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../../interceptor";
import Loader from "../components/Loader";
import { Outlet } from "react-router";
import Tabs from "../components/Tabs";
import { toast } from "react-toastify";

const Profile = ({handleLog}) => {
  const [userData, setUserData] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    (async () => {
      try{
        const { data } = await axiosInstance.get(
          `/users/${localStorage.getItem("userId")}`
        );
        setUserData(data.data);
      }catch(err){
        toast.error("please login first")
        localStorage.setItem("token", "")
      }
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
            <Outlet data={userData}/>
          </div>
        </div>
      ) : (
        <div className="h-screen"><Loader /></div>
      )}
    </div>
  );
};

export default Profile;
