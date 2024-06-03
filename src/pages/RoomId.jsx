import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../interceptor";
import RoomCard from "../components/RoomCard";

const RoomId = () => {
  const [room, setRoom] = useState([]);
  const { id } = useParams();
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:3000/api/v1/rooms/${id}`);
      const roomData = res.data.room;
      setRoom(roomData);
      const { data } = await axiosInstance.get(`/rooms/${id}/roomReserved`);
      setDisabledDates(data.data);
    }

    fetchData();
  }, []);
  }, [id]);

  return (
    <div className="container mx-auto mt-8 ">
      {room ? (
        <div className="flex justify-between flex-col md:flex-row">
          <div className="" key={room._id}>
            <div className="mx-10">
              <p className="text-primary font-bold text-3xl font-secondary">
                {room.hotelId && room.hotelId.name_en}
              </p>
              <img className="mt-8" src="/assets/view1.png" alt="" />
            </div>
            {/* sec1 */}

            <div className="mx-10 w-2/4 mt-8">
              <p className="text-primary font-600 text-3xl font-secondary">
                {room.roomTypeId && room.roomTypeId.type_en}
              </p>
              <p className="text-primary mt-6">{room.description_en}</p>
            </div>
            {/* sec2 */}

            <div className="mx-10 mt-10">
              <p className="text-primary font-semibold text-2xl">
                Amenities Available
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
                        <span>{r.description_en && r.description_en}</span>
                      </div>
                    ))}
                </div>
              </div>
              {/* sec3 */}
            </div>
          </div>
          <div className="mt-5">
            <RoomCard disabledDates={disabledDates} roomData={room} />
            <div className="mx-10 mt-10">
              <p className="text-primary font-semibold text-2xl">
                Amenities Available
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
                          />
                        </div>
                        <span>{r.description_en && r.description_en}</span>
                      </div>
                    ))}
                </div>
              </div>
              {/* sec3 */}
            </div>
            <div className="mt-5">
              <RoomCard disabledDates={disabledDates} roomData={room} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoomId;
