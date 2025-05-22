// import FormError from "./FormError";
// import { Controller } from "react-hook-form";
// import { Calendar } from "react-multi-date-picker";
// import { useEffect, useState } from "react";
// import DatePanel from "react-multi-date-picker/plugins/date_panel";
// export default function FormMultiDatePicker({
//   id,
//   control,
//   errors,
//   name,
//   rules,
//   label,
//   divClassName,
//   inputDivClassName,
//   errorMsg,
//   setDates,
//   Dates,
//   modal,
// }) {
//   const [date, setDate] = useState(Dates || []);

//   /* The useEffect hook is used to perform side effects in a functional component. In this case, the
//  useEffect hook is being used to update the state variable date whenever the modal prop
//  changes. */
//   useEffect(() => {
//     setDate(Dates || []);
//   }, [modal]);
//   /**
//    * The convertDateData function takes an array of date ranges and converts each range into an array
//    * of JavaScript Date objects.
//    * @param dateArray - An array of date ranges, where each element is a subarray containing two
//    * elements: the start date and the end date of the range.
//    * @returns The convertDateData function is returning an array of date objects. Each element in the
//    * array is a subarray containing two date objects - the first element is the converted startDate and
//    * the second element is the converted endDate.
//    */
//   const convertDateData = (dateArray) => {
//     return dateArray.map(([startDate, endDate]) => [
//       new Date(startDate),
//       new Date(endDate),
//     ]);
//   };

//   const convertToDates = (timestamp) => new Date(timestamp);

//   // Map over the outer array and convert timestamps to Date objects
//   useEffect(() => {
//     let allDates = [];
//     date &&
//       date?.forEach((innerArray) => {
//         if (Array.isArray(innerArray)) {
//           if (innerArray.length === 2) {
//             // Convert the range to an array of Date objects
//             const rangeDates = innerArray.map(convertToDates);
//             allDates.push(rangeDates);
//           } else {

//             // Convert the single date to a Date object
//             allDates.push(convertToDates(innerArray[0]));
//           }
//         }
//       });
//     setDates(allDates);
//   }, [date]);

//   const handleDateChange = (newDate) => {
//     // const data = newDate.map((date) => [
//     //   new Date(date[0]?.toDate?.().toString()),
//     //   new Date(date[1]?.toDate?.().toString()),
//     // ]);
//     setDate(newDate);
//   };

//   const initialProps = {
//     multiple: true,
//     range: true,
//   };

//   const removeNonArrayValues = (inputArray) => {
//     return inputArray.filter((item) => Array.isArray(item));
//   };

//   return (
//     <div className={divClassName || "form-group"}>
//       <label htmlFor={id}>{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         rules={rules}
//         render={({ field: { onChange, value, inputRef } }) => (
//           <div className={inputDivClassName || "signup-input"}>
//             <Calendar
//               multiple
//               range
//               rangeHover
//               showOtherDays
//               minDate={new Date()}
//               onChange={handleDateChange}
//               value={convertDateData(date)}
//               className={`form-control ${errors[name]?.message && "required"}`}
//               plugins={[
//                 <DatePanel
//                   position={"right"}
//                   sort="date"
//                   eachDaysInRange={
//                     !initialProps.onlyMonthPicker &&
//                     !initialProps.onlyYearPicker
//                   }
//                 />,
//               ]}
//             />
//           </div>
//         )}
//       />
//       <FormError msg={errorMsg || errors[name]?.message} />
//     </div>
//   );
// }

import FormError from "./FormError";
import { Controller } from "react-hook-form";
import { Calendar } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function FormMultiDatePicker({
  id,
  control,
  errors,
  name,
  rules,
  label,
  divClassName,
  inputDivClassName,
  errorMsg,
  setDates,
  Dates,
  modal,
  minDate,
  maxDate
}) {
  const [date, setDate] = useState(Dates || []);

  /* The useEffect hook is used to perform side effects in a functional component. In this case, the
 useEffect hook is being used to update the state variable date whenever the modal prop
 changes. */
  useEffect(() => {
    setDate(Dates || []);
  }, [modal]);
  /**
   * The convertDateData function takes an array of date ranges and converts each range into an array
   * of JavaScript Date objects.
   * @param dateArray - An array of date ranges, where each element is a subarray containing two
   * elements: the start date and the end date of the range.
   * @returns The convertDateData function is returning an array of date objects. Each element in the
   * array is a subarray containing two date objects - the first element is the converted startDate and
   * the second element is the converted endDate.
   */

  const convertDateData = (dateArray) => {
    return dateArray.map((startDate) => new Date(startDate));
  };

  useEffect(() => {
    let allDates = [];
    date &&
      date.forEach((timestamp) => {
        const dateObject = new Date(timestamp);
        allDates.push(dateObject);
      });
    setDates(allDates);
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const initialProps = {
    multiple: true,
  };

  return (
    <div className={divClassName || "form-group"}>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, inputRef } }) => (
          <div className={inputDivClassName || "signup-input"}>
            <Calendar
              multiple
              showOtherDays
              minDate={minDate}
              maxDate={maxDate}
              onChange={handleDateChange}
              value={convertDateData(date)}
              className={`form-control ${errors[name]?.message && "required"}`}
              plugins={[
                <DatePanel
                  position={"right"}
                  sort="date"
                  eachDaysInRange={
                    !initialProps.onlyMonthPicker &&
                    !initialProps.onlyYearPicker
                  }
                />,
              ]}
            />
          </div>
        )}
      />
      <FormError msg={errorMsg || errors[name]?.message} />
    </div>
  );
}
