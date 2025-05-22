import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import FormError from "component/common/FormError";
import { CONTACT_US_CITY_URL } from "constants/ApiUrls";
import { RESPONSE_OK } from "constants/AppConstants";
import { CityRules, EmailRules, StateRules } from "constants/Rules";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Input } from "reactstrap";
import { Mail, MapMarker, Marker } from "../../../assets/svg";
import "./locationMap.scss";

function LocationMap() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loader, setLoader] = useState(false);
  const { ref: cityRef, ...cityRest } = register("city", CityRules);
  const { ref: stateRef, ...stateRest } = register("state", StateRules);
  const { ref: emailRef, ...emailRest } = register("email", EmailRules);

  const onSubmit = (data) => {
    setLoader(true);
    api(CONTACT_US_CITY_URL, data).then((res) => {
      if (res.status === RESPONSE_OK) {
        reset({ city: "", state: "", email: "" });
      }
      setLoader(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="purple-location">
        <div className="purple-location-content">
          <div className="mb-48">
            <MapMarker />
          </div>
          <p className="mb-24">
            Request Purple PRN for your city! <br /> Add your city and email
            below!
          </p>
          <div className="mb-48 location-input">
            <div className="form-group">
              <label>City:</label>
              <div className="input-icon">
                <Input
                  name="city"
                  type="text"
                  className={
                    errors["city"]?.message
                      ? "form-control required"
                      : "form-control"
                  }
                  {...cityRest}
                  innerRef={cityRef}
                />
                <Marker />
              </div>
              <FormError msg={errors["city"]?.message} />
            </div>
            <div className="form-group">
              <label>State:</label>
              <div className="input-icon">
                <Input
                  name="state"
                  type="text"
                  className={
                    errors["state"]?.message
                      ? "form-control required"
                      : "form-control"
                  }
                  {...stateRest}
                  innerRef={stateRef}
                />
                <Marker />
              </div>
              <FormError msg={errors["state"]?.message} />
            </div>
            <div className="form-group ms-0">
              <label>Email:</label>
              <div className="input-icon">
                <Input
                  type="email"
                  name="email"
                  className={
                    errors["email"]?.message
                      ? "form-control required"
                      : "form-control"
                  }
                  {...emailRest}
                  innerRef={emailRef}
                />
                <Mail />
              </div>
              <FormError msg={errors["email"]?.message} />
            </div>
          </div>
          <FormButton
            label="Submit "
            className="pt-btn btn-primary"
            loader={loader}
            type={"submit"}
          />
        </div>
      </div>
    </Form>
  );
}

export default LocationMap;
