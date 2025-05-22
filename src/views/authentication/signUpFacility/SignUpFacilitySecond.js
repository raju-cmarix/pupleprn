import { Close } from "assets/svg";
import FormCheckbox from "component/common/FormCheckbox";
import FormCleave from "component/common/FormCleave";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import FormSelect from "component/common/FormSelect";
import PlacesInput from "component/common/PlacesInput";
import UploadFile from "component/common/uploadFile";
import { ACCEPT_IMAGE, MAX_LENGTH } from "constants/AppConstants";
import {
  AboutFacilityRules,
  CityRules,
  CommentRules,
  FirstNameRules,
  LastNameRules,
  NameRules,
  OfficeNameRules,
  OfficeNickNameRules,
  phoneRules,
  phoneRulesOptional,
  ReferenceByRules,
  StateRules,
  ZipCodeRules,
} from "constants/Rules";
import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";
import { refBy, state } from "../signUpClinician/HourlyConstant";
import FooterButtons from "./FooterButtons";

const SignUpFacilitySecond = ({
  curStep,
  setCurStep,
  register,
  errors,
  control,
  setValue,
  getValues,
  trigger,
  watch,
  resetField,
  unregister,
  formData,
  callAPI,
  loader,
  user,
  handleFileRemove,
}) => {
  const navigate = useNavigate();
  const hearOtherOptions = ["Others", "Referral"]; //used to disable / enable other text field
  const [primaryAddress] = getValues([`addresses[0]`]);

  // Address array
  const {
    fields: locaFields,
    append: locaAppend,
    remove: locaRemove,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  // handle next button if no errors go to next step
  const handleNext = async () => {
    if (await trigger()) {
      try {
        await callAPI({
          ...formData,
          signupStageCount:
            user?.facilityId?.signupStageCount > 1
              ? user?.facilityId?.signupStageCount
              : 1,
        });
        navigate("/facility/signup?step=2");
        setCurStep(curStep + 1);
      } catch (error) {
        console.log("🚀 ~ handleNext ~ error:", error);
      }
    }
  };

  // if reference by field value is not inside hearOtherOptions reset & unregister other field
  const referenceFrom = watch("referenceFrom");
  useEffect(() => {
    if (!hearOtherOptions.includes(referenceFrom)) {
      resetField("referenceBy");
      unregister("referenceBy");
    }
  }, [referenceFrom]);

  return (
    <>
      <FormInput
        name="officeName"
        id="officeName"
        label="Facility Name: "
        type="text"
        register={register}
        rules={OfficeNameRules}
        errors={errors}
        divClassName="form-group nick-name"
        autoFocus={true}>
        {/* <span>
          This will be displayed to our users, so please include the full name.
          If you have multiple locations, indicate which one it is within the
          name, e.g. St. Luke’s Hospital - Riverdale
        </span> */}
      </FormInput>
      <hr className="my-3" />

      <h3>
        Primary Contact <span style={{ color: "red" }}>*</span>
      </h3>
      <FormInput
        name={"primaryFirstName"}
        id={"primaryFirstName"}
        type={"text"}
        label={"First Name: "}
        register={register}
        rules={FirstNameRules}
        errors={errors}
      />
      <FormInput
        name={"primaryLastName"}
        id={"primaryLastName"}
        type={"text"}
        label={"Last Name: "}
        register={register}
        rules={LastNameRules}
        errors={errors}
      />
      <FormCleave
        trigger={trigger}
        control={control}
        name={"primaryPhone"}
        id={"primaryPhone"}
        label={"Phone Number:"}
        register={register}
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
              defaultValue="allowSMSNotifications"
              register={register}
              errors={errors}></FormCheckbox>
            <div style={{ fontSize: "12px", color: "#80798b" }}>
              I agree to receive SMS messages from application for account
              notifications, new chats, etc.
            </div>
          </div>
        }
      />

      <FormInput
        name={"primaryRole"}
        id={"primaryRole"}
        type={"text"}
        label={"Role:"}
        register={register}
        rules={{}}
        errors={errors}
      />

      <hr></hr>
      <h3>After hours contact</h3>
      <FormInput
        name={"afterHoursName"}
        id={"afterHoursName"}
        type={"text"}
        label={"Name:"}
        register={register}
        rules={NameRules}
        errors={errors}
      />
      <FormCleave
        trigger={trigger}
        name={"afterHoursPhone"}
        label={"Phone number:"}
        rules={phoneRules}
        errors={errors}
        control={control}
      />
      <span className="sub-text">
        Someone who can respond during non-business hours about emergencies or
        shift issues
      </span>
      <hr></hr>
      <h3>Office Admin or Receptionist</h3>
      <FormInput
        name={"frontOfficePersonName"}
        id={"frontOfficePersonName"}
        type={"text"}
        label={"Name:"}
        register={register}
        rules={{}}
        errors={errors}
      />
      <FormCleave
        trigger={trigger}
        name={"frontOfficePersonPhone"}
        label={"Phone number:"}
        rules={phoneRulesOptional}
        errors={errors}
        control={control}
      />
 <hr className="my-3" />

<h3>
Timesheet Approval Person
</h3>
<FormInput
  name={"facilityRepresentativeName"}
  id={"facilityRepresentativeName"}
  type={"text"}
  label={"Name: "}
  register={register}
  rules={{}}
  errors={errors}
/>
<FormInput
  name={"facilityRepresentativeEmail"}
  id={"facilityRepresentativeEmail"}
  type={"text"}
  label={"Email:"}
  register={register}
  rules={{}}
  errors={errors}
/>

      <hr></hr>
      <h3>Facility Locations</h3>
      {locaFields && locaFields?.length >= 0 && (
        <div className="divider-form w-100">
          {locaFields &&
            locaFields?.length >= 0 &&
            locaFields.map((location, index) => {
              const isPrimary = index === 0;
              return (
                <div
                  key={location.id}
                  className="mt-3">
                  <h3>
                    Location
                    {isPrimary ? " (Primary)" : ` ${index + 1}`}
                  </h3>
                  {!isPrimary && (
                    <Col md={6}>
                      <div className="picture-block">
                        <p className="mb-0">Profile Picture (optional)</p>
                        <div className="uploaded-pic">
                          <UploadFile
                            multiple={false}
                            serverFiles={
                              getValues(`addresses[${index}].picUrl`)
                                ? [getValues(`addresses[${index}].picUrl`)]
                                : []
                            }
                            max={1}
                            id={`addresses[${index}].picUrl`}
                            accept={ACCEPT_IMAGE}
                            folder="images"
                            onFileRemove={handleFileRemove}
                            callbackFn={(res) => {
                              setValue(
                                `addresses[${index}].picUrl`,
                                res[0] || null,
                              );
                            }}
                            deleteCallbackFn={() =>
                              setValue(`addresses[${index}].picUrl`, null)
                            }
                          />
                        </div>
                      </div>
                    </Col>
                  )}
                  <Col
                    md={12}
                    className="mt-1">
                    <FormInput
                      name={`addresses[${index}].nickname`}
                      id={`addresses[${index}].nickname`}
                      label={"Nickname: "}
                      placeholder={"Address Nickname"}
                      type={"text"}
                      register={register}
                      rules={OfficeNickNameRules}
                      errors={errors}
                      divClassName="office-address form-group nick-name"
                      errorMsg={
                        errors["addresses"]?.[index]?.["nickname"]?.message
                      }
                    />
                  </Col>
                  <Col md={12}>
                    <PlacesInput
                      label={"Address:"}
                      setValue={setValue}
                      register={register}
                      trigger={trigger}
                      value={getValues(`addresses[${index}].address1`)}
                      addressLine={`addresses[${index}].address1`}
                      addressCity={`addresses[${index}].city`}
                      addressState={`addresses[${index}].state`}
                      addressZipcode={`addresses[${index}].zipCode`}
                      lat={`addresses[${index}].lat`}
                      long={`addresses[${index}].long`}
                      error={errors["addresses"]?.[index]?.["address1"]}
                      placeholder="Address Line 1"
                    />
                    <FormInput
                      name={`addresses[${index}].address2`}
                      id={`addresses[${index}].addresses`}
                      type={"text"}
                      register={register}
                      rules={{}}
                      errors={errors}
                      placeholder="Address line 2"
                      divClassName={"office-address form-group nick-name"}
                    />
                  </Col>
                  <div className="d-md-flex gap-3 w-100">
                    <FormInput
                      divClassName="form-group"
                      name={`addresses[${index}].city`}
                      id={`addresses[${index}].city`}
                      type={"text"}
                      label={"City:"}
                      register={register}
                      rules={CityRules}
                      errors={errors}
                      errorMsg={errors["addresses"]?.[index]?.["city"]?.message}
                    />
                    <FormSelect
                      options={state}
                      placeholder="Select"
                      trigger={trigger}
                      control={control}
                      name={`addresses[${index}].state`}
                      errors={errors}
                      optionValue="value"
                      optionLabel="label"
                      rules={StateRules}
                      divClassName="form-group"
                      errorMsg={
                        errors["addresses"]?.[index]?.["state"]?.message
                      }
                      label="State:"
                    />
                    <FormInput
                      divClassName="form-group"
                      name={`addresses[${index}].zipCode`}
                      id={`addresses[${index}].zipCode`}
                      type={"number"}
                      label={"Zip code:"}
                      register={register}
                      rules={ZipCodeRules}
                      errors={errors}
                      errorMsg={
                        errors["addresses"]?.[index]?.["zipCode"]?.message
                      }
                    />
                  </div>
                  <Col md={12}>
                    <div className="clinic-question-ans">
                      <p className="mb-0 mt-1">
                        Share more about your facility (Highlight for clinicians
                        why they would want to pick up a shift at your clinic)
                      </p>

                      <FormInput
                        id={`addresses[${index}].description`}
                        name={`addresses[${index}].description`}
                        divClassName={"h-100 form-group office-address nick-name"}
                        register={register}
                        errors={errors}
                        type={"textarea"}
                        maxLength={10000}
                        rules={AboutFacilityRules}
                        placeholder={
                          "Example:  We are a small clinic. We see predominately musculoskeletal conditions in middle age adults with a sprinkle of total joints or neuro. Patients are scheduled every 45 minutes and get 1:1 care. We have techs to assist in setting up and cleaning."
                        }
                        errorMsg={
                          errors["addresses"]?.[index]?.["description"]?.message
                        }
                      />
                    </div>
                  </Col>

                  <div className="d-grid add-remove-btn">
                    {index === locaFields.length - 1 && (
                      <button
                        type="button"
                        className="btn-link add-btn"
                        onClick={() =>
                          locaAppend({
                            description: primaryAddress?.description,
                            picUrl: "",
                          })
                        }>
                        + Add Location{" "}
                      </button>
                    )}
                    {!isPrimary && (
                      <button
                        type="button"
                        className="btn-link-secondary remove-btn"
                        onClick={() => {
                          locaRemove(index);
                        }}>
                        <Close />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {locaFields?.length <= 0 && (
        <button
          type="button"
          className="btn-link add-btn"
          onClick={() =>
            locaAppend({
              description: primaryAddress?.description,
              picUrl: "",
            })
          }>
          {" "}
          + Add Location{" "}
        </button>
      )}
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
        disabled={!hearOtherOptions.includes(referenceFrom)}
        divClassName="textarea heartext"
        name={"referenceBy"}
        id={"referenceBy"}
        type={"textarea"}
        label={""}
        register={register}
        rules={hearOtherOptions.includes(referenceFrom) ? CommentRules : {}}
        errors={errors}
        placeholder="Let us know if any other way you have heard about Purple PRN."
        maxLength={MAX_LENGTH}
      />

      <FooterButtons
        // leftLabel={"Prev"}
        rightLabel={"Save & Next"}
        setCurStep={setCurStep}
        curStep={curStep}
        onRightClick={() => handleNext()}
        loader={loader}
      />
    </>
  );
};

export default SignUpFacilitySecond;
