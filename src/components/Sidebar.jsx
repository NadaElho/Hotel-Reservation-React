import { IoCameraOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = ({ data, handleImageChange }) => {
  const links = [
    { title: "My account", link: "" },
    { title: "My favourites", link: "favourites" },
    { title: "plans", link: "plans" },
    { title: "history", link: "history" },
  ];

  return (
    <div className="w-1/4 bg-main-25 p-4 rounded-3xl">
      <div className="flex gap-3 mb-4">
        <label
          htmlFor="uploadFile1"
          className="flex outline-none rounded cursor-pointer relative w-14 h-14"
        >
          <img src={data.images[0]} alt="" className="rounded-full w-14 h-14" />
          <input type="file" id="uploadFile1" className="hidden" onChange={handleImageChange}/>
        <div className="absolute top-9 left-9 rounded-full w-6 h-6 bg-main-500 flex items-center justify-center">
          <IoCameraOutline color="white"/>
        </div>
        </label>
        <div>
          <h4>
            {data.firstName} {data.lastName}
          </h4>
        </div>
      </div>
      {links.map((link) => (
        <div key={link.title} className="my-2">
          <Link to={link.link}>{link.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
