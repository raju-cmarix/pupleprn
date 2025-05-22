import React, { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { ACCEPT_IMAGE, RESPONSE_OK } from "constants/AppConstants";
import {
  facilityEmailRules,
  timeSheetEndRules,
  timeSheetStartRules,
  FirstNameRules
} from "constants/Rules";
import FormInput from "component/common/FormInput";
import FormTimePicker from "component/common/FormTimePicker";
import {
  FACILITY_UPDATE_TIMESHEET_STATUS,
  GET_UPLOADED_TIMESHEET,
} from "constants/ApiUrls";
import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import { setTimeField } from "utils/Utils";
import UploadFile from "component/common/uploadFile";
import FormCheckbox from "component/common/FormCheckbox";

export default function FacilityApproveTimesheetModal({
  modal,
  toggle,
  data,
  setList,
}) {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [timeSheetData, setTimeSheetData] = useState({});
  const [loader, setLoader] = useState(false);
  const [approveLoader, setApproveLoader] = useState(false);
  const timeSheetId = data?.timesheetId;
  const role = localStorage.getItem("userRole");
  
  useEffect(() => {
    if (timeSheetId) {
      getSheetData();
    }
  }, [timeSheetId]);

  useEffect(() => {
    if (modal) {
      reset({
        startTime: "",
        endTime: "",
        description: "",
        breakStartTime: "",
        breakEndTime: "",
      });
    }
  }, [modal, reset]);

  useEffect(() => {
    if (timeSheetData?.id) {
      let notificationEmail =
      timeSheetData.isSubmitted === true
        ? timeSheetData.notificationEmail
        : timeSheetData.facilityRepresentativeEmail !== null || timeSheetData.facilityRepresentativeEmail !== "" ? timeSheetData.facilityRepresentativeEmail : timeSheetData.notificationEmail;

     let notificationName = timeSheetData.isSubmitted === true
     ? timeSheetData.notificationName
     : timeSheetData.facilityRepresentativeName !== null || timeSheetData.facilityRepresentativeName !== "" ? timeSheetData.facilityRepresentativeName : timeSheetData.notificationName;
    
    
     notificationName = notificationName === null || notificationName === "" ? "Not Available" : notificationName
     let startTime = timeSheetData?.clinicianNotWorked ? "00:00" : setTimeField(timeSheetData.startTime, timeSheetData?.jobId?.timeZone);
     let endTime = timeSheetData?.clinicianNotWorked ? "00:00" : setTimeField(timeSheetData.endTime, timeSheetData?.jobId?.timeZone)
    
      setValue("notificationEmail", notificationEmail);
      setValue("notificationName", notificationName);
      let setSignatureUrl = timeSheetData.signatureUrl !== "" ? timeSheetData.signatureUrl : "Not Available"
     
      setValue("signatureUrl", setSignatureUrl)
      setValue("description", timeSheetData.description);
      setValue(
        "startTime",
        startTime
      );
      setValue(
        "endTime",
        endTime
      );
      setValue(
        "breakStartTime",
        setTimeField(
          timeSheetData.breakStartTime,
          timeSheetData?.jobId?.timeZone,
        ),
      );
      setValue(
        "breakEndTime",
        setTimeField(
          timeSheetData.breakEndTime,
          timeSheetData?.jobId?.timeZone,
        ),
      );
    }
  }, [timeSheetData, setValue]);

  const getSheetData = async () => {
    setLoader(true);
    try {
      const res = await api(GET_UPLOADED_TIMESHEET, {}, timeSheetId, null);
      if (res.status === RESPONSE_OK) {
        setTimeSheetData(res?.data?.data);
      } else {
        setTimeSheetData({});
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoader(false);
    }
  };

  const handleApprove = async () => {
    if (!timeSheetData.id) {
      return;
    }
    setApproveLoader(true);
    try {
      const res = await api(FACILITY_UPDATE_TIMESHEET_STATUS, {
        id: timeSheetData.id,
        status: "accepted",
      });
      if (res.status === RESPONSE_OK) {
        setTimeSheetData((prev) => ({ ...prev, status: "accepted" }));
        setList((prev) =>
          prev.map((job) => {
            if (job?.timesheetId === timeSheetData?.id) {
              job.timesheetStatus = "accepted";
            }
            return job;
          }),
        );
      } else {
        setTimeSheetData({});
      }
    } catch (error) {
    } finally {
      setApproveLoader(false);
    }
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="addLocation-modal">
      <ModalHeader toggle={toggle}>
        {timeSheetData?.status === "accepted"
          ? "Time Sheet"
          : "Approve Time Sheet"}
      </ModalHeader>
      <ModalBody>
        {loader && (
          <div className="centered-spinner">
            <Spinner />
          </div>
        )}
        <Form>
          <div
            className={`d-flex flex-column mb-2 ${loader ? "opacity-25" : ""}`}>
            <FormInput
              trigger={trigger}
              label={"Facility Representative Email:"}
              name={"notificationEmail"}
              register={register}
              errors={errors}
              rules={facilityEmailRules}
              control={control}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
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
             
            <div>
            
            
                  {timeSheetData.signatureUrl !== "" ?
                 <>
                 <label className="form-group">Facility Representative Signature: </label>
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
                    </div> </> :
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
                    }  
           
            </div>
            {timeSheetData?.clinicianNotWorked ? (
            <FormCheckbox
              control={control}
              divClassName="i-agree mt-1 d-flex gap-2 mb-1"
              className="form-check-input"
              name="clinicianNotWorked"
              options={[
                {
                  label: "clinician didn't work for this shift",
                  value: "clinicianNotWorked",
                },
              ]}
              defaultChecked={true}
              register={register}
              errors={errors}
              rules={{}}
              renderBRTag={false}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />) : ""}
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
            <h6>Total: {timeSheetData?.totalWorkedHours}</h6>
          </div>
          {timeSheetData?.id && timeSheetData?.status !== "accepted" ? (
            <div className="d-flex justify-content-center gap-5">
              <FormButton
                disabled={role === 'subadmin'}
                loader={approveLoader}
                className={"pt-btn-small pt-btn btn-primary editexp-btn"}
                type="button"
                label={"Approve"}
                onClick={handleApprove}
              />
            </div>
          ) : null}
        </Form>
      </ModalBody>
    </Modal>
  );
}
