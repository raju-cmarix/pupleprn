import { api } from "api/Api";
import { NextArrowIcon, PrevArrowIcon } from "assets/svg";
import AddJobPostingLocationStep from "component/jobPosting/steps/AddJobPostingLocationStep";
import AddJobPostingStepFifth from "component/jobPosting/steps/AddJobPostingStepFifth";
import AddJobPostingStepFirst from "component/jobPosting/steps/AddJobPostingStepFirst";
import AddJobPostingStepFourth from "component/jobPosting/steps/AddJobPostingStepFourth";
import AddJobPostingStepSecond from "component/jobPosting/steps/AddJobPostingStepSecond";
import AddJobPostingStepSixth from "component/jobPosting/steps/AddJobPostingStepSixth";
import AddJobPostingStepThird from "component/jobPosting/steps/AddJobPostingStepThird";
import {
  ADD_JOB_POST_URL,
  GET_MEDIAN_WAGE,
  LAST_JOB_POSTED,
} from "constants/ApiUrls";
import {
  FIRST_LETTER_CAPITAL,
  RESPONSE_OK,
  TOTAL_HOURS,
} from "constants/AppConstants";
import dayjs from "dayjs";
import { isEmpty } from "radash";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { getLatLng, getTimeZone } from "utils/Utils";
import { facilityTypeOptions } from "views/authentication/signUpClinician/HourlyConstant";

