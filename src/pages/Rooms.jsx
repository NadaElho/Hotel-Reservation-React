import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Pagination from "../components/Pagination";
import axiosInstance from "../../interceptor";
import LinesEllipsis from "react-lines-ellipsis";
import Loader from "../components/Loader";
import Amenity from "../components/Amenity";
import useDebounce from "../../useDebounce";
const Rooms = () => {
  const [value, setValue] = useState([0, 10000]);
  const [rooms, setRooms] = useState([]);
  const [params] = useSearchParams();
  const [pageNum, setPageNum] = useState(0);
  const [limit, setLimit] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [truncated, setTruncated] = useState([]);
  const [isloading, setLoading] = useState(true);

  const debounceValue = useDebounce(value, 1000);
  const onValueChange = (values) => {
    setValue([...values]);
  };

  const filterObj = useMemo(() => {
    const arr = params.toString().split("&");
    const obj = {};
    arr.forEach((query) => {
      let [key, value] = query.split("=");
      value = decodeURIComponent(value);
      if (key === "checkIn" || key === "checkOut") {
        obj[key] = new Date(value).toISOString();
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }, [params]);

  const handleLimit = (num) => {
    setLimit(num);
  };

  const handlePageClick = (data) => {
    setPageNum(data.selected);
  };

  const toggleTruncated = (index) => {
    setTruncated((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/rooms", {
          params: {
            "price[gt]": debounceValue[0],
            "price[lt]": debounceValue[1],
            page: pageNum + 1,
            limit: limit,
            ...filterObj,
          },
        });
        const data = res.data.data;
        setRooms(data);
        setLoading(false);
        setNoOfPages(res.data.pagination.numberPages);
      } catch (err) {
        console.error("Error fetching data:", err);
        setRooms([]);
        setLoading(false);
      }
    }
    fetchData();
  }, [debounceValue, pageNum, limit, filterObj]);

  return (
    <>
      <div className="container mx-auto flex flex-col  mt-16">
        <Amenity />

        <div className="flex gap-10 mt-20">
          <div className="w-[400px] hidden xl:block">
            <p className="mx-11 text-primary font-semibold text-2xl dark:text-[#CBB7A4]">
              Filter by
            </p>
            <div className="w-[380px] border border-secondary rounded-3xl h-64 mx-10 flex flex-col justify-around mt-12 ">
              <div className="mx-10 mt-4">
                <p className="text-primary font-semibold text-2xl mt-2 dark:text-PrimaryDark">
                  Price per night
                </p>
                <div className="flex space-x-3 mt-8">
                  <div className="w-28 h-14 bg-white border border-custom p-1 rounded dark:bg-transparent dark:border-[#DBD6D3]">
                    <label
                      htmlFor="minInput"
                      className="font-semibold dark:text-[#DDD1C5]"
                    >
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
                      className="w-full border-none border-b-2 border-black focus:outline-none focus:border-custom-500 dark:text-[#F0C7AD]"
                    />
                  </div>
                  <div className="w-28 h-14 bg-white border border-custom p-1 rounded-lg   dark:bg-transparent dark:border-[#DBD6D3]">
                    <label
                      htmlFor="maxInput"
                      className="font-semibold dark:text-[#DDD1C5]"
                    >
                      Max
                    </label>
                    <input
                      type="text"
                      value={value[1]}
                      onChange={(event) =>
                        setValue([
                          value[0],
                          event.target.value === ""
                            ? 400
                            : parseInt(event.target.value),
                        ])
                      }
                      min="0"
                      className="w-full border-none border-b-2 border-black focus:outline-none focus:border-blue-500 dark:text-[#F0C7AD]"
                    />
                  </div>
                </div>
                <div className="flex mt-10 dark:text-PrimaryDark ">
                  <RangeSlider
                    min={0}
                    max={10000}
                    value={value}
                    onInput={onValueChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* card */}

          <div className="flex flex-wrap justify-center gap-6 overflow-hidden ">
            {isloading ? (
              <div className="w-[600px] flex justify-center items-center">
                <Loader />
              </div>
            ) : rooms.length > 0 ? (
              rooms.map((room, index) => (
                <div
                  className="w-full sm:max-w-96 rounded-3xl overflow-hidden shadow-lg border border-secondary border-opacity-40 dark:border-footer"
                  key={room._id}
                >
                  <img
                    className="w-full h-64 object-cover "
                    src={room.images[0]}
                    alt=""
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2 text-primary dark:text-PrimaryDark">
                      {room.roomTypeId.type_en}
                    </div>
                    <p className="text-primary opacity-80 font-semibold text-sm text-justify tracking-tight mt-4 dark:text-[#CBB7A4]">
                      {truncated[index] ? (
                        <div>
                          {room.description_en}
                          <button
                            className="underline"
                            onClick={() => toggleTruncated(index)}
                          >
                            Less
                          </button>
                        </div>
                      ) : (
                        <LinesEllipsis
                          text={room.description_en}
                          maxLine={2}
                          ellipsis={
                            <button onClick={() => toggleTruncated(index)}>
                              ....
                            </button>
                          }
                        />
                      )}
                    </p>
                    <hr className=" border-primary opacity-40 mt-4 dark:border-footer" />
                  </div>
                  <div className="px-6 text-center">
                    <div className="flex justify-center gap-6">
                      {room.amenitiesIds &&
                        room.amenitiesIds.map((r) => (
                          <div key={r._id}>
                            <div className="w-10 h-10 bg-secondary rounded-full flex justify-center">
                              <img
                                src={r.images && r.images}
                                alt="rooms"
                                width={"25px"}
                                height={"20px"}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <hr className=" border-primary opacity-40  mt-4 dark:border-footer" />
                    <div className="w-full flex justify-between py-8">
                      <button className="w-42 bg-primary text-white text-sm opacity-95 py-3 px-4 rounded-full inline-flex items-center dark:bg-[#E2C8AD] dark:text-customDark font-semibold">
                        <Link to={`/reservation-room/${room._id}`}>
                          Book now for ${room.price}
                        </Link>
                      </button>
                      <button className="w-40 bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold py-2 px-4 inline-flex items-center justify-center dark:border-[#E2C8AD] dark:text-[#E2C8AD]">
                        <Link to={`/rooms/${room._id}`}>Check details</Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full mt-10 md:">
                <p className="text-2xl text-primary text-center font-semibold dark:text-[#ffffff]">
                  No rooms found matching your request.
                </p>
              </div>
            )}
          </div>
          {/* room */}
        </div>
        {/* rooms and cards */}
      </div>
      <div className="flex items-center justify-center py-3">
        {rooms.length ? (
          <Pagination
            handleLimit={handleLimit}
            limit={limit}
            pageCount={noOfPages}
            handlePageClick={handlePageClick}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Rooms;
