import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const RoomId = () => {
    const [room,setRoom] = useState([])
    const {id} = useParams()

    useEffect(() => {
        async function fetchData() {
        const res = await axios.get(`http://localhost:3000/api/v1/rooms/${id}`);
          const data = res.data.room;
          setRoom(data);
        }
        fetchData();
      }, []);
     
  return (
    <div>
      {
    <div>
               <p>{room.description_en}</p>
               <p>Amenities Available</p>
               <span>{room.amenitiesIds}</span>


    </div>
      }
    </div>
  )
}

export default RoomId
/* <div className="container mt-5">
{
  <div className="row">
    <div className="col-md-8 offset-md-2">
      {blog.img && (
        <img src={blog.img} alt="Blog Image" className="img-fluid mb-3" />
      )}
      <h1>{blog.title}</h1>
      <p>{blog.body}</p>
      <Link to={"/"} style={{textDecoration:"none"}}>
      <button className="ButtonPrimary" style={{display:"block" , margin:"auto"}}>Go back home</button>
      </Link>

    </div>
    // {/* // (loading && img) */
//   </div>