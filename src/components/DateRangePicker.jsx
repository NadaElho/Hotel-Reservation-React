import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePickerComponent = ({
  handleDate,
  selectedDates,
  disabledDates,
  from,
}) => {
  const [checkinDate, setCheckinDate] = useState(
    selectedDates[0] ? selectedDates[0] : new Date()
  );
  const [checkoutDate, setCheckoutDate] = useState(
    selectedDates[1] ? selectedDates[1] :  new Date()
  );

  const handleSelect = (date) => {
    const startDate = new Date(date.selection.startDate);
    const endDate = new Date(date.selection.endDate);

    if (startDate.getTime() === endDate.getTime()) {
      endDate.setDate(endDate.getDate() + 1);
    }

    setCheckinDate(startDate);
    setCheckoutDate(endDate);

    handleDate([startDate, endDate]);
    if (from == "form" || from == "room") {
      localStorage.setItem("checkin", startDate);
      localStorage.setItem("checkout", endDate);
    }
  };
  const selectionRange = {
    startDate: checkinDate,
    endDate: checkoutDate,
    key: "selection",
  };
  return (
    <DateRangePicker
      className="bg-white absolute top-[56px] z-10 -left-[95px] md:left-0"
      ranges={[selectionRange]}
      onChange={handleSelect}
      minDate={new Date()}
      disabledDates={disabledDates}
      rangeColors={["#AA9383"]}
    />
  );
};

export default DateRangePickerComponent;
