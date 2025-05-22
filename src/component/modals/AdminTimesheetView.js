import React, { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import {
  ACCEPT_IMAGE,
  ACCEPT_IMAGE_PDF,
  RESPONSE_OK,
} from "constants/AppConstants";
import {
  BreakEndRules,
  BreakStartRules,
  timeSheetEndRules,
  timeSheetStartRules,
} from "constants/Rules";
import FormInput from "component/common/FormInput";
import dayjs from "dayjs";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import FormTimePicker from "component/common/FormTimePicker";
import UploadFile from "component/common/uploadFile";
import FormSelect from "component/common/FormSelect";
import {
  breakHoursOptions,
  breakMinsOptions,
} from "views/authentication/signUpClinician/HourlyConstant";
import { GET_UPLOADED_TIMESHEET } from "constants/ApiUrls";
import { api } from "api/Api";

export default function AdminTimesheetView({
  modal,
  toggle,
  data,
  openPreview,
}) {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [timeSheetData, setTimeSheetData] = useState({});
  const [otherFormData, setOtherFormData] = useState({});
  const role = localStorage.getItem("userRole");
  const timeSheetId = data?.timesheetId;

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
      setOtherFormData({
        timesheetUrl: "",
      });
    }
  }, [modal, reset]);

  const fileCallbackFn = (res, id, multiple) => {
    setOtherFormData({
      ...otherFormData,
      [id]: multiple ? [...otherFormData[id], ...res] : res[0],
    });
  };

  const getSheetData = async () => {
    try {
      const res = await api(GET_UPLOADED_TIMESHEET, {}, timeSheetId, null);
      if (res.status === RESPONSE_OK) {
        setTimeSheetData(res?.data?.data);
      } else {
        setTimeSheetData({});
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onSubmit = (formData) => {
    // submitSheet(formData);
  };

  useEffect(() => {
    if (timeSheetData) {
      setValue(
        "startTime",
        timeSheetData.startTime
          ? dayjs(timeSheetData.startTime).format("HH:mm")
          : "",
      );
      setValue(
        "endTime",
        timeSheetData.endTime
          ? dayjs(timeSheetData.endTime).format("HH:mm")
          : "",
      );
      setValue("description", timeSheetData.description);
      setValue(
        "breakStartTime",
        timeSheetData.breakStartTime
          ? dayjs(timeSheetData.breakStartTime).format("HH:mm")
          : "",
      );
      setValue(
        "breakEndTime",
        timeSheetData.breakEndTime
          ? dayjs(timeSheetData.breakEndTime).format("HH:mm")
          : "",
      );
      setOtherFormData({
        timesheetUrl: timeSheetData.timesheetUrl || "",
      });
    }
  }, [timeSheetData, setValue]);

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="addLocation-modal">
      <ModalHeader toggle={toggle}>View Time Sheet</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column mb-2">
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
            <div className="d-flex justify-content-between">
              <div style={{ width: "47%" }}>
                <FormTimePicker
                  id={"breakStartTime"}
                  name="breakStartTime"
                  control={control}
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  rules={BreakStartRules}
                  label="Break Start:"
                  disabled={timeSheetData && timeSheetData.isSubmitted === true}
                />
              </div>
              <div style={{ width: "47%" }}>
                <FormTimePicker
                  id={"breakEndTime"}
                  name="breakEndTime"
                  control={control}
                  trigger={trigger}
                  register={register}
                  errors={errors}
                  rules={BreakEndRules}
                  label="Break End:"
                  disabled={timeSheetData && timeSheetData.isSubmitted === true}
                />
              </div>
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
            <FormInput
              trigger={trigger}
              label={"Description:"}
              name={"description"}
              register={register}
              errors={errors}
              rules={{}}
              control={control}
              disabled={timeSheetData && timeSheetData.isSubmitted === true}
            />
            <div className="form-group">
              <label htmlFor="State">Uploaded Time Sheet:</label>
              <div className="signup-upload-file mb-48">
                <UploadFile
                  gridView={true}
                  serverFiles={
                    otherFormData.timesheetUrl
                      ? [otherFormData.timesheetUrl]
                      : []
                  }
                  multiple={false}
                  id="timesheetUrl"
                  name={"timesheetUrl"}
                  accept={role === "facility" ? ACCEPT_IMAGE : ACCEPT_IMAGE_PDF}
                  folder="images"
                  max={1}
                  hideRemoveBtn={true}
                  disabled={timeSheetData && timeSheetData.isSubmitted === true}
                  callbackFn={fileCallbackFn}
                  deleteCallbackFn={(respData, id) =>
                    setOtherFormData({ ...otherFormData, [id]: respData })
                  }
                />
              </div>
            </div>
          </div>
          {/* { timeSheetData && timeSheetData.isSubmitted === true ? (
            <div></div>
          ) : (
            <div className="d-flex justify-content-center gap-5">
            <FormButton
              loader={saveLoader}
              className={"pt-btn-small pt-btn btn-primary editexp-btn"}
              type="button"
              label={"Save"}
              onClick={() => {
                saveSheetData(getValues());
              }}
              disabled={timeSheetData.isSubmitted === true}
            />
            <FormButton
              loader={loader}
              className={"pt-btn-small pt-btn btn-primary editexp-btn"}
              type="submit"
              label={"Submit"}
              disabled={timeSheetData.isSubmitted === true}
            />
          </div>
          )} */}
        </Form>
      </ModalBody>
    </Modal>
  );
}