export default function PostAJobModal({
  modal,
  toggle,
  facilityId,
  facilityInfo,
  resetList,
  data,
  facilityDataLoader,
}) {
  const defaultValues = { jobSlots: [{}], lat: null, long: null };
  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues,
  });
  const arrivalTimeValue = watch("arrivalTime");
  const endTimeValue = watch("endTime");
  const jobSlotValue = watch("jobSlots");
  const hourlyRateValue = watch("hourlyRate");
  const clinicianType = watch("clinicianType");
  const zipCodeValue = watch("zipCode");
  const [Dates, setDates] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [totalPay, setTotalPay] = useState(0);
  const [curStep, setCurStep] = useState(0);
  const [loader, setLoader] = useState(false);
  const [showStepFourth, setShowStepFourth] = useState(false);
  const commonProps = { register, control, errors, trigger };
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [lastJobData, setLastJobData] = useState();
  const [wagesData, setWagesData] = useState(null);
  const [intervalInMinutes, setIntervalInMinutes] = useState(0);
  const role = localStorage.getItem("userRole");

  let indexStepFields = ["addresses"];

  let firstStepFields = [
    "facilityType",
    "clinicianType",
    "hourlyRate",
    "minimumExperince",
    "jobAddress1",
    "jobDescription",
    "city",
    "state",
    "zipCode",
  ];

  const fetchLastJob = async () => {
    if (role === "facility" || role === "admin") {
      try {
        const response = await api(LAST_JOB_POSTED, {}, facilityId);

        if (response.status === RESPONSE_OK) {
          const jobData = response.data.lastJob[0];

          setLastJobData(jobData);
        }
      } catch (error) {
        console.error("Error fetching last job posted:", error);
      }
    } else {
      setLastJobData(null);
    }
  };

  useEffect(() => {
    if (facilityId) {
      fetchLastJob();
    }
  }, [facilityId]);

  useEffect(() => {
    if (!modal) return;
    if (!selectedAddressData && clinicianType && curStep === 1) {
      getMedianWage(zipCodeValue, clinicianType);
    } else if (clinicianType && selectedAddressData && curStep === 1) {
      getMedianWage(selectedAddressData.zipCode, clinicianType);
    }
  }, [modal, curStep, clinicianType]);

  const getMedianWage = async (zipCode, clinicianType) => {
    if (zipCode.length >= 5 && clinicianType) {
      try {
        const response = await api(GET_MEDIAN_WAGE, {}, null, {
          zipCode: zipCode,
          clinicianType: clinicianType,
        });
        if (response.status === RESPONSE_OK) {
          setWagesData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching median wage:", error);
      }
    }
  };

  useEffect(() => {
    setDates([]);
  }, [modal]);

  useEffect(() => {
    if (isEmpty(facilityInfo)) return;
    const facilityTypeOptionsNonOther = [...facilityTypeOptions]?.filter(
      (f) =>
        f?.value !== "Other" || !f?.value?.toLowerCase()?.startsWith("other")
    );

    const facilityDetailTypeNonOther = [...facilityInfo?.facilityType]?.filter(
      (f) => f !== "Other" || !f?.toLowerCase()?.startsWith("other")
    );

    let temp = facilityTypeOptionsNonOther.filter((type) =>
      facilityDetailTypeNonOther.includes(type.value)
    );

    for (let i = 0; i < facilityDetailTypeNonOther?.length; i++) {
      if (
        !facilityTypeOptionsNonOther.find(
          (f) => f.value === facilityDetailTypeNonOther[i]
        )
      ) {
        temp.push({
          label: facilityDetailTypeNonOther[i],
          value: facilityDetailTypeNonOther[i],
        });
      }
    }
    const inBuiltFacilityTypesValues = facilityTypeOptionsNonOther?.map(
      (e) => e?.value
    );
    temp = temp?.map((e) => {
      return {
        label:
          e?.value === "snf"
            ? e?.label?.toUpperCase()
            : e?.value === "ltacH"
            ? e?.label?.toUpperCase()
            : inBuiltFacilityTypesValues?.includes(e?.value)
            ? FIRST_LETTER_CAPITAL(e?.label)
            : e?.label,
        value:
          e?.value === "snf"
            ? e?.label?.toUpperCase()
            : e?.value === "ltacH"
            ? e?.label?.toUpperCase()
            : inBuiltFacilityTypesValues?.includes(e?.value)
            ? FIRST_LETTER_CAPITAL(e?.value)
            : e?.value,
      };
    });

    setTypeOptions([...temp]);
    setCurStep(0);
  }, [modal]);

  /* The above code is using the useEffect hook in React to set the values of "clinicianType" and
"hourlyRate" based on the value of "clinicianType" and the "modal" prop. */
  useEffect(() => {
    if (clinicianType === "pt") {
      setValue("clinicianType", "pt");
      setValue("hourlyRate", "60");
    } else if (clinicianType === "pta") {
      setValue("clinicianType", "pta");
      setValue("hourlyRate", "40");
    } else {
      setValue("clinicianType", clinicianType);
      setValue("hourlyRate", "");
    }
  }, [modal, clinicianType]);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
effect is triggered when the `modal` variable changes. */
  useEffect(() => {
    if (lastJobData) {
      setValue("facilityType", lastJobData?.facilityType || "");
      setValue("clinicianType", lastJobData?.clinicianType || "");
      setValue("medianWage", wagesData?.rate || "");
      setValue("jobDescription", lastJobData?.jobDescription || "");
      setValue("jobAddress1", lastJobData?.jobAddress1 || "");
      setValue("jobAddress2", lastJobData?.jobAddress2 || "");
      setValue("city", lastJobData?.city || "");
      setValue("state", lastJobData?.state || "");
      setValue("zipCode", lastJobData?.zipCode || "");

      if (lastJobData?.addressId) {
        // Set address if available
        setValue("addressId", lastJobData?.addressId);

        if (facilityInfo?.addresses?.length) {
          const findLastJobAddIndex = facilityInfo.addresses.findIndex(
            (add) => add.id === lastJobData.addressId
          );

          // Set nickname for display
          if (findLastJobAddIndex !== -1) {
            setValue(
              "nickname",
              facilityInfo?.addresses[findLastJobAddIndex]?.nickname
            );
            setSelectedAddressIndex(findLastJobAddIndex);
          }
        }
      }

      // Set job timings
      const startDate = new Date(lastJobData.startDate);
      const endDate = new Date(lastJobData.endDate);

      setValue("arrivalTime", startDate);
      setValue("endTime", endDate);

      const interval = dayjs(endDate).diff(dayjs(startDate), "minute");
      setIntervalInMinutes(interval);
    } else if (facilityInfo?.addresses?.length) {
      // Set address as job address, If last job data is not present then only
      // set as primary address otherwise give preference to last job address
      const primaryAddress = facilityInfo?.addresses[0];
      if (!lastJobData) {
        reset({
          nickname: primaryAddress?.nickname,
          jobAddress1: primaryAddress?.address1,
          jobAddress2: primaryAddress?.address2,
          city: primaryAddress?.city,
          state: primaryAddress?.state,
          zipCode: primaryAddress?.zipCode,
          addressId: primaryAddress?.id,
        });
      }
    }
  }, [lastJobData, facilityInfo, setValue]);

  // Update selected address data, as per user selection
  useEffect(() => {
    if (selectedAddressData) {
      console.log("selectedAddressData: ", selectedAddressData);
      setValue("nickname", selectedAddressData?.nickname || "");
      setValue("jobAddress1", selectedAddressData?.address1 || "");
      setValue("jobAddress2", selectedAddressData?.address2 || "");
      setValue("city", selectedAddressData?.city || "");
      setValue("state", selectedAddressData?.state || "");
      setValue("zipCode", selectedAddressData?.zipCode || "");
      setValue("addressId", selectedAddressData?.id || "");
    }
  }, [selectedAddressData]);

  useEffect(() => {
    if (intervalInMinutes > 0 && arrivalTimeValue) {
      const newEndTime = dayjs(arrivalTimeValue)
        .add(intervalInMinutes, "minute")
        .toDate();
      setValue("endTime", newEndTime);
    }
  }, [arrivalTimeValue, intervalInMinutes, setValue]);

  // forSingleMultipleDatePicker
  useEffect(() => {
    if (!Dates || !Dates.length) return;

    let startHour = 0;
    let startMinute = 0;
    let endHour = 0;
    let endMinute = 0;

    if (arrivalTimeValue) {
      startHour = dayjs(arrivalTimeValue).get("hour");
      startMinute = dayjs(arrivalTimeValue).get("minute");
    }
    if (endTimeValue) {
      endHour = dayjs(endTimeValue).get("hour");
      endMinute = dayjs(endTimeValue).get("minute");
    }

    let temp = [];
    let allDates = [];

    Dates.forEach((timestamp) => {
      const date = dayjs(timestamp).startOf("day");
      allDates.push(date);
    });

    // Sort allDates
    allDates.sort((a, b) => a.diff(b));

    let sortOrderCounter = 1;
    allDates.forEach((date) => {
      temp.push({
        sortOrder: sortOrderCounter++,
        startDate: date
          .add(startHour, "hours")
          .add(startMinute, "minute")
          .toDate(),
        endDate: date.add(endHour, "hours").add(endMinute, "minute").toDate(),
        day: date.get("day"),
        isAvailable: true,
      });
    });

    let lastJobData = getValues();

    setValue("jobSlots", temp);
    setTotalPay(calculateTotalPayForJob(temp, lastJobData.hourlyRate));

    // Check if there are multiple days in the range to show/hide step 4
    setShowStepFourth(temp.length > 1);
  }, [Dates, arrivalTimeValue, endTimeValue, hourlyRateValue]);

  //for MultiDatePicker
  // useEffect(() => {
  //   if (!Dates || !Dates.length) return;

  //   let startHour = 0;
  //   let startMinute = 0;
  //   let endHour = 0;
  //   let endMinute = 0;

  //   if (arrivalTimeValue) {
  //     startHour = dayjs(arrivalTimeValue).get("hour");
  //     startMinute = dayjs(arrivalTimeValue).get("minute");
  //   }
  //   if (endTimeValue) {
  //     endHour = dayjs(endTimeValue).get("hour");
  //     endMinute = dayjs(endTimeValue).get("minute");
  //   }

  //   let temp = [];
  //   let allDates = [];

  //   Dates.forEach((innerArray, index) => {
  //     if (Array.isArray(innerArray)) {
  //       // If it's a range
  //       const arrDate = dayjs(innerArray[0]).startOf("day");
  //       const endDate = dayjs(innerArray[1]).startOf("day");
  //       const diffInDates = dayjs(innerArray[1]).diff(innerArray[0], "days");

  //       for (let i = 0; i <= diffInDates; i++) {
  //         const date = arrDate.add(i, "day");
  //         allDates.push(date);
  //       }
  //     } else {
  //       // If it's a single date
  //       const date = dayjs(innerArray[0]).startOf("day");
  //       allDates.push(date);
  //     }
  //   });

  //   // Sort allDates
  //   allDates.sort((a, b) => a.diff(b));

  //   let sortOrderCounter = 1;
  //   allDates.forEach((date) => {
  //     temp.push({
  //       sortOrder: sortOrderCounter++,
  //       startDate: date
  //         .add(startHour, "hours")
  //         .add(startMinute, "minute")
  //         .toDate(),
  //       endDate: date.add(endHour, "hours").add(endMinute, "minute").toDate(),
  //       day: date.get("day"),
  //       isAvailable: true,
  //     });
  //   });

  //   let data = getValues();

  //   setValue("jobSlots", temp);
  //   setTotalPay(calculateTotalPayForJob(temp, data.hourlyRate));

  //   // Check if there are multiple days in the range to show/hide step 4
  //   setShowStepFourth(temp.length > 1);
  // }, [Dates, arrivalTimeValue, endTimeValue, hourlyRateValue]);

  //for ReactDatePicker
  // useEffect(() => {
  //   if (!datesValue || !datesValue.length || !datesValue[0] || !datesValue[1])
  //     return;

  //   let startHour = 0;
  //   let startMinute = 0;
  //   let endHour = 0;
  //   let endMinute = 0;

  //   if (arrivalTimeValue) {
  //     startHour = dayjs(arrivalTimeValue).get("hour");
  //     startMinute = dayjs(arrivalTimeValue).get("minute");
  //   }
  //   if (endTimeValue) {
  //     endHour = dayjs(endTimeValue).get("hour");
  //     endMinute = dayjs(endTimeValue).get("minute");
  //   }

  //   let arrDate = dayjs(datesValue[0]).startOf("day");

  //   let endDate = dayjs(datesValue[1]).startOf("day");

  //   let diffInDates = endDate.diff(arrDate, "days");

  //   if (diffInDates) setShowStepFourth(true);
  //   else setShowStepFourth(false);

  //   let temp = [];
  //   for (let i = 0; i <= diffInDates; i++) {
  //     temp.push({
  //       sortOrder: i + 1,
  //       startDate: arrDate
  //         .add(i, "day")
  //         .add(startHour, "hours")
  //         .add(startMinute, "minute")
  //         .toDate(),
  //       endDate: arrDate
  //         .add(i, "day")
  //         .add(endHour, "hours")
  //         .add(endMinute, "minute")
  //         .toDate(),
  //       day: arrDate.add(i, "day").get("day"),
  //       isAvailable: true,
  //     });
  //   }
  //   let data = getValues();

  //   setValue("jobSlots", temp);
  //   setTotalPay(calculateTotalPayForJob(temp, data.hourlyRate));
  // }, [datesValue, arrivalTimeValue, endTimeValue, hourlyRateValue]);

  // Fetch latest median wage whenever zipcode value updates
  useEffect(() => {
    if (zipCodeValue && zipCodeValue.length === 5) {
      getMedianWage(zipCodeValue, clinicianType);
    }
  }, [zipCodeValue]);

  const calculateTotalPayForJob = (jobSlots, hourlyRate) => {
    if (!hourlyRate) return;

    let [totalHours, totalHoursFull] = TOTAL_HOURS(jobSlots);

    let totalPay = totalHoursFull * parseInt(hourlyRate);

    setTotalPay(totalHoursFull * parseInt(hourlyRate));
    return totalPay;
  };

  const removeNonArrayValues = (inputArray) => {
    return inputArray.filter((item) => Array.isArray(item));
  };

  const handleNextClick = async () => {
    let validationResult;

    switch (curStep) {
      case 0:
        validationResult = await trigger(indexStepFields);
        break;
      case 1:
        validationResult = await trigger(firstStepFields);
        break;
      //for reactDatePicker
      // case 2:
      //   let dateValues = getValues("dates");

      //   if (dateValues && dateValues[0] && !dateValues[1])
      //     setValue("dates", [dateValues[0], dateValues[0]]);
      //   validationResult = await trigger(["dates"]);
      //   break;

      // for MultiDatePicker
      // case 2:
      //   setDates(removeNonArrayValues(Dates));
      //   if (!Dates || Dates.length === 0 || Dates[0]?.length !== 2) {
      //     setError("dates", {
      //       type: "manual",
      //       message: "Please select at least one date.",
      //     });
      //   } else {
      //     setError("dates", null);
      //     setCurStep(curStep + 1);
      //   }
      //   break;

      //forSingleMultipleDatePicker
      case 2:
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
      case 3:
        validationResult = await trigger(["arrivalTime", "endTime"]);
        if (validationResult && !showStepFourth) {
          setCurStep(curStep + 2);
          return;
        }
        break;
      case 4:
        validationResult = await trigger(["jobSlots"]);
        break;
      case 5:
        handleSave();
        break;
      case 6:
        toggle();
        break;
      default:
        break;
    }

    if (validationResult && curStep !== 5) setCurStep(curStep + 1);
  };

  const handleSave = async () => {
    setLoader(true);
    let data = getValues();

    // Find the job location's lat long and timezone
    const address = [
      data.jobAddress1,
      data.jobAddress2,
      data.city,
      data.state,
      data.zipCode,
    ]
      .filter(Boolean)
      .join(", ");

    const latLongRes = await getLatLng(address);

    if (latLongRes.status === "OK") {
      const lat = latLongRes?.results[0]?.geometry?.location?.lat;
      const long = latLongRes?.results[0]?.geometry?.location?.lng;

      const timezoneId = await getTimeZone(lat, long);
      data.lat = lat;
      data.long = long;
      data.timeZone = timezoneId;
    }

    data.jobSlots = data.jobSlots.map((slot) => ({
      ...slot,
      startDate: dayjs(slot.startDate).tz(data.timeZone, true).utc().valueOf(),
      endDate: dayjs(slot.endDate).tz(data.timeZone, true).utc().valueOf(),
    }));
    data.facilityId = facilityId;

    api(ADD_JOB_POST_URL, {
      ...data,
      jobAddress2: data?.jobAddress2 || "",
      zipCode: data?.zipCode || "",
      facilityId: facilityId,
      totalPay: String(totalPay),
    })
      .then((res) => {
        if (res.status === RESPONSE_OK) {
          setCurStep(curStep + 1);
          resetList();
          setLastJobData(res?.data?.data[0]);
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className=" jobPost-modal">
      <Modal
        centered
        isOpen={modal}
        toggle={() => {
          toggle();
          setCurStep(0);
          setSelectedAddressIndex();
          resetList();
        }}
        className="jobPost-modal"
      >
        <Form>
          <ModalHeader
            toggle={() => {
              toggle();
              setSelectedAddressIndex();
              setCurStep(0);
            }}
          >
            {curStep === 0 ? (
              "Choose Location"
            ) : curStep < 5 ? (
              "Post New Shift"
            ) : curStep === 5 ? (
              "Post Shift"
            ) : (
              <h5 className="modal-title">
                Shift Posted <span>successfully</span>!
              </h5>
            )}
          </ModalHeader>
          <ModalBody>
            {facilityDataLoader ? (
              <div className="my-5 py-5 d-flex justify-content-center">
                <Spinner />
              </div>
            ) : (
              <>
                {curStep === 0 && (
                  <AddJobPostingLocationStep
                    {...commonProps}
                    jobList={data}
                    data={data}
                    clinicianType={clinicianType}
                    facidata={facilityInfo}
                    selectedAddressIndex={selectedAddressIndex}
                    setSelectedAddressIndex={setSelectedAddressIndex}
                    selectedAddressData={selectedAddressData}
                    setSelectedAddressData={setSelectedAddressData}
                    typeOptions={typeOptions}
                    getMedianWage={getMedianWage}
                  />
                )}
                {curStep === 1 && (
                  <AddJobPostingStepFirst
                    {...commonProps}
                    jobList={data}
                    lastJobData={lastJobData}
                    wagesData={wagesData}
                    clinicianType={clinicianType}
                    setValue={setValue}
                    facilityInfo={facilityInfo}
                    primaryAddress={selectedAddressIndex}
                    selectedAddressData={selectedAddressData}
                    typeOptions={typeOptions}
                    getMedianWage={getMedianWage}
                  />
                )}
                {curStep === 2 && (
                  <AddJobPostingStepSecond
                    {...commonProps}
                    setValue={setValue}
                    Dates={Dates}
                    modal={modal}
                    disabled={false}
                    isEdit={false}
                    setDates={setDates}
                  />
                )}
                {curStep === 3 && (
                  <AddJobPostingStepThird
                    {...commonProps}
                    // timming={data}
                    // setValue={setValue}
                    data={data}
                    arrivalTimeValue={arrivalTimeValue}
                    multiLabel={showStepFourth}
                  />
                )}
                {curStep === 4 && showStepFourth && (
                  <AddJobPostingStepFourth
                    {...commonProps}
                    jobSlotValue={jobSlotValue}
                    useFieldArray={useFieldArray}
                    setValue={setValue}
                    setTotalPay={setTotalPay}
                    calculateTotalPayForJob={calculateTotalPayForJob}
                    hourlyRate={getValues()?.hourlyRate}
                  />
                )}
                {curStep === 5 && (
                  <AddJobPostingStepFifth
                    totalPay={() =>
                      calculateTotalPayForJob(
                        getValues()?.jobSlots,
                        getValues()?.hourlyRate
                      )
                    }
                    getValues={getValues}
                    setTotalPay={setTotalPay}
                  />
                )}
                {curStep === 6 && (
                  <AddJobPostingStepSixth
                    toggle={toggle}
                    setCurStep={setCurStep}
                  />
                )}
              </>
            )}
          </ModalBody>
          <div className="modal-footer">
            {curStep !== 0 && curStep !== 6 && (
              <button
                type="button"
                className="pt-btn btn-primary pt-btn-small"
                onClick={() =>
                  curStep === 5 && !showStepFourth
                    ? setCurStep(curStep - 2)
                    : setCurStep(curStep - 1)
                }
              >
                <PrevArrowIcon /> Prev
              </button>
            )}
            <button
              disabled={loader}
              type="button"
              className="pt-btn btn-primary pt-btn-small"
              onClick={() => {
                handleNextClick();
                if (curStep === 6) {
                  setCurStep(0);
                }
              }}
            >
              {loader ? (
                <Spinner color="light" />
              ) : (
                <>
                  {curStep === 6
                    ? "Close"
                    : curStep === 5
                    ? "Post Shift"
                    : "Next"}
                  {curStep < 5 && <NextArrowIcon />}
                </>
              )}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
