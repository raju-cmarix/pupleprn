import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { SmallPlus, Close } from "../../../assets/svg";
import FooterButtons from "../signUpFacility/FooterButtons";
import FormInput from "component/common/FormInput";
import FormSelect from "component/common/FormSelect";
import { useFieldArray } from "react-hook-form";
import {
  CPRRules,
  EducationRules,
  GraduationYearRules,
  LicenseNumberRules,
  PLExpireDateRules,
  SpecialityRules,
  StateRules,
  YearsOfPracticeRules,
  cprExpiryDateRules,
} from "constants/Rules";
import {
  certificationYear,
  education,
  specialties,
  specialtiesYear,
  experience,
  state,
} from "./HourlyConstant";
import FormRadio from "component/common/FormRadio";
import FormDatePicker from "component/common/FormDatePicker";
import { ACCEPT_IMAGE_PDF, lastdayoflastmonth } from "constants/AppConstants";
import UploadFile from "component/common/uploadFile";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ReactGA from "react-ga4";

export default function SignUpClinicianThird({
  register,
  errors,
  setCurStep,
  curStep,
  trigger,
  control,
  watch,
  setValue,
  otherFormData,
  fileCallbackFn,
  deleteCallbackFn,
  setError,
  formData,
  callAPI,
  loader,
  user,
  filesToRemove,
  showError,
  setShowError
}) {
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: `${PageTitle} - Step 3`,
  });
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: `${PageTitle} - Step 3`,
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  let navigate = useNavigate();
  // const [showError, setShowError] = useState(false);
  const isCPRCertification = watch("isCPRCertification");

  const {
    fields: licFields,
    append: licAppend,
    remove: licRemove,
  } = useFieldArray({
    control,
    name: "licenseDetails",
  });

  const {
    fields: certiFields,
    append: certiAppend,
    remove: certiRemove,
  } = useFieldArray({
    control,
    name: "certificationDetails",
  });

  const {
    fields: speFields,
    append: speAppend,
    remove: speRemove,
  } = useFieldArray({
    control,
    name: "specialityDetails",
  });

  const {
    fields: faciltyCertificationFields,
    append: faciCertiAppend,
    remove: faciCertiRemove,
  } = useFieldArray({
    control,
    name: "facilityCertificates",
  });

  if (faciltyCertificationFields.length === 0) {
    faciCertiAppend("");
  }

  useEffect(() => {
    if (watch("isCPRCertification") === "false") {
      setValue("cprExpiryDate", undefined);
      otherFormData["cprPictureUrl"] = undefined;
    }
  }, [isCPRCertification]);

  let apiCall = async () => {
  
    const isStep3Valid = await trigger([
     "educationSchool",
     "graduationYear",
     "totalPracticYears",
     ...licFields.flatMap((_, index) => [
      `licenseDetails[${index}].state`,
      `licenseDetails[${index}].licenseNumber`,
      `licenseDetails[${index}].licenseExpDate`,
    ]),
    ]);
 
    if (isStep3Valid) {
    try {
    
      await callAPI({
        ...formData,
        signupStageCount:2
          // user?.clinicianId?.signupStageCount > 2
          //   ? user?.clinicianId?.signupStageCount
          //   : 2,
      });
      // navigate("/clinician/signup?step=1");
      // setCurStep(curStep + 1);
    } catch (error) { console.log(error) }
  
}
  };
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
    if (watch("isCPRCertification") === "true") {
 
      // Force validation
      const isValid = await trigger(["cprExpiryDate", "cprPictureUrl"]);
     
      if (!isValid) {
        console.log("Validation failed", errors);
        setShowError(true);
        return;
      }
  
      setShowError(false);
      await apiCall();
    }
  
    if (watch("isCPRCertification") === "false") {
      setShowError(false);
      await apiCall();
    }
    ReactGA.event({
      category: 'Signup',
      action: 'Clicked Save Button',
      label: 'Saved Clinician Signup Form',
    });
  };
  
  // const handleNext = async () => {
  //   if (watch("isCPRCertification") === "true") {
     
  //     setShowError(true);
  //     if (watch("cprExpiryDate") !== "undefined" || watch("cprExpiryDate") !== "") {
  //       if (
  //         otherFormData["cprPictureUrl"] !== undefined &&
  //         otherFormData?.cprPictureUrl.length !== 0
  //       ) {
  //         setShowError(false);
  //         await apiCall();
  //       }

  //       setShowError(true);
  //     } else {
  //       console.log(1, "cprExpiryDate")
  //       setShowError(true);
  //     }
  //   }
  //   if (watch("isCPRCertification") === "false") {
  //     setShowError(false);
  //     await apiCall();
  //   }
  // };

  function calculateCPRCertificationRules(isCPRCertification) {
    if (isCPRCertification === "true") {
      return cprExpiryDateRules;
    }
    if (isCPRCertification === "false") {
      return {};
    }
    // return isCPRCertification === "true" ? cprExpiryDateRules : "";
  }

  // Function to Append License Details
  const handleLicsenseAppend = () => {
    if (!errors?.licenseDetails) {
      licAppend({});
    } else {
      toast.error("Please complete the previous field - License Details");
    }
  };

  return (
    <div className="signup-layout-third">
      <h3>CPR</h3>
      <div className="box-item">
        <p>Do you have current CPR certification?</p>
        <div className="cpr-radio">
          <FormRadio
            name={"isCPRCertification"}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
            register={register}
            rules={CPRRules}
            errors={errors}
            divClassName="pt-radio"
          />
        </div>
        <Row>
          <Col md={6}>
            <div className="form-group EXP">
              <FormDatePicker
                minDate={lastdayoflastmonth()}
                dateFormat={"MM/yyyy"}
                showMonthYearPicker={true}
                label={"Expiration date:"}
                name={"cprExpiryDate"}
                id={"cprExpiryDate"}
                errors={errors}
                isCPRCertification={isCPRCertification}
                rules={calculateCPRCertificationRules(isCPRCertification)}
                control={control}
                className="CPR_EX"
                trigger={trigger}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="form-group">
              <label htmlFor="State"> PDF / image :</label>
              <div className="signup-upload-file">
                <UploadFile
                  gridView={true}
                  multiple={false}
                  id="cprPictureUrl"
                  name="cprPictureUrl"
                  accept={ACCEPT_IMAGE_PDF}
                  folder="docs"
                  max={1}
                  isCPRCertification={watch("isCPRCertification")}
                  showErrors={showError}
                  serverFiles={
                    otherFormData["cprPictureUrl"]
                      ? [otherFormData["cprPictureUrl"]]
                      : []
                  }
                  callbackFn={fileCallbackFn}
                  deleteCallbackFn={deleteCallbackFn}
                  onFileRemove={filesToRemove}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <hr></hr>
      <div className="number npi-block">
        <h3 className="m-0">NPI number </h3>
        <ul className="m-0 mt-2 ms-2">
          <li className="text-highlight">
            <p className="m-0">
              <a
                className="text-highlight"
                target={"_blank"}
                rel={"noreferrer"}
                href="https://npiregistry.cms.hhs.gov/search">
                Click here to find your NPI
              </a>
            </p>
          </li>
          <li>
            <p className="m-0">
              If you don't have one, take 4 minutes to get one here:{" "}
              <a
                className="text-highlight"
                target={"_blank"}
                rel={"noreferrer"}
                href="https://nppes.cms.hhs.gov/#/">
                https://nppes.cms.hhs.gov/
              </a>
            </p>
          </li>
          <li>
            <p className="m-0">
              Questions?{" "}
              <a
                className="text-highlight"
                target={"_blank"}
                rel={"noreferrer"}
                href="https://docs.google.com/document/d/e/2PACX-1vSVOpAzJxg5TyQoKrdx18SQD2PR725raK5lHxWpYVeDecICS1mu7AxA8nPnJ6lmb26X_cHR-1aXwim_/pub">
                Click here to check out our NPI guide
              </a>
            </p>
          </li>
        </ul>
        <FormInput
          inputDivClassName={"signup-input education-input"}
          name="npiNumber"
          id={"npiNumber"}
          type={"textarea"}
          register={register}
          rules={{}}
          errors={errors}
          divClassName="NPI"
          maxLength={250}
        />
      </div>
      <hr></hr>
      <div className="form-group education">
        <h3>Education</h3>
        <FormInput
          name={"educationSchool"}
          id={"educationSchool"}
          type={"text"}
          label={"PT, PTA, OT, OTA, SLP school:"}
          register={register}
          rules={EducationRules}
          errors={errors}
          // autoFocus={true}
          divClassName="PT-School"
        />
      </div>
      <Row>
        <Col md={6}>
          <FormSelect
            options={education}
            placeholder="Select"
            control={control}
            name={"graduationYear"}
            errors={errors}
            optionValue="value"
            optionLabel="label"
            rules={GraduationYearRules}
            label="Graduation year:"
            trigger={trigger}
          />
        </Col>
        <Col md={6}>
          <FormSelect
            options={experience}
            placeholder="Select"
            control={control}
            name={"totalPracticYears"}
            errors={errors}
            optionValue="value"
            optionLabel="label"
            rules={YearsOfPracticeRules}
            label="Years of practice:"
            trigger={trigger}
          />
        </Col>
      </Row>
      <hr></hr>
      <h3>Professional license</h3>
      <div className="divider-form">
        {licFields.map((field, index) => {
          return (
            <Row key={field.id}>
              <Col md={6}>
                <FormSelect
                  options={state}
                  placeholder="Select"
                  control={control}
                  name={`licenseDetails[${index}].state`}
                  id={`licenseDetails[${index}].state`}
                  errorMsg={
                    errors["licenseDetails"]?.[index]?.["state"]?.message
                  }
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={StateRules}
                  label="State:"
                  trigger={trigger}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  name={`licenseDetails[${index}].licenseNumber`}
                  id={`licenseDetails[${index}].licenseNumber`}
                  type={"text"}
                  label={"License #:"}
                  register={register}
                  rules={LicenseNumberRules}
                  errors={errors}
                  errorMsg={
                    errors["licenseDetails"]?.[index]?.["licenseNumber"]
                      ?.message
                  }
                  divClassName="form-group"
                />
              </Col>
              <Col md={6}>
                <FormDatePicker
                  dateFormat={"MM/dd/yyyy"}
                  label={"Expiration date:"}
                  rules={PLExpireDateRules}
                  name={`licenseDetails[${index}].licenseExpDate`}
                  id={`licenseDetails[${index}].licenseExpDate`}
                  errors={errors}
                  errorMsg={
                    errors["licenseDetails"]?.[index]?.["licenseExpDate"]
                      ?.message
                  }
                  control={control}
                  minDate={new Date()}
                  trigger={trigger}
                  divClassName="form-group"
                />
              </Col>
              <div className="d-grid add-remove-btn">
                {index === licFields.length - 1 && (
                  <button
                    type="button"
                    className="btn-link add-btn"
                    onClick={handleLicsenseAppend}>
                    <span>
                      <SmallPlus />
                    </span>
                    Add another license
                  </button>
                )}
                {licFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-link-secondary remove-btn"
                    onClick={() => licRemove(index)}>
                    <Close />
                    Remove
                  </button>
                )}
              </div>
            </Row>
          );
        })}
      </div>

      <hr></hr>
      <h3>Certification</h3>
      <div className="divider-form">
        {certiFields.map((certi, index) => {
          return (
            <Row key={certi.id}>
              <Col md={6}>
                <FormInput
                  name={`certificationDetails[${index}].name`}
                  id={`certificationDetails[${index}].name`}
                  type={"text"}
                  label={"Name:"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  errorMsg={
                    errors["certificationDetails"]?.[index]?.["name"]?.message
                  }
                  divClassName="form-group"
                />
              </Col>
              <Col md={6}>
                <FormSelect
                  options={certificationYear}
                  placeholder="Select"
                  control={control}
                  name={`certificationDetails[${index}].receivedYear`}
                  id={`certificationDetails[${index}].receivedYear`}
                  errorMsg={
                    errors["certificationDetails"]?.[index]?.["receivedYear"]
                      ?.message
                  }
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={{}}
                  label="Year received:"
                  trigger={trigger}
                />
              </Col>
              <Col>
                <FormInput
                  name={`certificationDetails[${index}].description`}
                  id={`certificationDetails[${index}].description`}
                  type={"textarea"}
                  label={"Additional information:"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  errorMsg={
                    errors["certificationDetails"]?.[index]?.["description"]
                      ?.message
                  }
                  divClassName="form-group cert"
                />
              </Col>
              <div className="d-grid add-remove-btn">
                {index === certiFields.length - 1 && (
                  <button
                    type="button"
                    className="btn-link add-btn"
                    onClick={() => certiAppend({})}>
                    <span>
                      <SmallPlus />
                    </span>
                    Add another certification
                  </button>
                )}
                {certiFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-link-secondary remove-btn"
                    onClick={() => certiRemove(index)}>
                    <Close />
                    Remove
                  </button>
                )}
              </div>
            </Row>
          );
        })}
      </div>

      <hr></hr>
      <h3>Specialties</h3>
      <div className="divider-form">
        {speFields.map((spe, index) => {
          return (
            <Row key={spe.id}>
              <Col md={6}>
                <FormSelect
                  options={specialties}
                  placeholder="Select"
                  control={control}
                  name={`specialityDetails[${index}].name`}
                  id={`specialityDetails[${index}].name`}
                  errorMsg={
                    errors["specialityDetails"]?.[index]?.["name"]?.message
                  }
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={{}}
                  label="Name:"
                  trigger={trigger}
                />
              </Col>
              <Col md={6}>
                <FormSelect
                  options={specialtiesYear}
                  placeholder="Select"
                  control={control}
                  name={`specialityDetails[${index}].receivedYear`}
                  id={`specialityDetails[${index}].receivedYear`}
                  errorMsg={
                    errors["specialityDetails"]?.[index]?.["receivedYear"]
                      ?.message
                  }
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={{}}
                  label="Year received:"
                  trigger={trigger}
                />
              </Col>
              <Col>
                <FormInput
                  name={`specialityDetails[${index}].description`}
                  id={`specialityDetails[${index}].description`}
                  type={"textarea"}
                  label={"Additional information:"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  errorMsg={
                    errors["specialityDetails"]?.[index]?.["description"]
                      ?.message
                  }
                  divClassName="form-group cert"
                />
              </Col>
              <div className="d-grid add-remove-btn">
                {index === speFields.length - 1 && (
                  <button
                    type="button"
                    className="btn-link add-btn"
                    onClick={() => speAppend({})}>
                    <span>
                      <SmallPlus />
                    </span>
                    Add another specialty
                  </button>
                )}
                {speFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-link-secondary remove-btn"
                    onClick={() => speRemove(index)}>
                    <Close />
                    Remove
                  </button>
                )}
              </div>
            </Row>
          );
        })}
      </div>

      <hr></hr>
      <h3>Facility Certificates</h3>
      <div className="divider-form">
        {faciltyCertificationFields.map((fc, index) => {
          return (
            <Row key={fc.id}>
              <Col>
                <FormInput
                  name={`facilityCertificates[${index}]`}
                  id={`facilityCertificates[${index}]`}
                  type={"textarea"}
                  label={"Name:"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  errorMsg={errors["facilityCertificates"]?.[index]?.message}
                  divClassName="form-group cert"
                />
              </Col>
              <div className="d-grid add-remove-btn">
                {index === faciltyCertificationFields.length - 1 && (
                  <button
                    type="button"
                    className="btn-link add-btn"
                    onClick={() => faciCertiAppend("")}>
                    <span>
                      <SmallPlus />
                    </span>
                    Add another facility certificate
                  </button>
                )}
                {faciltyCertificationFields.length > 1 && (
                  <button
                    type="button"
                    className="btn-link-secondary remove-btn"
                    onClick={() => faciCertiRemove(index)}>
                    <Close />
                    Remove
                  </button>
                )}
              </div>
            </Row>
          );
        })}
      </div>

      <FooterButtons
        // leftLabel={"Back"}
        rightLabel={"Save"}
        setCurStep={setCurStep}
        curStep={curStep}
        loader={loader}
        // onLeftClick={() => {
        //   navigate("/clinician/signup?step=1");
        //   setCurStep(curStep - 1);
        // }}
        onRightClick={async() => {
          let isStep3Valid = [
           "educationSchool",
           "graduationYear",
           "totalPracticYears",
           ...licFields.flatMap((_, index) => [
            `licenseDetails[${index}].state`,
            `licenseDetails[${index}].licenseNumber`,
            `licenseDetails[${index}].licenseExpDate`,
          ]),
          ]
          //Trigger form validation before proceeding to the next step
          trigger(isStep3Valid).then(async (isValid) => {
          
            if (isValid) {
              handleNext();
            } else if (
              watch("isCPRCertification") === "true" &&
              isValid === false
            ) {
              isStep3Valid.push("cprExpiryDate", "cprPictureUrl")
              setShowError(true);
             
            
            } else if (
              watch("isCPRCertification") === "false" &&
              isValid === false
            ) {
              setError("cprExpiryDate", null);
              setShowError(false);
             
              let errs = errors ? { ...errors } : {};
              
              delete errs?.cprExpiryDate;
              let keys = Object.keys(errs);
              if (keys.length === 0) {
                await apiCall();
              }
            }
          }).catch((error) => console.log(error));

        }}
      />
    </div>
  );
}
