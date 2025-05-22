import { api } from "api/Api";
import { NextArrowIcon } from "assets/svg";
import { APPLY_FOR_JOB_URL } from "constants/ApiUrls";
import { RESPONSE_OK, TOTAL_HOURS } from "constants/AppConstants";
import { sort } from "radash";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import {
  cloneDeep,
  compareSimpleObjs,
  updateEndDateWithEndTime,
  updateEndDateWithEndTimeEvery,
} from "utils/Utils";
import JobApplyStepSecond from "./JobApplyStepSecond";
import JobApplyStepThird from "./JobApplyStepThird";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);

export default function JobApplyModal({
  modal,
  toggle,
  data,
  redirect,
  filters,
  setFilters,
  setPage,
  successCallback,
  getList,
  officeAddress,
}) {
  const { user } = useContext(UserContext);
  const [curStep, setCurStep] = useState(2);
  const [loader, setLoader] = useState(false);
  const [changedTimes, setChangedTimes] = useState(false);
  const [serverTotalHours, setServerTotalHours] = useState(0);
  const [ourTotalHours, setOurTotalHours] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  const {
    register,
    control,
    trigger,
    getValues,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { jobSlots: [{}] },
  });

  const arrivalTimeValue = watch("arrivalTime");
  const jobSlotsValue = watch("jobSlots");

  useEffect(() => {
    setValue("endTime", undefined);
  }, [arrivalTimeValue]);

  useEffect(() => {
    let temp = cloneDeep(data);

    if (temp?.jobSlots && temp?.jobSlots?.length) {
      temp.jobSlots = sort(temp.jobSlots, (val) => val.startDate);
      for (let i = 0; i < temp.jobSlots.length; i++) {
        temp.jobSlots[i].startDate = dayjs(temp?.jobSlots[i].startDate)
          .tz(temp.timeZone)
          .toDate();
        temp.jobSlots[i].endDate = dayjs(temp?.jobSlots[i].endDate)
          .tz(temp.timeZone)
          .toDate();
      }
    }
    let [totalHours, totalHoursFull] = TOTAL_HOURS(temp?.jobSlots);
    setServerTotalHours(totalHoursFull);
    setTotalPay(Number(data?.totalPay));
    reset({ ...temp });
  }, [data]);
  useEffect(() => {
    setCurStep(2);
    reset();
  }, [modal]);

  const arr = ["Next", "Apply", "Close"];
  const handleNext = () => {
    if (curStep === 1) setCurStep(curStep + 1);
    if (curStep === 2) applyForJob();
    if (curStep === 3) {
      setPage(1);
      successCallback && successCallback();
      getList && getList();
    }
  };

  useEffect(() => {
    let values = getValues();

    const originalValues = sort(values?.jobSlots, (val) => val?.sortOrder);

    // values.jobSlots = values.jobSlots.map((slot) => {
    //   return {
    //     ...slot,
    //     startDate: slot.startDate,
    //     endDate: slot.endDate,
    //   };
    // });

    values.jobSlots = updateEndDateWithEndTimeEvery(values?.jobSlots);

    let tempOurDate = values?.jobSlots.map((slot) => {
      return {
        startDate: slot.startDate,
        endDate: slot.endDate,
        sortOrder: slot?.sortOrder,
      };
    });
    const sortedTempOurDate = sort(tempOurDate, (val) => {
      return val.sortOrder;
    });

    let tempServerDate = data?.jobSlots?.map((slot) => {
      return {
        startDate: new Date(slot.startDate),
        endDate: new Date(slot.endDate),
        sortOrder: slot?.sortOrder,
      };
    });
    const sortedTempServerDate = sort(tempServerDate, (val) => {
      return val.sortOrder;
    });

    const newTimes = !compareSimpleObjs(
      sortedTempOurDate,
      sortedTempServerDate,
    );

    let [totalHours, totalHoursFull] = TOTAL_HOURS(originalValues);
    setOurTotalHours(totalHoursFull);

    setTotalPay(totalHoursFull * parseInt(data?.effectiveHourlyRate));
    setChangedTimes(newTimes);
  }, [getValues()]);

  const applyForJob = () => {
    let values = getValues();

    // values.jobSlots = values.jobSlots.map((slot) => {
    //   return {
    //     ...slot,
    //     startDate: new Date(slot.startDate)?.getTime(),
    //     endDate: new Date(slot.endDate)?.getTime(),
    //   };
    // });

    values.jobSlots = updateEndDateWithEndTime(values?.jobSlots);
    let tempOurDate = values?.jobSlots?.map((slot) => {
      return {
        startDate: slot.startDate,
        endDate: slot.endDate,
        sortOrder: slot?.sortOrder,
      };
    });
    const sortedTempOurDate = sort(tempOurDate, (val) => {
      return val?.sortOrder;
    });

    let tempServerDate = data.jobSlots.map((slot) => {
      return {
        startDate: slot.startDate,
        endDate: slot.endDate,
        sortOrder: slot?.sortOrder,
      };
    });
    const sortedTempServerDate = sort(tempServerDate, (val) => {
      return val?.sortOrder;
    });

    // Convert dates into utc values
    // Second param in timezone keeps the localtime same wrt. timezone
    // So whenever user tries to propose a new time from different timezone the local time of that timezone to be converted with into job location's timezone without modifying the hours and minutes
    const isProposedNewTime = !compareSimpleObjs(
      sortedTempOurDate,
      sortedTempServerDate,
    );
    values.jobSlots = values.jobSlots.map((slot) => {
      return {
        ...slot,
        startDate: dayjs(slot.startDate)
          .tz(values.timeZone, isProposedNewTime)
          .utc()
          .valueOf(),
        endDate: dayjs(slot.endDate)
          .tz(values.timeZone, isProposedNewTime)
          .utc()
          .valueOf(),
      };
    });

    let reqData = {
      ...values,
      clinicianId: user.clinicianId.id,
      isProposedNewTime: isProposedNewTime,
      jobId: data.id,
      totalWorkedHours: String(ourTotalHours),
      originalTotalWorkedHours: String(serverTotalHours),
      totalAmount: String(totalPay),
    };

    setLoader(true);
    api(APPLY_FOR_JOB_URL, reqData).then((res) => {
      if (res.status === RESPONSE_OK) {
        setCurStep(curStep + 1);
      } else {
        handleToggle();
      }
      setLoader(false);
    });
  };

  const handleToggle = () => {
    if (curStep === 3) {
      getList && getList();
      if (redirect) {
        successCallback && successCallback();
      }
    } else toggle();
  };
  const commonProps = { register, control, errors, trigger };
  const { isUserAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isApprovedByAdmin) {
      navigate("/");
    }
    return () => clearTimeout();
  }, [user?.id, user?.isApprovedByAdmin, isUserAuthenticated, modal]);

  const invalidTotalTimes =
    changedTimes &&
    (serverTotalHours < ourTotalHours ||
      isNaN(ourTotalHours) ||
      isNaN(serverTotalHours));

  return (
    <Modal
      centered
      isOpen={modal}>
      <ModalHeader toggle={() => handleToggle()}>
        {curStep === 3 ? (
          <>
            You've successfully <span>applied!</span>
          </>
        ) : (
          <>Apply to Shift</>
        )}{" "}
      </ModalHeader>
      <Form>
        <ModalBody>
          {curStep === 2 && (
            <JobApplyStepSecond
              getValues={getValues}
              data={data}
              officeAddress={officeAddress}
              changedTimes={changedTimes}
              curStep={curStep}
              setCurStep={setCurStep}
              // {...commonProps}
              jobSlotsValue={jobSlotsValue}
              setValue={setValue}
              commonProps={commonProps}
              serverTotalHours={serverTotalHours}
              ourTotalHours={ourTotalHours}
              totalPay={totalPay}
            />
          )}
          {curStep === 3 && <JobApplyStepThird toggle={() => handleToggle()} />}
        </ModalBody>
        <div className="modal-footer">
          {/* {curStep === 2 && (
            <button
              className="pt-btn btn-primary pt-btn-small"
              onClick={() => setCurStep(curStep - 1)}
            >
              <PrevArrowIcon /> Prev
            </button>
          )} */}
          <button
            disabled={loader || invalidTotalTimes}
            type="button"
            className="pt-btn btn-primary pt-btn-small"
            onClick={() => {
              curStep === 3 ? handleToggle() : handleNext();
            }}>
            {loader ? (
              <Spinner color="light" />
            ) : (
              <>
                {arr[curStep - 1]} {curStep !== 3 && <NextArrowIcon />}
              </>
            )}
          </button>
        </div>
      </Form>
    </Modal>
  );
}
