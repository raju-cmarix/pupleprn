import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "api/Api";
import { UPDATE_APPLICANTS_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import FormInput from "component/common/FormInput";
import { TotalWorkedHoursRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import UserContext from "utils/context/UserContext";

export default function EditTimeModal({ modal, toggle, data, getList }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    reset({ ...data });
  }, [data]);

    
  const onSubmit = (data) => {
    if (!isNaN(data.totalWorkedHours)) {
      const reqData = {
        id: data.id,
        // totalAmount: data.totalAmount,
        totalWorkedHours: data.totalWorkedHours,
        userId: user?.id,
      };
      setLoader(true);
      api(UPDATE_APPLICANTS_URL, reqData).then((res) => {
        if (res.status === RESPONSE_OK) {
          toggle();
          setError("");
          getList(false);
        }
        setLoader(false);
      });
    } else {
      setError("Only Numbers are supported");
    }
  };

  return (
    <Modal
      centered
      isOpen={modal}
      toggle={toggle}
      className="edittimework-modal"
    >
      <ModalHeader toggle={toggle}>Edit Time worked</ModalHeader>
      <ModalBody>
        {error && <p style={{ color: "#ff3333", fontSize: "12px" }}>{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="model-input">
            <FormInput
              name="totalWorkedHours"
              id="totalWorkedHours"
              label=""
              type="number"
              placeholder=""
              autoFocus={false}
              register={register}
              rules={TotalWorkedHoursRules}
              errors={errors}
              decimal={true}
            />
          </div>
          <div className="editworkmodal-btn text-center">
            <FormButton
              className={"btn-primary pt-btn"}
              label="Save"
              loader={loader}
              type={"submit"}
            />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
