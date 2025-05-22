import React, { useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { RESPONSE_OK } from "constants/AppConstants";
import {
  facilityEmailRules,
  timeSheetEndRules,
  timeSheetStartRules,
} from "constants/Rules";
import FormInput from "component/common/FormInput";
import FormTimePicker from "component/common/FormTimePicker";
import { GET_UPLOADED_TIMESHEET } from "constants/ApiUrls";
import { api } from "api/Api";
import { setTimeField } from "utils/Utils";

export default function AdminViewTimeSheet({ modal, toggle, data }) {
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
    }
  }, [modal, reset]);

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

  const onSubmit = (formData) => {
    // submitSheet(formData);
  };
  useEffect(() => {
    if (timeSheetData?.id) {
      setValue("notificationEmail", timeSheetData.notificationEmail);
      setValue("description", timeSheetData.description);
      setValue(
        "startTime",
        setTimeField(timeSheetData.startTime, timeSheetData?.jobId?.timeZone),
      );
      setValue(
        "endTime",
        setTimeField(timeSheetData.endTime, timeSheetData?.jobId?.timeZone),
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

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="addLocation-modal">
      <ModalHeader toggle={toggle}>View Time Sheet</ModalHeader>
      <ModalBody>
        {loader && (
          <div className="centered-spinner">
            <Spinner />
          </div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
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
