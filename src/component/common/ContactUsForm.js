import { Col, Form, Row } from "reactstrap";
import { api } from "api/Api";
import { CONTACT_US_URL } from "constants/ApiUrls";
import { FBEventCookies, RESPONSE_OK } from "constants/AppConstants";
import { useForm } from "react-hook-form";
import FormInput from "component/common/FormInput";
import {
  EmailRules,
  MessageRules,
  NameRules,
  phoneRules,
} from "constants/Rules";
import FormButton from "component/common/FormButton";
import { useEffect, useState } from "react";
import FormCleave from "./FormCleave";

export default function ContactUsForm({ md }) {
  const PageTitle = document?.title;
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "pageview",
      page: {
        title: `${PageTitle}`,
        url: window.location.href,
        path: window.location.pathname,
      },
    });
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [loader, setLoader] = useState(false);

  const onSubmit = (data) => {
    const category = "User Interaction";
    const action = "Click";
    const label = "Send";
    const value = 1;

    window.dataLayer.push({
      event: "contact-us",
      eventProps: {
        category: category,
        action: action,
        label: label,
        value: value,
      },
    });
    setLoader(true);
    api(CONTACT_US_URL, { ...data, ...FBEventCookies }).then((res) => {
      if (res.status === RESPONSE_OK)
        reset({
          name: "",
          companyName: "",
          email: "",
          phone: "",
          message: "",
        });
      setLoader(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col
          md={md}
          className="mb-12">
          <FormInput
            divClassName="form-group"
            name={"name"}
            id={"name"}
            type={"text"}
            label={"Name:"}
            register={register}
            rules={NameRules}
            errors={errors}
            autoFocus={false}
          />
        </Col>
        <Col
          md={md}
          className="mb-12">
          <div className="form-group ms-auto">
            <FormInput
              divClassName="form-group"
              name={"companyName"}
              id={"companyName"}
              type={"text"}
              label={"Company (optional):"}
              register={register}
              rules={{}}
              errors={errors}
              autoFocus={false}
            />
          </div>
        </Col>
        <Col
          md={md}
          className="mb-12">
          <div className="form-group">
            <FormInput
              divClassName="form-group"
              name={"email"}
              id={"email"}
              type={"email"}
              label={"Email:"}
              register={register}
              rules={EmailRules}
              errors={errors}
              autoFocus={false}
            />
          </div>
        </Col>
        <Col
          md={md}
          className="mb-48">
          <div className="form-group ms-auto">
            <FormCleave
              trigger={trigger}
              divClassName="form-group"
              name={"phone"}
              id={"phone"}
              type={"number"}
              label={"Phone:"}
              control={control}
              rules={phoneRules}
              errors={errors}
              autoFocus={false}
            />
          </div>
        </Col>
        <Col md={12}>
          <FormInput
            divClassName="form-group textarea mb-48"
            name={"message"}
            id={"message"}
            type={"textarea"}
            label={"Message:"}
            register={register}
            rules={MessageRules}
            errors={errors}
            autoFocus={false}
          />
          <div className="text-center">
            <FormButton
              label={"Send"}
              type="submit"
              className="pt-btn btn-primary"
              loader={loader}
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
}
