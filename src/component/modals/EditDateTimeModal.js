import { NextArrowIcon, PrevArrowIcon } from "assets/svg";
import AddJobPostingStepFourth from "component/jobPosting/steps/AddJobPostingStepFourth";
import AddJobPostingStepSecond from "component/jobPosting/steps/AddJobPostingStepSecond";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useState, useEffect } from "react";
import { api } from "api/Api";
import { UPDATE_JOB_URL } from "constants/ApiUrls";
import {
  RESPONSE_OK,
  SameShiftTime,
  TOTAL_HOURS,
} from "constants/AppConstants";
import { sort } from "radash";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);
dayjs.extend(utc);

export default function EditDateTimeModal({
  modal,
  toggle,
  data,
  callbackFn,
  step,
}) {
  const {
    register,
    control,
    trigger,
    reset,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const arrivalTimeValue = watch("arrivalTime");
  const endTimeValue = watch("endTime");
  const jobSlotValue = watch("jobSlots");
  const [curStep, setCurStep] = useState(1);
  const [hideStepThird, setHideStepThird] = useState(false);
  const [loader, setLoader] = useState(false);
  const [initialArrivalTime, setInitialArrivalTime] = useState(null);
  const [totalPay, setTotalPay] = useState(0);
  const [error, setErrors] = useState("");
  const [Dates, setDates] = useState([]);

  const convertToDateString = (timestamp) => new Date(timestamp).toString();

  //for single date picker
  const convertArray = (dataArray) => {
    const allDates = dataArray.flatMap((data) => {
      let dateArray;

      if (Array.isArray(data.startDate) && Array.isArray(data.endDate)) {
        // For date ranges
        dateArray = [
          convertToDateString(data.startDate[0]),
          convertToDateString(data.endDate[0]),
        ];
      } else {
        // For single dates
        dateArray = [data.startDate];
      }
      // Set Dates directly in the specified output format
      data.dates = dateArray;

      return data.dates;
    });

    return { dataArray, allDates };
  };

  const { dataArray, allDates } = convertArray(data?.jobSlots);

  /* The above code is using the useEffect hook in React to update the state variable "dates" with the
  value of "allDates" whenever the "dataArray" dependency changes. */
  useEffect(() => {
    setDates(allDates);
  }, [dataArray]);

  useEffect(() => {
    if (!modal) return;
    setCurStep(step || 1);
    let temp = JSON.parse(JSON.stringify(data));
    temp.jobSlots = sort(temp.jobSlots, (f) => f.startDate);

    // temp.jobSlots.map((slot) => {
    //   slot.startDate = convertServerDateToDate(slot.startDate);
    //   slot.endDate = convertServerDateToDate(slot.endDate);
    // });

    let arrTime = new Date(temp.jobSlots[0].startDate);

    let endTime = new Date(temp.jobSlots[0].endDate);

    setInitialArrivalTime(new Date(temp.jobSlots[0].startDate));
    let dates = [arrTime, temp.jobSlots[temp.jobSlots.length - 1].endDate];

    reset({
      ...data,
      facilityId: data.facilityId.id,
      dates: dates,
      arrivalTime: arrTime,
      endTime: endTime,
      jobSlots: temp.jobSlots,
    });
  }, [modal]);

  /* This `useEffect` hook is checking if the `arrivalTimeValue` has changed and if it is not the same as
the `initialArrivalTime`. If it is not the same, it sets the value of the "endTime" field to null
using the `setValue` function from `react-hook-form`. */
  useEffect(() => {
    if (
      initialArrivalTime &&
      arrivalTimeValue &&
      !dayjs(initialArrivalTime).isSame(dayjs(arrivalTimeValue))
    )
      setValue("endTime", null);
  }, [arrivalTimeValue]);

  //forSingleMultipleDatePicker
  useEffect(() => {
    if (!Dates || !Dates.length) return;

    let startHour = 0;
    let startMinute = 0;
    let endHour = 0;
    let endMinute = 0;

    if (arrivalTimeValue) {
      startHour = dayjs(arrivalTimeValue).tz(data.timeZone).get("hour");
      startMinute = dayjs(arrivalTimeValue).tz(data.timeZone).get("minute");
    }
    if (endTimeValue) {
      endHour = dayjs(endTimeValue).tz(data.timeZone).get("hour");
      endMinute = dayjs(endTimeValue).tz(data.timeZone).get("minute");
    }

    let temp = [];
    let allDates = [];

    Dates.forEach((innerArray) => {
      if (Array.isArray(innerArray)) {
        // If it's a range
        const arrDate = dayjs(innerArray[0]).startOf("day");
        const endDate = dayjs(innerArray[1]).startOf("day");
        const diffInDates = endDate.diff(arrDate, "days");

        for (let i = 0; i <= diffInDates; i++) {
          const date = arrDate.add(i, "day");
          allDates.push(date);
        }
      } else {
        // If it's a single date
        const date = dayjs(innerArray).startOf("day");
        allDates.push(date);
      }
    });

    // Sort allDates
    allDates.sort((a, b) => a.diff(b));

    let sortOrderCounter = 1;
    temp = allDates.map((date) => ({
      sortOrder: sortOrderCounter++,
      startDate: date
        .add(startHour, "hours")
        .add(startMinute, "minute")
        .toDate(),
      endDate: date.add(endHour, "hours").add(endMinute, "minute").toDate(),
      day: date.get("day"),
      isAvailable: true,
    }));

    setValue("jobSlots", temp);
  }, [Dates, arrivalTimeValue, endTimeValue]);

  const removeNonArrayValues = (inputArray) => {
    return inputArray.filter((item) => Array.isArray(item));
  };

  const handleNextClick = async () => {
    let validationResult;

    switch (curStep) {
      //forSingleMultipleDatePicker
      case 1:
        if (!Dates || Dates.length === 0) {
          setError("dates", {
            type: "manual",
            message: "Please select at least one date.",
          });
        } else {
          setError("dates", null);
          setCurStep(curStep + 1);
        }
        break;
      // case 2:
      //   validationResult = await trigger(["arrivalTime", "endTime"]);
      //   setErrors("");
      //   if (validationResult && hideStepThird) {
      //     onSubmit();
      //     return;
      //   }
      //   break;
      case 2:
        validationResult = await trigger(["arrivalTime", "endTime"]);
        if (validationResult) onSubmit();
        break;
      default:
        break;
    }
    if (validationResult && curStep !== 2) setCurStep(curStep + 1);
  };

  const onSubmit = () => {
    const data = getValues();
    data.jobSlots = data.jobSlots.map((slot) => {
      return {
        ...slot,
        startDate: dayjs(slot.startDate?.getTime())
          .tz(data.timeZone, true)
          .utc()
          .valueOf(),
        endDate: dayjs(slot?.startDate).isSame(dayjs(slot?.endDate))
          ? null
          : dayjs(slot.endDate?.getTime())
              .tz(data.timeZone, true)
              .utc()
              .valueOf(),
        empty: dayjs(slot?.startDate).isSame(dayjs(slot?.endDate)),
      };
    });
    if (data?.jobSlots?.every((e) => e?.empty === false)) {
      const totalPay = String(
        calculateTotalPayForJob(data?.jobSlots, data?.hourlyRate),
      );

      setErrors("");
      setLoader(true);
      api(UPDATE_JOB_URL, {
        ...data,
        totalPay,
      }).then((res) => {
        if (res.status === RESPONSE_OK) callbackFn();
        setLoader(false);
      });
    } else {
      setErrors(SameShiftTime);
    }
  };

  const calculateTotalPayForJob = (jobSlots, hourlyRate) => {
    if (!hourlyRate) return;
    const jobSlotsUp = jobSlots?.map((e) => {
      return {
        ...e,
        startDate: new Date(e?.startDate),
        endDate: new Date(e?.endDate),
      };
    });

    let [totalHours, totalHoursFull] = TOTAL_HOURS(jobSlotsUp);

    let totalPay = totalHoursFull * parseInt(hourlyRate);

    setTotalPay(totalPay);
    return totalPay;
  };

  const commonProps = { register, control, errors, trigger };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}>
      <ModalHeader
        toggle={() => {
          toggle();
          // getList();
        }}>
        Edit Date & Time
      </ModalHeader>
      <Form>
        <>
          <ModalBody>
            {curStep === 1 && (
              <AddJobPostingStepSecond
                {...commonProps}
                isEdit={true}
                setValue={setValue}
                modal={modal}
                disabled={false}
                Dates={Dates}
                setDates={setDates}
              />
            )}
            {/* {curStep === 2 && (
              <AddJobPostingStepThird
                {...commonProps}
                arrivalTimeValue={arrivalTimeValue}
                multiLabel={!hideStepThird}
              />
            )} */}
            {curStep === 2 && !hideStepThird && (
              <AddJobPostingStepFourth
                {...commonProps}
                useFieldArray={useFieldArray}
                jobSlotValue={jobSlotValue}
                calculateTotalPayForJob={calculateTotalPayForJob}
                setTotalPay={setTotalPay}
                totalPay={totalPay}
                setValue={setValue}
                error={error}
              />
            )}
          </ModalBody>
          <div className="modal-footer">
            {curStep > 1 && (!step || curStep > step) && (
              <button
                type="button"
                className="pt-btn btn-primary pt-btn-small"
                onClick={() => setCurStep(curStep - 1)}>
                <PrevArrowIcon /> Prev
              </button>
            )}
            <button
              disabled={loader}
              type={"button"}
              className="pt-btn btn-primary pt-btn-small edit-job-footer"
              onClick={() => handleNextClick()}>
              {loader ? (
                <Spinner color="light" />
              ) : (
                <span>
                  {curStep === 2 || (curStep === 1 && hideStepThird)
                    ? "Update"
                    : "Next"}{" "}
                  {curStep === 2 || (curStep === 1 && hideStepThird) ? (
                    <></>
                  ) : (
                    <NextArrowIcon />
                  )}
                </span>
              )}
            </button>
          </div>
        </>
      </Form>
    </Modal>
  );
}
