// import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
// import DateRangePickerComponent from "./DateRangePicker"

// const roomCard = () => {
//   return (
//     <div>
//         <div className="flex w-[140px] md:w-[400px] justify-between flex-col md:flex-row">
//             <div className="flex flex-col justify-between relative">
//               <button
//                 className="text-white bg-main-100 px-4 py-2 my-2 w-[140px] rounded-3xl flex items-center justify-between"
//                 onClick={toggleHandler}
//               >
//                 <span>Check date</span>
//                 {showCalendar ? (
//                   <IoMdArrowDropup className="ml-2" />
//                 ) : (
//                   <IoMdArrowDropdown className="ml-2" />
//                 )}
//               </button>
//               {showCalendar && (
//                 <DateRangePickerComponent
//                   handleDate={handleDate}
//                   selectedDates={selectedDates}
//                   disabledDates={disabledDates}
//                   from="form"
//                 />
//               )}
//             </div>
//             <div className="flex justify-between gap-0 md:gap-4 flex-col md:flex-row">
//               <div className=" flex md:flex-col justify-between items-center text-main-100 ">
//                 <span>Start</span>
//                 <div className="py-2 ">
//                   {selectedDates[0]?.toString().substring(0, 11)}
//                 </div>
//               </div>
//               <div className=" flex md:flex-col justify-between items-center text-main-100">
//                 <span>End</span>
//                 <span className="py-2">
//                   {selectedDates[1]?.toString().substring(0, 11)}
//                 </span>
//               </div>
//             </div>
//           </div>
//     </div>
//   )
// }

// export default roomCard