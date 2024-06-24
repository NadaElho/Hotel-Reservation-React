import { useEffect, useMemo, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";

import Pagination from "../components/Pagination";
import axiosInstance from "../../interceptor";
import LinesEllipsis from "react-lines-ellipsis";
import Loader from "../components/Loader";
import Amenity from "../components/Amenity";
import useDebounce from "../../useDebounce";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ReactStars from "react-rating-stars-component";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Rooms = ({ truncated, toggleTruncated }) => {
  const [value, setValue] = useState([0, 10000]);
  const [ratingAvg, setRatingAvg] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [params] = useSearchParams();
  const [pageNum, setPageNum] = useState(0);
  const [limit, setLimit] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isloading, setLoading] = useState(true);
  const isArabic = localStorage.getItem("lang") == "ar";
  const [favouriteRooms, setFavouriteRooms] = useState([]);
  const [favouriteRoomsIds, setFavouriteRoomsIds] = useState([]);
  const [changed, setChanged] = useState(false);

  const { t } = useContext(LanguageContext);
  const debounceValue = useDebounce(value, 500);
  const userId = localStorage.getItem("userId");

  const onValueChange = (values) => {
    setValue([...values]);
  };
  const onRatingChange = (rating) => {
    setRatingAvg(rating);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/rooms", {
          params: {
            "price[gt]": debounceValue[0],
            "price[lt]": debounceValue[1],
            "ratingAvg[gte]": ratingAvg,
            page: pageNum + 1,
            limit: limit,
            ...filterObj,
          },
        });
        setRooms(res.data.data);
        setLoading(false);
        setNoOfPages(res.data.pagination.numberPages);
        setLoading(false);

        const { data } = await axiosInstance.get(`/rooms/favourites/${userId}`);
        const FavRooms = data.data.map((room) => {
          return room._id;
        });
        setFavouriteRoomsIds(FavRooms);
        setFavouriteRooms(data.data);
      } catch (err) {
        if (err.response.data.message == "No rooms found") {
          setRooms([]);
        }
      }
    }

    fetchData();
  }, [
    debounceValue,
    ratingAvg,
    pageNum,
    limit,
    filterObj,
    userId,
    changed,
  ]);

  const handleAddToFavourite = async (roomId) => {
    if (favouriteRooms.includes(roomId)) {
      setFavouriteRooms((prev) => prev.filter((favRoom) => favRoom !== roomId));
      setChanged((prev) => !prev);
    } else {
      await axiosInstance.post(`/rooms/favourites/${userId}`, {
        roomId,
      });
      setChanged((prev) => !prev);
      setFavouriteRooms((prev) => [...prev, roomId]);
    }
  };
  return (
    <>
      <div className="container mx-auto flex flex-col  mt-16">
        <Amenity />

        <div className="flex gap-2 mt-20">
          <div className="w-[400px] hidden xl:block ">
            <p className=" mx-11 text-primary font-semibold text-2xl dark:text-[#CBB7A4]">
              {t("rooms.filter-by")}
            </p>
            <div className="w-[380px] h-64 mx-10 flex flex-col justify-around mt-12 ">
              <div className="mx-4 mt-4">
                <p className="text-primary font-semibold text-2xl mt-2 dark:text-PrimaryDark">
                  {t("rooms.Price-night")}
                </p>
                <div className={`flex w-full gap-4 mt-8 `}>
                  <div className="w-28 h-14 bg-white border border-secondary p-1 rounded-lg   dark:bg-transparent dark:border-[#DBD6D3]">
                    <label
                      htmlFor="minInput"
                      className="font-semibold text-secondary mx-4 dark:text-[#DDD1C5]"
                    >
                      {t("rooms.Min")}
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
                      className="w-full text-secondary  mx-4 border-none border-b-2 border-black focus:outline-none focus:border-custom-500 dark:text-[#F0C7AD]"
                    />
                  </div>
                  <div className="w-28 h-14 bg-white border border-secondary p-1 rounded-lg   dark:bg-transparent dark:border-[#DBD6D3]">
                    <label
                      htmlFor="maxInput"
                      className="font-semibold text-secondary  mx-4 dark:text-[#DDD1C5]"
                    >
                      {t("rooms.Max")}
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
                      className="w-full mx-4 text-secondary border-none border-b-2 border-black focus:outline-none focus:border-blue-500 dark:text-[#F0C7AD]"
                    />
                  </div>
                </div>

                <div
                  className={`flex mt-10 ${
                    localStorage.getItem("dark") == "dark"
                      ? "darkMode"
                      : "lightMode"
                  } `}
                >
                  <RangeSlider
                    min={0}
                    max={10000}
                    value={value}
                    onInput={onValueChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-10 mx-4">
                <hr className="border border-secondary" />
                <p className="text-primary font-semibold text-xl mt-10 dark:text-PrimaryDark">
                  {t("rooms.Rating")}
                </p>
                <ReactStars size={30} onChange={onRatingChange} />
              </div>
            </div>
          </div>

          {/* card */}

          <div className=" w-full flex flex-wrap  justify-center gap-6 overflow-hidden ">
            {isloading ? (
              <div className="w-[600px] flex justify-center items-center">
                <Loader />
              </div>
            ) : rooms.length > 0 ? (
              rooms.map((room, index) => (
                <div
                  className="relative w-full sm:max-w-96 rounded-3xl   overflow-hidden shadow-lg border border-secondary border-opacity-40 dark:border-footer"
                  key={room._id}
                >
                  <img
                    className="w-full h-64 object-cover "
                    src={room.images[0]}
                    alt=""
                  />
                  <div
                    className={`absolute top-2 px-4 w-full flex ${
                      isArabic ? "flex-row-reverse" : "flex-row"
                    } justify-between items-center`}
                  >
                    {room.promotionId.map((promotion) => (
                      <div
                        className={`bg-[#C2AF00] text-white py-1 px-2 rounded-full mt-2 `}
                        key={promotion._id}
                      >
                        <p>
                          {isArabic ? (
                            <>
                              {t("rooms.off")} {promotion.percentage}%{" "}
                            </>
                          ) : (
                            <>
                              {promotion.percentage}% {t("rooms.off")}
                            </>
                          )}
                        </p>
                      </div>
                    ))}

                    <div
                      className={`absolute top-2 right-3 w-8 h-8 bg-white flex justify-center items-center rounded-full `}
                    >
                      <button onClick={() => handleAddToFavourite(room._id)}>
                        {favouriteRoomsIds &&
                        favouriteRoomsIds.includes(room._id) ? (
                          <FaHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                        ) : (
                          <FaRegHeart className="text-red-900 text-2xl text-center cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="px-2 py-3 flex flex-col">
                    <div className="font-bold text-2xl capitalize text-primary dark:text-PrimaryDark">
                      {isArabic
                        ? room.roomTypeId.type_ar
                        : room.roomTypeId.type_en + " " + "Room"}
                    </div>
                    <ReactStars size={16} value={room.ratingAvg} edit={false} />
                    <div className="text-primary opacity-80 font-semibold text-sm dark:text-[#CBB7A4]">
                      {truncated[index] ? (
                        <div>
                          {isArabic ? room.description_ar : room.description_en}
                          <button
                            className="underline"
                            onClick={() => toggleTruncated(index)}
                          >
                            {t("rooms.less")}
                          </button>
                        </div>
                      ) : (
                        <LinesEllipsis
                          text={
                            isArabic ? room.description_ar : room.description_en
                          }
                          maxLine={2}
                          ellipsis={
                            <button onClick={() => toggleTruncated(index)}>
                              ....
                            </button>
                          }
                        />
                      )}
                    </div>
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
                    <hr className=" border-primary opacity-40 w-full mt-4 dark:border-footer" />

                    <div className="w-full flex justify-center items-center md:justify-between  gap-2 py-5 md:py-6 ">
                      <button className="w-1/3 text-xs py-2 md:py-3  bg-primary text-white md:w-44 md:text-sm opacity-95 rounded-full inline-flex justify-center items-center dark:bg-[#E2C8AD] dark:text-customDark font-semibold ">
                        <Link to={`/reservation-room/${room._id}`}>
                          {t("rooms.book-now")} ${room.price}
                        </Link>
                      </button>
                      <button className="w-1/3 text-xs py-2 md:py-3 md:w-40  md:text-sm bg-transparent border border-primary rounded-full text-primary opacity-95 font-semibold inline-flex items-center justify-center dark:border-[#E2C8AD] dark:text-[#E2C8AD]">
                        <Link to={`/rooms/${room._id}`}>
                          {t("rooms.Check-details")}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full mt-10 md:">
                <p className="text-2xl text-primary text-center font-semibold dark:text-[#ffffff]">
                  {t("rooms.failed-request")}
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
