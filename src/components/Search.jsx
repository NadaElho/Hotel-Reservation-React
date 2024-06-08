import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../interceptor";
import { IoSearchCircle } from "react-icons/io5";
import DateRangePickerComponent from "./DateRangePicker";
import { Link } from "react-router-dom";
import { LanguageContext } from "../providers/LanguageContext";

export const Search = () => {
  const [searchInput, setSearchInput] = useState({
    hotel: { id: "", name: "" },
    roomsType: { id: "", name: "" },
  });
  const [hotelData, setHotelData] = useState(null);
  const [roomsTypes, setRoomsTypes] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState(hotelData);
  const [filteredTypes, setFilteredTypes] = useState(roomsTypes);
  const storedCheckIn = localStorage.getItem("checkin");
  const storedCheckOut = localStorage.getItem("checkout");
  const [selectedDates, setSelectedDates] = useState([
    storedCheckIn ? new Date(storedCheckIn) : new Date(),
    storedCheckOut
      ? new Date(storedCheckOut)
      : new Date(new Date().setDate(new Date().getDate() + 1)),
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDropDown, setShowDropDown] = useState({
    hotels: false,
    roomsType: false,
  });
  const { t } = useContext(LanguageContext);
  const isArabic = localStorage.getItem("lang") == "ar";
  const dateRef = useRef();
  const options = {
    month: "short",
    day: "numeric",
  };
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/hotels");
      setHotelData(data.data);
    })();

    (async () => {
      const { data } = await axiosInstance.get("/room-type");
      setRoomsTypes(data.data);
    })();

    const handleClickOutside = (e) => {
      setShowDropDown({ hotels: false, roomsType: false });
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setShowCalendar(false);
      } else if (e.target.dataset.id == "button") {
        setShowCalendar((show) => (show = !show));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchHotels = (e) => {
    setShowDropDown((prev) => ({ ...prev, hotels: true }));
    setFilteredHotels(hotelData);
    setSearchInput((prev) => ({
      ...prev,
      hotel: { name: e.target.value, id: "" },
    }));
    const filtered = hotelData?.filter((hotel) => {
      return (
        hotel.name_en.toLowerCase().includes(e.target.value.toLowerCase()) ||
        hotel.name_ar.includes(e.target.value)
      );
    });
    setFilteredHotels(filtered);
  };

  const handleSearchTypes = (e) => {
    setShowDropDown((prev) => ({ ...prev, roomsType: true }));
    setFilteredTypes(roomsTypes);
    setSearchInput((prev) => ({
      ...prev,
      roomsType: { name: e.target.value, id: "" },
    }));
    const filtered = roomsTypes?.filter((roomsType) => {
      return (
        roomsType.type_en
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        roomsType.type_ar.includes(e.target.value)
      );
    });
    setFilteredTypes(filtered);
  };
  const handleDate = (checkIn, checkOut) => {
    setSelectedDates(checkIn, checkOut);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" flex items-center gap-3 justify-center bg-white flex-col md:flex-row rounded-3xl p-2 md:p-0 md:rounded-full w-fit">
        <div className="flex flex-col w-[200px] md:ms-6 items-center md:items-start">
          <div className="text-main-400 font-bold pl-1 -mb-1">
            {t("search.where")}
          </div>
          <div className="relative group">
            <input
              id="search-input"
              className="block w-full p-1 rounded-md rtl:md:placeholder:text-right text-main-400 outline-none text-sm placeholder:text-main-400 placeholder:text-center md:placeholder:text-left"
              type="text"
              placeholder={t("search.destination")}
              onChange={handleSearchHotels}
              value={searchInput.hotel.name}
            />
            {filteredHotels && (
              <div
                id="dropdown-menu"
                className="absolute w-full bg-white rounded-md mt-1 z-10 ring-0 ring-opacity-0"
              >
                {showDropDown.hotels &&
                  filteredHotels.map((data) => {
                    return (
                      <div
                        key={data._id}
                        onClick={() =>
                          setSearchInput((prev) => ({
                            ...prev,
                            hotel: {
                              id: data._id,
                              name: isArabic ? data.name_ar : data.name_en,
                            },
                          }))
                        }
                        className="block px-4 py-2 hover:bg-main-100 hover:text-white cursor-pointer rounded-md"
                      >
                        {isArabic ? data.name_ar : data.name_en}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className="relative my-2 border border-y-main-300 border-x-transparent md:border-y-0 md:border-x-main-300">
          <button
            data-id="button"
            className="text-main-800 px-4 w-[140px] rounded-3xl flex flex-col items-center md:items-start"
          >
            <span data-id="button" className="text-main-400 font-bold">
              {t("booking.check-date")}
            </span>
            <span data-id="button" className="text-main-400 text-sm py-1">{`${
              selectedDates[0]
                ? selectedDates[0].toLocaleDateString(
                    isArabic ? "ar-EG" : "en-US",
                    options
                  ) +
                  " - " +
                  selectedDates[1].toLocaleDateString(
                    isArabic ? "ar-EG" : "en-US",
                    options
                  )
                : "Add dates"
            }`}</span>
          </button>
          {showCalendar && (
            <div ref={dateRef}>
              <DateRangePickerComponent
                handleDate={handleDate}
                selectedDates={selectedDates}
                disabledDates={[]}
                from="search"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col w-[200px] items-center md:items-start">
          <div className="text-main-400 font-bold pl-1 -mb-1">
            {t("search.room-type")}
          </div>
          <div className="relative group">
            <input
              id="search-input"
              className="block w-full p-1 rounded-md outline-none text-main-400 text-sm rtl:md:placeholder:text-right placeholder:text-main-400 placeholder:text-center md:placeholder:text-left"
              type="text"
              placeholder={t("search.search-type")}
              onChange={handleSearchTypes}
              value={searchInput.roomsType.name}
            />
            {filteredTypes && (
              <div
                id="dropdown-menu"
                className="absolute w-full bg-white rounded-md mt-1 ring-0 z-10 ring-opacity-0"
              >
                {showDropDown.roomsType &&
                  filteredTypes.map((data) => (
                    <div
                      key={data.type_en}
                      onClick={() =>
                        setSearchInput((prev) => ({
                          ...prev,
                          roomsType: {
                            id: data._id,
                            name: isArabic ? data.type_ar : data.type_en,
                          },
                        }))
                      }
                      className="block px-4 py-2 hover:bg-main-100 hover:text-white cursor-pointer rounded-md"
                    >
                      {isArabic ? data.type_ar : data.type_en}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <Link
          to={`/rooms?checkIn=${new Date(
            selectedDates[0]
          ).toISOString()}&checkOut=${new Date(
            selectedDates[1]
          ).toISOString()}&hotelId=${searchInput.hotel.id}&roomTypeId=${
            searchInput.roomsType.id
          }`}
        >
          <IoSearchCircle
            color="#AA9383"
            size="3.5em"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
    </div>
  );
};
