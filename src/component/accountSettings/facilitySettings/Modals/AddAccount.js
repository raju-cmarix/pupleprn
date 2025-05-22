import React, { useContext, useEffect, useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { BankDetailsInitialValue } from "constants/FormInitialValues";
import FormInput from "component/common/FormInput";
import {
  AccountHolderNameRule,
  AccountNumberRule,
  AccTypeRule,
  RoutingNumberRule,
} from "constants/Rules";
import FormSelect from "component/common/FormSelect";
import { ACCOUNT_HOLDER_TYPE } from "views/authentication/signUpClinician/HourlyConstant";
import UserContext from "utils/context/UserContext";
import {
  BANK_ACCOUNT_NUMBER_PLACEHOLDER,
  CARD_HOLDER_NAME_PLACEHOLDER,
  RESPONSE_OK,
  ROUTING_NUMBER_PLACEHOLDER,
} from "constants/AppConstants";
import { api } from "api/Api";
import { ADD_ACCOUNT } from "constants/ApiUrls";
import FormButton from "component/common/FormButton";
import { useNavigate } from "react-router-dom";

const AddAccount = (props) => {
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    trigger,
    clearErrors,
    resetField,
  } = useForm({
    defaultValues: { ...BankDetailsInitialValue },
  });
  const toggle = () => {
    reset();
    clearErrors();
    resetField("bankAccountNumber");
    resetField("accountHolderName");
    resetField("accountHolderType");
    resetField("routingNumber");
    props?.toggle();
  };
  const handleCardSave = (data) => {
    setLoader(true);
    if (
      data?.bankAccountNumber &&
      data?.accountHolderName &&
      data?.accountHolderType &&
      data?.routingNumber
    ) {
      const userId = user?.id;
      const submitData = { ...data, userId };
      api(ADD_ACCOUNT, submitData)
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
                rules={AccountHolderNameRule}
                errors={errors}
                autoFocus={true}
                placeholder={CARD_HOLDER_NAME_PLACEHOLDER}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group w-100">
              <FormInput
                name={"bankAccountNumber"}
                id={"bankAccountNumber"}
                type={"number"}
                label={"Bank account number"}
                register={register}
                rules={AccountNumberRule}
                errors={errors}
                autoFocus={true}
                placeholder={BANK_ACCOUNT_NUMBER_PLACEHOLDER}
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
            <div className="form-group">
              <FormInput
                name={"routingNumber"}
                id={"routingNumber"}
                type={"text"}
                label={"Routing number:"}
                register={register}
                rules={RoutingNumberRule}
                errors={errors}
                autoFocus={true}
                placeholder={ROUTING_NUMBER_PLACEHOLDER}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <FormSelect
                options={ACCOUNT_HOLDER_TYPE}
                // placeholder={new Date()?.getFullYear()}
                placeholder="Select type"
                control={control}
                name={`accountHolderType`}
                id={`accountHolderType`}
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={AccTypeRule}
                label="Account type:"
                trigger={trigger}
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

export default AddAccount;
