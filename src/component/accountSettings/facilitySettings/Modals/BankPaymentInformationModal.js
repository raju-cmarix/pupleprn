import React, { useContext, useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { CardDetailsInitialValue } from "constants/FormInitialValues";
import FormInput from "component/common/FormInput";
import {
  CardHolderNameRule,
  CardNumberRule,
  CVVRule,
  ExpMonthRule,
  ExpYearRule,
} from "constants/Rules";
import FormSelect from "component/common/FormSelect";
import {
  years,
  months,
} from "views/authentication/signUpClinician/HourlyConstant";
import UserContext from "utils/context/UserContext";
import {
  CARD_HOLDER_NAME_PLACEHOLDER,
  CARD_NUMBER_PLACEHOLDER,
  CVV_PLACEHOLDER,
  RESPONSE_OK,
} from "constants/AppConstants";
import { api } from "api/Api";
import { ADD_CARD } from "constants/ApiUrls";
import FormButton from "component/common/FormButton";
import { useNavigate } from "react-router-dom";

const AddCard = (props) => {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    control,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: { ...CardDetailsInitialValue },
  });
  const toggle = () => {
    reset();
    clearErrors();
    props?.toggle();
  };
  const handleCardSave = (data) => {
    setLoader(true);
    if (
      data?.cardNumber &&
      data?.cardHolderName &&
      data?.expMonth &&
      data?.expYear &&
      data?.cvvCode
    ) {
      const userId = user?.id;
      const submitData = { ...data, userId };
      api(ADD_CARD, submitData)
        .then((response) => {
          setLoader(false);
          if (response.status === RESPONSE_OK) {
            toggle();
          }
          if (props?.qs?.jobId && props?.qs?.facilityId) {
            navigate(
              `/facility/applicants?jobId=${props?.qs?.jobId}&facilityId=${props?.qs?.facilityId}`
            );
          }
        })
        .catch((err) => {
          console.log({ err });
          setLoader(false);
          toggle();
        });
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    clearErrors();
  }, [props?.isOpen]);

  return (
    <Modal isOpen={props?.isOpen} toggle={toggle} {...props?.args}>
      <ModalHeader toggle={toggle}>Add bank account details</ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
            <div className="form-group w-100">
              <FormInput
                name={"accountHolderName"}
                id={"accountHolderName"}
                type={"text"}
                label={"Account holder name"}
                register={register}
                rules={CardHolderNameRule}
                errors={errors}
                autoFocus={true}
                placeholder={CARD_HOLDER_NAME_PLACEHOLDER}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group w-100">
              <FormInput
                name={"bankaccountNumber"}
                id={"bankaccountNumber"}
                type={"number"}
                label={"Bank account number"}
                register={register}
                rules={CardNumberRule}
                errors={errors}
                autoFocus={true}
                placeholder={CARD_NUMBER_PLACEHOLDER}
                // onKeyDown={(e) => {
                //   if (e?.target?.value?.length > 0) {
                //     if (e?.target?.value?.length % 4 === 0) {
                //       e.target.value += " ";
                //     }
                //   }
                // }}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group w-100">
              <FormInput
                name={"bankName"}
                id={"bankName"}
                type={"text"}
                label={"Bank name"}
                register={register}
                rules={CardHolderNameRule}
                errors={errors}
                autoFocus={true}
                placeholder={CARD_HOLDER_NAME_PLACEHOLDER}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group w-100">
              <FormInput
                name={"routingNumber"}
                id={"routingNumber"}
                type={"number"}
                label={"Routing number"}
                register={register}
                rules={CardNumberRule}
                errors={errors}
                autoFocus={true}
                placeholder={CARD_NUMBER_PLACEHOLDER}
                // onKeyDown={(e) => {
                //   if (e?.target?.value?.length > 0) {
                //     if (e?.target?.value?.length % 4 === 0) {
                //       e.target.value += " ";
                //     }
                //   }
                // }}
              />
            </div>
          </Col>
        </Row>
        <div className="text-center mt-2">
          <FormButton
            type={"submit"}
            label={"Save"}
            loader={loader}
            onClick={handleSubmit(handleCardSave)}
            className="pt-btn-small pt-btn btn-primary"
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AddCard;
