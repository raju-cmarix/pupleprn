import React, { useState, useEffect } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import FormButton from "component/common/FormButton";
import { useForm } from "react-hook-form";
import { api } from "api/Api";
import {
  ADD_MEDIAN_RATES,
  CLINICIAN_NOTIFICATION,
  MEDIAN_RATES,
} from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import FormSelect from "component/common/FormSelect";
import FormInput from "component/common/FormInput";
import { ClinicianTextRules, ClinicianTitleRules } from "constants/Rules";
import ReactQuill from "react-quill";

export default function AddNewBroadcastModal({ modal, toggle, callbackFn }) {
  const {
    register,
    trigger,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [notifyText, setNotifyText] = useState("");
  // const [notifyTitle, setNotifyTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [filters, setFilters] = useState({
    direction: "aToZ",
  });

  const getList = async () => {
    setLoader(true);
    await api(MEDIAN_RATES, {}, null, filters).then((res) => {
      if (res.status === RESPONSE_OK) {
        setList(res?.data?.data);
        setLoader(false);
      }
    });
  };

  const quillModules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ align: [] }],
      [
        {
          color: [
            "#382768",
            "#01A796",
            "#32325D",
            "#CACACA",
            "#80798B",
            "#000",
            "#FFF",
            "#E20303",
            "#FF9F43",
            "#01AED4",
          ],
        },
      ],
      ["clean"], // remove formatting button
    ],
  };

  useEffect(() => {
    getList();
  }, [filters]);

  const onSubmit = (data) => {
    // Reset error message before checking
    //  setErrorMessage(null);

    // Check for empty notifyText
    if (!notifyText || notifyText.trim() === "") {
      setErrorMessage(ClinicianTextRules.required || "Message is required");
      return;
    }
    // setLoader(true);
    setErrorMessage(null);
    setFormData(data); // Store form data
    setConfirmModal(true); // Open confirmation modal
  };
  const confirmSendNotification = () => {
    setLoader(true);

    api(CLINICIAN_NOTIFICATION, {
      ...formData,

      notifyText: notifyText,
    }).then((res) => {
      if (res.status === RESPONSE_OK) {
        callbackFn();
        reset({
          notifyTitle: "",
          medianTypeId: "",
          notifyText: "",
        });

        setNotifyText("");
      }
      setLoader(false);
      setConfirmModal(false);
      toggle();
    });
  };

  useEffect(() => {
    if (modal) {
      reset({
        medianTypeId: "",
        notifyTitle: "",
        notifyText: notifyText || "",
      });
    }
  }, [modal, reset]);

  return (
    <>
      <Modal
        centered
        isOpen={modal}
        toggle={toggle}
        className="addLocation-modal"
      >
        <ModalHeader toggle={toggle}>
          Send notification to clinician
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column mb-2">
              <FormSelect
                options={[
                  { value: "", label: "All" },
                  ...list.map((data) => ({
                    value: data.id,
                    label: data.metroAreaName,
                  })),
                ]}
                placeholder="Select"
                control={control}
                name="medianTypeId"
                id="medianTypeId"
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={{}}
                label="Metro Area"
                divClassName="form-group"
              />
              <div className="form-group aboutme">
                <FormInput
                  type={"text"}
                  name={"notifyTitle"}
                  id={"notifyTitle"}
                  value={"notifyTitle"}
                  label="Title:"
                  register={register}
                  defaultValue={{}}
                  rules={ClinicianTitleRules}
                  options={{}}
                  errors={errors}
                  control={control}
                />
              </div>
              <div className="form-group aboutme">
                <p
                  style={{
                    fontSize: "12px",
                    color: "#80798b",
                    lineHeight: "12px",
                  }}
                >
                  Message:
                </p>
                <ReactQuill
                  name={"notifyText"}
                  id={"notifyText"}
                  value={notifyText}
                  onChange={(value) => {
                    setNotifyText(value);
                    setValue("notifyText", value); // Set value for react-hook-form
                    trigger("notifyText"); // Trigger validation manually
                  }}
                  modules={quillModules}
                  style={{ height: "200px", overflowY: "auto" }}
                />
                {/* Display error message */}
                {errorMessage && (
                  <p style={{ color: "#DC3545", fontSize: "12px" }}>
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
            <div className="text-center">
              <FormButton
                loader={loader}
                className={"pt-btn-small pt-btn btn-primary editexp-btn"}
                type="submit"
                label={"Save"}
              />
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        centered
        isOpen={confirmModal}
        toggle={() => setConfirmModal(false)}
        className="confirmation-modal"
      >
        <ModalHeader toggle={() => setConfirmModal(false)}></ModalHeader>
        <ModalBody className="text-center">
          <div
            style={{ justifyContent: "center" }}
            className="form-group mb-48"
          >
            <label htmlFor="State">
              Are you sure you want to send this popup to clinician?
            </label>
          </div>
          <div className="modal-footer text-center">
            <button
              className="btn-gray pt-btn pt-btn-small"
              onClick={() => setConfirmModal(false)}
            >
              No
            </button>
            <button
              className="btn-primary pt-btn pt-btn-small"
              onClick={confirmSendNotification}
            >
              Yes
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
