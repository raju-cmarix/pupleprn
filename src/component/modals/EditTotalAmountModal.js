import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Form, Modal, ModalBody, ModalHeader } from "reactstrap";
import { api } from "api/Api";
import { UPDATE_APPLICANTS_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import FormInput from "component/common/FormInput";
import { TotalAmountRules } from "constants/Rules";
import FormButton from "component/common/FormButton";
import UserContext from "utils/context/UserContext";

export default function EditTotalAmountModal({ modal, toggle, data, getList }) {
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
    if (!isNaN(data.totalAmount)) {
      const reqData = {
        id: data.id,
        totalAmount: String(data.totalAmount),
        // totalWorkedHours: data.totalWorkedHours,
        userId: user?.id,
      };
      setLoader(true);
      api(UPDATE_APPLICANTS_URL, reqData).then((res) => {
        if (res.status === RESPONSE_OK) {
          setError("");
          getList(false);
          toggle();
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
      <ModalHeader toggle={toggle}>Edit Total amount</ModalHeader>
      <ModalBody>
        {error && <p style={{ color: "#ff3333", fontSize: "12px" }}>{error}</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="model-input total-amount">
            <FormInput
              name="totalAmount"
              id="totalAmount"
              label="$"
              type="number"
              placeholder=""
              autoFocus={false}
              register={register}
              rules={TotalAmountRules}
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
