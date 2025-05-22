import FormCheckbox from "component/common/FormCheckbox";
import FormCleave from "component/common/FormCleave";
import FormDatePicker from "component/common/FormDatePicker";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import FormSelect from "component/common/FormSelect";
import {
  CityRules,
  CommentRules,
  DOBRules,
  FirstNameRules,
  GenderRules,
  LanguageRules,
  LastNameRules,
  NameRules,
  phoneRules,
  ReferenceByRules,
  StateRules,
  ZipCodeRules,
} from "constants/Rules";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FooterButtons from "../signUpFacility/FooterButtons";
import { gender, language, refBy, state } from "./HourlyConstant";
import PlacesInput from "component/common/PlacesInput";
import ReactGA from "react-ga4";

export default function SignUpClinicianSecond({
  register,
  errors,
  setCurStep,
  curStep,
  trigger,
  control,
  watch,
  resetField,
  unregister,
  formData,
  callAPI,
  loader,
  user,
  setValue,
  getValues,
}) {
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: `${PageTitle} - Step 2`,
  });
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: `${PageTitle} - Step 2`,
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  
  let navigate = useNavigate();
  const referenceFrom = watch("referenceFrom");
  const hearOtherOptions = ["Others", "Referral"];

  useEffect(() => {
    if (!hearOtherOptions.includes(referenceFrom)) {
      resetField("referenceBy");
      unregister("referenceBy");
    }
  }, [referenceFrom]);

  const handleNext = async () => {

    const category = 'User Interaction'; 
    const action = 'Click'; 
    const label = 'Save & Next'; 
  
    window.dataLayer.push({
      event: 'submit-form',
      eventProps: {
        category: category,
        action: action,
        label: label
      }
    });
   
    const isStep2Valid = await trigger([
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "phone",
      "knownLanuages",
      "emrgencyContactName",
      "emrgencyContactPhone",
      "homeAddress1",
      "homeAddressCity",
      "homeAddressState",
      "homeAddressZipCode",
      "referenceFrom",
      "referenceBy"
    ]);
  
    if (isStep2Valid) {
    // if (await trigger()) {
      try {
       
        await callAPI({
          ...formData,
          homeAddressCity: getValues("homeAddressCity"),
          signupStageCount:1
            // user?.clinicianId?.signupStageCount > 1
            //   ? user?.clinicianId?.signupStageCount
            //   : 1,
        });
       
        navigate("/clinician/signup?step=1");
        // setCurStep(curStep + 1);
      } catch (error) {
        console.log(error, "error");
      }
    }
    ReactGA.event({
      category: 'Signup',
      action: 'Clicked Save Button',
      label: 'Saved Clinician Signup Form',
    });
  };

  return (
    <>
    <div className="">
      <h3>General information</h3>
      <div  className="form-data d-flex justify-content-between">
      <FormInput
        inputDivClassName={"signup-input"}
        name={"firstName"}
        id={"firstName"}
        type={"text"}
        label={"First Name"}
        register={register}
        rules={FirstNameRules}
        errors={errors}
      />
      <FormInput
        inputDivClassName={"signup-input"}
        name={"lastName"}
        id={"lastName"}
        type={"text"}
        label={"Last Name"}
        register={register}
        rules={LastNameRules}
        errors={errors}
      />
      </div>

      <div className="form-data d-flex justify-content-between">
      <FormSelect
        options={gender}
        placeholder="Select"
        control={control}
        name={"gender"}
        errors={errors}
        optionValue="value"
        optionLabel="label"
        rules={GenderRules}
        label="Gender:"
        trigger={trigger}
      />
      <FormDatePicker
        label={"Date of birth:"}
        name={"dateOfBirth"}
        id={"dateOfBirth"}
        errors={errors}
        rules={DOBRules}
        control={control}
        maxDate={new Date()}
        trigger={trigger}
        inputDivClassName="dateofbirth"
      />
      </div>

      <div className="form-data d-flex justify-content-between">
      <FormCleave
        trigger={trigger}
        control={control}
        name={"phone"}
        id={"phone"}
        type={"number"}
        label={"Phone number:"}
        rules={phoneRules}
        errors={errors}
        checkBox={
          <div className="d-flex gap-1 align-items-center mt-1">
            <FormCheckbox
              control={control}
              divClassName="i-agree mt-1"
              className="form-check-input"
              name="allowSMSNotifications"
              options={[{ label: "", value: "allowSMSNotifications" }]}
              defaultChecked={true}
              register={register}
              errors={errors}></FormCheckbox>
            <div
              style={{ fontSize: "12px", color: "#80798b", marginTop: "12px" }}>
              We send some notifications via text (shift confirmations, chat
              messages, etc)
            </div>
          </div>
        }
        // extraText={
        //   <p>
        //     We send some notifications via text (shift confirmations, chat
        //     messages, etc ).
        //   </p>
        // }
      />
      <FormSelect
        options={language}
        placeholder="Select"
        control={control}
        isClearable={true}
        name={"knownLanuages"}
        errors={errors}
        optionValue="value"
        optionLabel="label"
        rules={LanguageRules}
        multiple={true}
        label="Languages spoken:"
        className="lang"
        trigger={trigger}
      />
      </div>
      {/* <FormSelect
        options={clinician}
        placeholder="Select"
        control={control}
        name={"roles"}
        errors={errors}
        optionValue="value"
        optionLabel="label"
        rules={ClinicianTypeRules}
        label="Clinician type:"
        trigger={trigger}
      /> */}
      <hr></hr>
      <h3>Emergency contact</h3>
      <div  className="form-data d-flex justify-content-between">
      <FormInput
        inputDivClassName={"signup-input"}
        name={"emrgencyContactName"}
        id={"emrgencyContactName"}
        type={"text"}
        label={"Name:"}
        register={register}
        rules={NameRules}
        errors={errors}
      />

      <FormCleave
        trigger={trigger}
        control={control}
        name={"emrgencyContactPhone"}
        id={"emrgencyContactPhone"}
        type={"number"}
        label={"Phone number:"}
        rules={phoneRules}
        errors={errors}
      />
      </div>
      <hr></hr>
      <h3>Home address</h3>
      <PlacesInput
        setValue={setValue}
        register={register}
        trigger={trigger}
        value={getValues("homeAddress1")}
        addressLine="homeAddress1"
        addressCity="homeAddressCity"
        addressZipcode="homeAddressZipCode"
        addressState="homeAddressState"
        error={errors["homeAddress1"]}
        placeholder="Address Line 1"
        name={"homeAddress1"}
      />
      <FormInput
        name={"homeAddress2"}
        id={"homeAddress2"}
        type={"text"}
        register={register}
        rules={{}}
        errors={errors}
        placeholder="Address line 2"
        divClassName="form-group office-address"
      />
      <div className="d-md-flex gap-5 w-100">
        <FormInput
          divClassName={"form-group w-100"}
          name={"homeAddressCity"}
          id={"homeAddressCity"}
          type={"text"}
          label={"City:"}
          register={register}
          rules={CityRules}
          errors={errors}
        />
        <FormSelect
          options={state}
          placeholder="Select"
          control={control}
          name={"homeAddressState"}
          errors={errors}
          optionValue="value"
          optionLabel="label"
          rules={StateRules}
          label="State:"
          trigger={trigger}
          divClassName={"form-group w-100"}
        />
        <FormInput
          divClassName={"form-group w-100"}
          name={"homeAddressZipCode"}
          id={"homeAddressZipCode"}
          type={"number"}
          label={"Zip code:"}
          register={register}
          rules={ZipCodeRules}
          errors={errors}
        />
      </div>
      <hr></hr>
      <div className="form-group hear-about">
        <p>How did you hear about Purple PRN?</p>
        <FormRadio
          divClassName="pt-radio"
          name={"referenceFrom"}
          options={refBy}
          register={register}
          rules={ReferenceByRules}
          errors={errors}
          className="pt-radio"
        />
      </div>

      <FormInput
        divClassName="form-group office-address heartext"
        name={"referenceBy"}
        id={"referenceBy"}
        type={"text"}
        label={""}
        register={register}
        rules={hearOtherOptions.includes(referenceFrom) ? CommentRules : {}}
        disabled={!hearOtherOptions.includes(referenceFrom)}
        errors={errors}
        placeholder="If someone referred you, write their name here. You will both receive a reward after completing your first shift!"
      />

      <FooterButtons
        // leftLabel={"Prev"}
        rightLabel={"Save"}
        setCurStep={setCurStep}
        curStep={curStep}
        loader={loader}
        onRightClick={() => handleNext()}
      />
    </div>
    </>
  );
}
