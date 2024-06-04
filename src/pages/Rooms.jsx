import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Pagination from "../components/Pagination";
import axiosInstance from "../../interceptor";

const Rooms = () => {
  const [value, setValue] = useState([0, 10000]);
  const [rooms, setRooms] = useState([]);
  const [params] = useSearchParams();
  const [pageNum, setPageNum] = useState(0);
  const [limit, setLimit] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [loading, setLoading] = useState(true)
  const onValueChange = (values) => {
    setValue(values);
  };
  let arr = params.toString().split("&");
  let filterObj = {};
  arr.forEach((query) => {
    let [key, value] = query.split("=");
    if (value) {
      if (key == "checkIn" || key == "checkOut") {
        value = decodeURIComponent(value);
        filterObj[key] = new Date(value).toISOString();
      } else {
        filterObj[key] = value;
      }
    }
  });

  const handleLimit = (num) => {
    setLimit(num);
  };

  const handlePageClick = (data) => {
    setPageNum(data.selected);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/rooms", {
          params: {
            "price[gt]": value[0],
            "price[lt]": value[1],
            page: pageNum + 1,
            limit: limit,
            ...filterObj
          },
        });
        setLoading(false)
        const data = res.data.data;
        setRooms(data);
        setNoOfPages(res.data.pagination.numberPages);
      } catch (error) {
        setLoading(false)
        console.error("Error fetching rooms:", error);
      }
    }
    fetchData();
  }, [value, pageNum, limit]);

  return (
    <>
      <div className="container mx-auto flex mt-16">
        <div className="w-80 border border-secondary rounded-3xl h-64 mx-10 flex flex-col justify-around hidden sm:block">
          <div className="mx-10 mt-4">
            <p className="text-secondary text-xl font-semibold">Filter by</p>
            <p className="text-primary font-semibold text-2xl mt-2">
              Price per night
            </p>
            <div className="flex space-x-3 mt-8">
              <div className="w-28 h-14 bg-white border border-custom p-1 rounded-lg">
                <label htmlFor="minInput" className="font-semibold">
                  Min
                </label>
                <input
                  type="text"
                  max="10000"
                  value={value[0]}
                  onChange={(event) =>
                    setValue([
                      event.target.value === ""
                        ? 0
                        : parseInt(event.target.value),
                      value[1],
                    ])
                  }
                  className="w-full border-none border-b-2 border-black focus:outline-none focus:border-custom-500"
                />
              </div>
              <div className="w-28 h-14 bg-white border border-custom p-1 rounded-lg">
                <label htmlFor="maxInput" className="font-semibold">
                  Max
                </label>
                <input
                  type="text"
                  value={value[1]}
                  onChange={(event) =>
                    setValue([
                      value[0],
                      event.target.value === ""
                        ? 40
                        : parseInt(event.target.value),
                    ])
                  }
                  min="0"
                  className="w-full border-none border-b-2 border-black focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex mt-10">
              <RangeSlider
                min={0}
                max={10000}
                value={value}
                onInput={onValueChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                className="w-full sm:max-w-96 rounded-3xl overflow-hidden shadow-lg border border-secondary border-opacity-40 "
                key={room._id}
              >
                <img
                  className="w-full h-64 object-cover"
                  src={room.images[0]}
                  alt=""
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-2xl mb-2 text-primary">
                    {room.roomTypeId.type_en}
                  </div>
                  <p className="text-primary opacity-80 font-semibold text-sm text-justify tracking-tight mt-4">
                    {room.description_en}
                  </p>
                  <hr className=" border-primary opacity-40  mt-4" />
                </div>
                <div className="px-6 text-center">
                  <div className="flex justify-center gap-6">
                    {room.amenitiesIds &&
                      room.amenitiesIds.map((r) => (
                        <div key={r._id}>
                          <div className="w-10 h-10 bg-secondary rounded-full flex justify-center">
                            <img
                              src={r.images && r.images}
                              alt=""
                              width={"25px"}
                              height={"20px"}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr className=" border-primary opacity-40  mt-4" />

                  <div className="w-full flex justify-between py-8">
                    <button className="w-40 bg-primary text-white text-sm opacity-95 py-3 px-4 rounded-full inline-flex items-center">
                      <Link to="/reservation-room/:id">
                        Book now for ${room.price}
                      </Link>
                    </button>
                    <button className="w-40 bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold py-2 px-4 inline-flex items-center justify-center">
                      <Link to={`/rooms/${room._id}`}>Check details</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
           (!loading && (<div className="text-center w-full mt-10">
           <p className="text-2xl text-primary text-center font-semibold">
             No rooms found matching your request.
           </p>
         </div>))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center py-3">
        <Pagination
          handleLimit={handleLimit}
          pageCount={noOfPages}
          handlePageClick={handlePageClick}
        />
      </div>
    </>
  );
};

export default Rooms;
