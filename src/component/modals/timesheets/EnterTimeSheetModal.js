import React, { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import {
  GET_UPLOADED_TIMESHEET,
  UPDATE_TIMESHEET,
  UPLOAD_TIMESHEET,
} from "constants/ApiUrls";
import { ACCEPT_IMAGE, RESPONSE_OK } from "constants/AppConstants";
import {
  completedDocumentationRules,
  facilityEmailRules,
  FirstNameRules,
  timeSheetEndRules,
  timeSheetStartRules,
  clinicianNotWorkedRules
} from "constants/Rules";
import FormInput from "component/common/FormInput";
import dayjs from "dayjs";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import FormTimePicker from "component/common/FormTimePicker";
import { mergeDateAndTime, setTimeField, totalWorkedHours } from "utils/Utils";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import FormCheckbox from "component/common/FormCheckbox";
import UploadFile from "component/common/uploadFile";

dayjs.extend(timezone);
dayjs.extend(utc);

export default function EnterTimeSheetModal({
  modal,
  toggle,
  selectedRow,
  getData,
}) {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [timeSheetLoader, setTimeSheetLoader] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState({});
  const [totalWorkedHoursText, setTotalWorkedHoursText] = useState();
  const startTime = watch("startTime");
  const endTime = watch("endTime");
  const breakStartTime = watch("breakStartTime");
  const breakEndTime = watch("breakEndTime");


const clinicianNotWorked = watch("clinicianNotWorked", false);
const agreeTimesheet = watch("agreeTimesheet", false);


  useEffect(() => {
    if (selectedRow?.timesheetId) {
      getSheetData();
    }
  }, [selectedRow]);

  useEffect(() => {
    if (modal) {
      const totalWorkedText = totalWorkedHours({
        startTime: new Date(startTime).getTime(),
        endTime: new Date(endTime).getTime(),
        breakStartTime: breakStartTime
          ? new Date(breakStartTime).getTime()
          : null,
        breakEndTime: breakEndTime ? new Date(breakEndTime).getTime() : null,
        clinicianNotWorked: clinicianNotWorked,
      });
      setTotalWorkedHoursText(totalWorkedText);
    }
  }, [
    modal,
    startTime,
    endTime,
    breakStartTime,
    breakEndTime,
    clinicianNotWorked,
  ]);

  // If breakStartTime entered, Prefill the breakEndTime with + 1hrs if it is not present
  useEffect(() => {
    if (breakStartTime && !breakEndTime) {
      const newBreakStartTime = new Date(breakStartTime);
      newBreakStartTime.setHours(newBreakStartTime.getHours() + 1);
      setValue("breakEndTime", newBreakStartTime.getTime());
    }
  }, [breakStartTime]);

  useEffect(() => {
    if (modal && selectedRow?.id) {
    
      let notification = selectedRow?.facilityRepresentativeEmail !== null && selectedRow?.facilityRepresentativeEmail !== ""
          ? selectedRow?.facilityRepresentativeEmail
          : selectedRow?.facilityEmail || "";

      reset({
        startTime: setTimeField(
          selectedRow?.shiftSlots[0]?.startDate,
          selectedRow?.timeZone,
        ),
        endTime: setTimeField(
          selectedRow?.shiftSlots[0]?.endDate,
          selectedRow?.timeZone,
        ),
        notificationEmail:notification,
      });
    } else {
      reset();
    }
  }, [modal, reset]);

  const getSheetData = async () => {
    if (!selectedRow?.timesheetId) {
      return;
    }
    try {
      setTimeSheetLoader(true);
      const res = await api(
        GET_UPLOADED_TIMESHEET,
        {},
        selectedRow.timesheetId,
        null,
      );
      if (res.status === RESPONSE_OK) {
        setTimeSheetData(res?.data?.data);
        setTimeSheetLoader(false);
      } else {
        setTimeSheetData({});
        setTimeSheetLoader(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const submitSheet = async (formData) => {
    const res = await trigger();
    if (!res) {
      return;
    }

    setLoader(true);
    const startTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.startDate,
      selectedRow.timeZone,
      formData.startTime,
    );
    const endTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.endDate,
      selectedRow.timeZone,
      formData.endTime,
    );
    const breakStartTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.startDate,
      selectedRow.timeZone,
      formData.breakStartTime,
    );

    const breakEndTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.endDate,
      selectedRow.timeZone,
      formData.breakEndTime,
    );

    // If timesheet is already saved/notsubmitted, then we will update it, or else we will create
    const endPoint =
      timeSheetData && timeSheetData.isSubmitted === false
        ? UPDATE_TIMESHEET
        : UPLOAD_TIMESHEET;
    const paramId =
      timeSheetData && timeSheetData.isSubmitted === false
        ? selectedRow.timesheetId
        : null;

    const payload = {
      applicationId: selectedRow.id,
      clinicianId: selectedRow.clinicianId,
      notificationEmail: formData.notificationEmail,
      startTime: startTime,
      endTime: endTime,
      clinicianNotWorked: clinicianNotWorked,
      breakStartTime: breakStartTime || null,
      breakEndTime: breakEndTime || null,
      description: formData.description,
      isSubmitted: true,
    };

    try {
      const res = await api(endPoint, payload, paramId, null);
      if (res.status === RESPONSE_OK) {
        handleToggle();
        getData(false);
      }
    } catch (error) {
      console.error("Error - Timesheet submission: ", error);
    } finally {
      setLoader(false);
    }
  };

  const saveSheetData = async (formData) => {
    const res = await trigger();
    if (!res) {
      return;
    }
    const startTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.startDate,
      selectedRow.timeZone,
      formData.startTime,
    );
    const endTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.endDate,
      selectedRow.timeZone,
      formData.endTime,
    );

    const breakStartTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.startDate,
      selectedRow.timeZone,
      formData.breakStartTime,
    );

    const breakEndTime = mergeDateAndTime(
      selectedRow?.shiftSlots?.[0]?.endDate,
      selectedRow.timeZone,
      formData.breakEndTime,
    );
    if (
      !formData.startTime ||
      !formData.endTime ||
      !formData.notificationEmail
    ) {
      trigger(["startTime", "endTime", "notificationEmail"]);
      return;
    }
    if (timeSheetData && timeSheetData.isSubmitted === false) {
      setSaveLoader(true);
      const updatedData = {
        startTime: startTime,
        endTime: endTime,
        notificationEmail: formData.notificationEmail,
        description: formData.description,
        clinicianId: timeSheetData.clinicianId,
        jobAppliedUserId: timeSheetData.id,
        breakStartTime: breakStartTime || null,
        breakEndTime: breakEndTime || null,
        applicationId: selectedRow.id,
        clinicianNotWorked: clinicianNotWorked,
        isSubmitted: false,
      };

      try {
        const res = await api(
          UPDATE_TIMESHEET,
          updatedData,
          selectedRow?.timesheetId,
          null,
        );
        if (res.status === RESPONSE_OK) {
          handleToggle();
          getData(false);
        }
        setSaveLoader(false);
      } catch (error) {
        console.error("Error saving timesheet:", error);
        setSaveLoader(false);
      }
    } else {
      setSaveLoader(true);
      let payload = {
        clinicianId: selectedRow.clinicianId,
        applicationId: selectedRow.id,
        startTime: startTime,
        endTime: endTime,
        notificationEmail: formData.notificationEmail,
        description: formData.description,
        breakStartTime: breakStartTime || null,
        breakEndTime: breakEndTime || null,
        isSubmitted: false,
      };
      try {
        const res = await api(UPLOAD_TIMESHEET, payload);
        if (res.status === RESPONSE_OK) {
          handleToggle();
          getData(false);
        }
        setSaveLoader(false);
      } catch (error) {
        console.error("Error uploading timesheet:", error);
        setSaveLoader(false);
      }
    }
  };

  const onSubmit = (formData) => {
    submitSheet(formData);
  };

  useEffect(() => {
    if (timeSheetData?.id) {
      let notificationEmail =
        timeSheetData.isSubmitted === true
          ? timeSheetData.notificationEmail
          : timeSheetData.facilityRepresentativeEmail !== null ||
            timeSheetData.facilityRepresentativeEmail !== ""
          ? timeSheetData.facilityRepresentativeEmail
          : timeSheetData.notificationEmail;

      setValue("notificationEmail", notificationEmail);

      let notificationName =
        timeSheetData.isSubmitted === true
          ? timeSheetData.notificationName
          : timeSheetData.facilityRepresentativeName !== null ||
            timeSheetData.facilityRepresentativeName !== ""
          ? timeSheetData.facilityRepresentativeName
          : timeSheetData.notificationName;

      notificationName =
        notificationName === null || notificationName === ""
          ? "Not Available"
          : notificationName;
      setValue("notificationName", notificationName);

      let setSignatureUrl =
        timeSheetData.signatureUrl !== ""
          ? timeSheetData.signatureUrl
          : "Not Available";

      setValue("signatureUrl", setSignatureUrl);

      // setValue("facilityRepresentativeEmail", timeSheetData.facilityRepresentativeEmail);
      setValue("description", timeSheetData.description);
       let startTime = timeSheetData?.clinicianNotWorked ? "00:00" : setTimeField(timeSheetData.startTime, timeSheetData?.jobId?.timeZone);
           let endTime = timeSheetData?.clinicianNotWorked ? "00:00" : setTimeField(timeSheetData.endTime, timeSheetData?.jobId?.timeZone);
      setValue(
        "startTime",
        startTime
      );
      setValue("clinicianNotWorked", timeSheetData.clinicianNotWorked);

      setValue(
        "endTime",
        endTime
      );
      setValue(
        "breakStartTime",
        setTimeField(
          timeSheetData.breakStartTime,
          timeSheetData?.jobId?.timeZone
        )
      );
      setValue(
        "breakEndTime",
        setTimeField(timeSheetData.breakEndTime, timeSheetData?.jobId?.timeZone)
      );
    }
  }, [timeSheetData, setValue]);

  const handleToggle = () => {
    setTimeSheetData({});
    toggle();
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={handleToggle}
      className="addLocation-modal"
    >
      <ModalHeader toggle={handleToggle}>Enter Time Sheet</ModalHeader>
      <ModalBody>
        {timeSheetLoader && (
          <div className="centered-spinner">
            <Spinner />
          </div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`d-flex flex-column ${
              timeSheetLoader ? "opacity-25" : ""
            }`}
          >
            {timeSheetData?.isSubmitted === true ? ('') :
            (<div style={{color:'#80798B', lineHeight:'15px', fontSize: '12px', fontFamily: '"Montserrat", sans-serif !important', fontWeight: 'bold'}} >Please use the app for finger signature</div>)}
            <FormInput
              trigger={trigger}
              label={"Facility Representative Email:"}
              name={"notificationEmail"}
              register={register}
              inputDivClassName={"textarea"}
              errors={errors}
              rules={facilityEmailRules}
              control={control}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
            {timeSheetData?.isSubmitted === true ? (
              <FormInput
                trigger={trigger}
                label={"Facility Representative Name:"}
                name={"notificationName"}
                register={register}
                errors={errors}
                rules={FirstNameRules}
                control={control}
                disabled={timeSheetData && timeSheetData.isSubmitted === true}
              />
                ) : ' '} 
            <FormTimePicker
              id={"startTime"}
              name="startTime"
              control={control}
              trigger={trigger}
              register={register}
              errors={errors}
              rules={timeSheetStartRules}
              label="Shift Start:"
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
            <div className="d-flex justify-content-between gap-3">
              <FormTimePicker
                id={"breakStartTime"}
                name="breakStartTime"
                control={control}
                trigger={trigger}
                register={register}
                errors={errors}
                rules={{}}
                label="Break Start:"
                disabled={timeSheetData && timeSheetData.isSubmitted === true}
                divClassName="w-100"
              />
              <FormTimePicker
                id={"breakEndTime"}
                name="breakEndTime"
                control={control}
                trigger={trigger}
                register={register}
                errors={errors}
                rules={{}}
                label="Break End:"
                disabled={timeSheetData && timeSheetData.isSubmitted === true}
                divClassName="w-100"
              />
            </div>
            <FormTimePicker
              id={"endTime"}
              name="endTime"
              control={control}
              trigger={trigger}
              register={register}
              errors={errors}
              rules={timeSheetEndRules}
              label={"Shift End:"}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
           {errors.agreeTimesheet && errors.clinicianNotWorked && (
                <p className="text-danger mb-0 pt-1">Please select at least one option.</p>
              )}
            {!timeSheetData?.id && !timeSheetLoader ? (
              <FormCheckbox
                control={control}
                divClassName="i-agree mt-1 d-flex gap-2 mb-1"
                className="form-check-input"
                name="agreeTimesheet"
                options={[
                  {
                    label: "I have completed all documentation for this shift.",
                    value: "agreeTimesheet",
                  },
                ]}
                defaultChecked={false}
                register={register}
                errors={errors}
                rules={{
                  validate: (value) =>
                    watch("clinicianNotWorked") || value || ''
                }}
                renderBRTag={false}
                disabled={clinicianNotWorked || (timeSheetData && timeSheetData.isSubmitted === true)} // Disable if the other checkbox is checked
              />
            ) : null}

            <div>
              {timeSheetData?.isSubmitted === true ? (
                <div>
                  {timeSheetData?.signatureUrl !== "" ? (
                    <>
                      <label className="form-group">Facility Representative Signature:</label>
                      <div className="uploaded-pic clinician">
                        <UploadFile
                          serverFiles={[timeSheetData.signatureUrl]}
                          hideRemoveBtn={true}
                          multiple={false}
                          id="signatureUrl"
                          name={"signatureUrl"}
                          accept={ACCEPT_IMAGE}
                          folder="images"
                          max={1}
                        />
                      </div>{" "}
                    </>
                  ) : (
                    <FormInput
                      // trigger={trigger}
                      label={"Facility Representative Signature:"}
                      name={"signatureUrl"}
                      register={register}
                      errors={errors}
                      rules={FirstNameRules}
                      control={control}
                      disabled={true}
                    />
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          
            {timeSheetData?.clinicianNotWorked || (!timeSheetData?.clinicianNotWorked && timeSheetData.isSubmitted !== true) ? (
            <FormCheckbox
              control={control}
              divClassName="i-agree mt-1 d-flex gap-2 mb-1"
              className="form-check-input"
              name="clinicianNotWorked"
              options={[
                {
                  label: "I didn't work this shift",
                  value: "clinicianNotWorked",
                },
              ]}
              defaultChecked={false}
              register={register}
              errors={{}}
              rules={{
                validate: (value) =>
                  watch("agreeTimesheet") || value || ''
              }}
              renderBRTag={false}
              disabled={agreeTimesheet || (timeSheetData && timeSheetData.isSubmitted === true)}
              // onChange={handleClinicianNotWorkedChange}
            
          />
            ) : ""}
            <FormInput
              trigger={trigger}
              label={"Description:"}
              name={"description"}
              register={register}
              type={"textarea"}
              errors={errors}
              rules={{}}
              control={control}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
            {totalWorkedHoursText ? (
              <h6>Total: {totalWorkedHoursText}</h6>
            ) : null}
          </div>
          {!timeSheetData?.id && !timeSheetLoader ? (
            <div className="d-flex justify-content-center gap-5">
              {/* <FormButton
                loader={saveLoader}
                className={"pt-btn-small pt-btn btn-secondary editexp-btn"}
                type="button"
                label={"Save"}
                onClick={() => {
                  saveSheetData(getValues());
                  }}
                  disabled={timeSheetData.isSubmitted === true}
                  /> */}
              <FormButton
                loader={loader}
                className={"pt-btn-small pt-btn btn-primary editexp-btn"}
                type="submit"
                label={"Submit"}
                disabled={timeSheetData.isSubmitted === true}
              />
            </div>
          ) : null}
        </Form>
      </ModalBody>
    </Modal>
  );
}
