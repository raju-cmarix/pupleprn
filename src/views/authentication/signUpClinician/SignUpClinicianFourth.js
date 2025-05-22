import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import FooterButtons from "../signUpFacility/FooterButtons";
import FormRadio from "component/common/FormRadio";
import UploadFile from "component/common/uploadFile";
import { ACCEPT_IMAGE_EXT, ACCEPT_IMAGE_PDF } from "constants/AppConstants";
import FormSelect from "component/common/FormSelect";
import FormDatePicker from "component/common/FormDatePicker";
import { Upload } from "assets/svg";
import { vaccination } from "./HourlyConstant";
import Delayed from "utils/Delayed";
import { MAlRules, MalExpDate } from "constants/Rules";
import { useLocation, useNavigate } from "react-router-dom";
import { msg } from "constants/messages";
import ReactGA from "react-ga4";

export default function SignUpClinicianFourth({
  register,
  errors,
  setCurStep,
  curStep,
  trigger,
  control,
  fileCallbackFn,
  deleteCallbackFn,
  otherFormData,
  formData,
  watch,
  setError,
  setValue,
  callAPI,
  loader,
  user,
  filesToRemove,
  setShowError,
  showError
}) {
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: `${PageTitle} - Step 4`,
  });
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: `${PageTitle} - Step 4`,
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  const navigate = useNavigate();
  // const [showError, setShowError] = useState(false);
  const isMalpracticeInsurance = watch("isMalpracticeInsurance");

  useEffect(() => {
    const malpracticeExp = formData.malpracticeExp;

    if (watch("isMalpracticeInsurance") === "false") {
      setValue("malpracticeExp", undefined);
      otherFormData["malpracticeUrl"] = undefined;
      otherFormData["malpracticeFee"] = 1;
    } else if (malpracticeExp) {
      const enteredDate = new Date(malpracticeExp);
      const today = new Date();
      if (enteredDate < today) {
        otherFormData["malpracticeFee"] = 1;
      } else {
        otherFormData["malpracticeFee"] = null;
      }
    } else {
      otherFormData["malpracticeFee"] = null;
    }
  }, [isMalpracticeInsurance, formData.malpracticeExp]);

  let apiCall = async () => {
    try {
      await callAPI({
        ...formData,
        signupStageCount:3
          // user?.clinicianId?.signupStageCount > 3
          //   ? user?.clinicianId?.signupStageCount
          //   : 3,
      });
      // navigate("/clinician/signup?step=4");
      // setCurStep(curStep + 1);
    } catch (error) {
      console.log(error)
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
    const isMalpracticeYes = watch("isMalpracticeInsurance") === "true";
    
    const isTBTestYes = watch("isTBTest") === "true"; 
   
  
    // Collect required fields based on conditions
    let requiredFields = [];
  
    if (isMalpracticeYes) {
      requiredFields.push("malpracticeExp", "malpracticeUrl");
    }
  
    if (isTBTestYes) {
      requiredFields.push("tbTestDate", "tbTestResult", "tbTestDocument");
    }
  
    // Run validation for all required fields
    const isValid = await trigger(requiredFields);
  
    if (isValid) {
      setShowError(false);
      await apiCall();
    } else {
      setShowError(true);
    }
    ReactGA.event({
      category: "Signup",
      action: "Clicked Next Button",
      label: "Saved Clinician Signup Form",
    });
  };

  return (
    <div className="signup-layout-fourth">
      <Delayed waitBeforeShow={0}>
        <div className="box-item mt-5">
          <p>Do you currently have malpractice insurance?</p>
          <div className="box-item-lists">
            <FormRadio
              name={"isMalpracticeInsurance"}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              register={register}
              rules={MAlRules}
              errors={errors}
              divClassName="pt-radio"
            />
          </div>
          <Row>
            <Col md={6}>
              <p className="mt-1">
                {" "}
                Sign up for malpractice insurance here:{" "}
                <a className="link-text"
                  target={"_blank"}
                  rel={"noreferrer"}
                  href="http://www.hpso.com/">
                  http://www.hpso.com/
                </a>
              </p>
            </Col>
            <Row>
              <Col md={6}>
                <FormDatePicker
                  dateFormat={"MM/dd/yyyy"}
                  label={"Expiration Date"}
                  name={"malpracticeExp"}
                  id={"malpracticeExp"}
                  minDate={new Date()}
                  errors={errors}
                  rules={watch("isMalpracticeInsurance") === "true" ? MalExpDate : ''}
                  control={control}
                  trigger={trigger}
                />
              </Col>
              <Col md={6}>
                <div className="form-group mt-4">
                  {/* <label htmlFor="State">Picture & PDF (optional):</label> */}
                  <div className="signup-upload-file">
                    <UploadFile
                      gridView={true}
                      multiple={false}
                      id="malpracticeUrl"
                      accept={ACCEPT_IMAGE_PDF}
                      folder="docs"
                      max={1}
                      isMalpracticeInsurance={watch("isMalpracticeInsurance")}
                      showErrors={showError}
                      serverFiles={
                        otherFormData["malpracticeUrl"]
                          ? [otherFormData["malpracticeUrl"]]
                          : []
                      }
                      callbackFn={fileCallbackFn}
                      deleteCallbackFn={deleteCallbackFn}
                      divClassName="mb-2"
                      errorMessage={msg.MalPractice}
                      onFileRemove={filesToRemove}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
        </div>

        <hr></hr>

        <h3>TB test (optional)</h3>
        <div className="box-item">
          <p>
            Have you had a negative TB screen in the last year? (Not required
            for most shifts)
          </p>
          <div className="box-item-lists">
            <FormRadio
              name={"isTbTest"}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              register={register}
              rules={{}}
              errors={errors}
              divClassName="pt-radio"
            />
          </div>
          <Row>
            <Col
              md={6}
              className="EXP">
              <FormDatePicker
                // minDate={new Date()}
                dateFormat={"MM/yyyy"}
                showMonthYearPicker={true}
                label={"Test Date:"}
                name={"tbTestExpiryDate"}
                id={"tbTestExpiryDate"}
                errors={errors}
                rules={{}}
                control={control}
                trigger={trigger}
              />
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="State"> PDF / image (optional):</label>
                <div className="signup-upload-file">
                  <UploadFile
                    gridView={true}
                    multiple={false}
                    id="tbTestPictureUrl"
                    accept={ACCEPT_IMAGE_PDF}
                    folder="docs"
                    max={1}
                    callbackFn={fileCallbackFn}
                    deleteCallbackFn={deleteCallbackFn}
                    onFileRemove={filesToRemove}
                    serverFiles={
                      otherFormData["tbTestPictureUrl"]
                        ? [otherFormData["tbTestPictureUrl"]]
                        : []
                    }
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <h3>COVID (optional)</h3>
        <div className="box-item">
          {/* <p>
            At Purple PRN, we have opportunities for both vaccinated and
            unvaccinated clinicians. However, several facilities require
            clinicians to be partially or fully vaccinated. To match you with
            the best positions, please let us know your current vaccination
            status. Note that you can update this status in the future.
          </p> */}
          <Row>
            <Col md={6}>
              <FormSelect
                options={vaccination}
                placeholder="Select"
                control={control}
                name={"covidStatus"}
                errors={errors}
                optionValue="value"
                optionLabel="label"
                rules={{}}
                label="Vaccination status:"
                trigger={trigger}
              />
            </Col>
            <Col md={6}>
              <div className="form-group vaccination">
                <label htmlFor="State">
                  Vaccination card PDF / image (optional):
                </label>
                <div className="signup-upload-file">
                  <UploadFile
                    gridView={false}
                    multiple={true}
                    label={"Click here to upload file"}
                    icon={<Upload />}
                    id="covidTestPictureUrl"
                    accept={[...ACCEPT_IMAGE_PDF, ...ACCEPT_IMAGE_EXT]}
                    folder="docs"
                    max={2}
                    callbackFn={fileCallbackFn}
                    deleteCallbackFn={deleteCallbackFn}
                    serverFiles={otherFormData["covidTestPictureUrl"]}
                    onFileRemove={filesToRemove}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <FooterButtons
          // leftLabel={"Back"}
          rightLabel={"Save"}
          setCurStep={setCurStep}
          curStep={curStep}
          loader={loader}
          // onLeftClick={() => {
          //   navigate("/clinician/signup?step=2");
          //   setCurStep(curStep - 1);
          // }}
          // onRightClick={() => handleNext()}
          onRightClick={() => {
            let isStep4Valid = [];
            //Trigger form validation before proceeding to the next step
            trigger(isStep4Valid).then(async (isValid) => {
              if (isValid) {
                handleNext();
              } else if (
                watch("isMalpracticeInsurance") === "true" &&
                isValid === false
              ) {
                isStep4Valid.push("malpracticeExp", "malpracticeUrl")
                setShowError(true);
              } else if (
                watch("isMalpracticeInsurance") === "false" &&
                isValid === false
              ) {
                setError("malpracticeExp", null);
                setShowError(false);
                let errs = errors ? { ...errors } : {};
                delete errs?.malpracticeExp;
                let keys = Object.keys(errs);
                if (keys.length === 0) {
                  await apiCall();
                }
              }
            });
          }}
        />
      </Delayed>
    </div>
  );
}
