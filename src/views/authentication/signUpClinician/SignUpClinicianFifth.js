import { Upload } from "assets/svg";
import FormCheckbox from "component/common/FormCheckbox";
import FormError from "component/common/FormError";
import FormInput from "component/common/FormInput";
import FormSelect from "component/common/FormSelect";
import { ACCEPT_DOC, ACCEPT_IMAGE, ACCEPT_PDF } from "constants/AppConstants";
import { AboutMeRules, TypeOfFacilityRules, TypeOfFacilityRulesForClinician } from "constants/Rules";
import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Delayed from "utils/Delayed";
import UploadFile from "../../../component/common/uploadFile";
import FooterButtons from "../signUpFacility/FooterButtons";
import ReactGA from "react-ga4";
import { clinicianFacilityTypeOptions, timeOptions, travelMile, weekDays } from "./HourlyConstant";
import FormCheckboxOther from "component/common/FormCheckboxOther";
export default function SignUpClinicianFifth({
  register,
  errors,
  setCurStep,
  curStep,
  loader,
  control,
  fileCallbackFn,
  otherFormErrors,
  trigger,
  deleteCallbackFn,
  otherFormData,
  resetField,
  getValues,
  validate,
  onSubmit,
  onFileRemove,
}) {
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: `${PageTitle} - Step 5`,
  });
  window.dataLayer.push({
    event: 'pageview',
    page: {
      title: `${PageTitle} - Step 5`,
      url: window.location.href,
      path: window.location.pathname,
    }
  });
  const navigate = useNavigate();
  const [arr, setArr] = useState([]); // used to disable / enable facility select field
  const [arr1, setArr1] = useState([]); // used to disable / enable patient select field
  const { fields: fEFields } = useFieldArray({
    control,
    name: "facilityExperience",
  });
  const { fields: pEFields } = useFieldArray({
    control,
    name: "patientExperience",
  });

  useEffect(() => {
    if (fEFields) {
      setArr(fEFields);
    }
    if (pEFields) {
      setArr1(pEFields);
    }
  }, []);

  return (
    <>
      <Delayed waitBeforeShow={0}>
        <Row className="hourly mt-5">
          {/* <Col lg={6}>
            <FormSelect
              options={HourlyConstants}
              placeholder="Select"
              control={control}
              name={'minimumHourlyRate'}
              errors={errors}
              optionValue="value"
              optionLabel="label"
              rules={{}}
              label="Minimum hourly rate:"
              className="space"
              trigger={trigger}
            />
          </Col> */}
          <Col lg={6}>
            <div className="form-group license">
              <label htmlFor="State">Drivers License (required): </label>
              <div className="drivers  d-flex">
                <UploadFile
                  serverFiles={otherFormData["drivingLicensePhotoUrl"]}
                  gridView={false}
                  multiple={true}
                  label={"Click here to upload file"}
                  icon={<Upload />}
                  id="drivingLicensePhotoUrl"
                  accept={[ACCEPT_IMAGE, ...ACCEPT_PDF, ...ACCEPT_DOC]}
                  folder="images"
                  max={2}
                  callbackFn={fileCallbackFn}
                  deleteCallbackFn={deleteCallbackFn}
                  onFileRemove={onFileRemove}
                  errors={errors}
                />
              </div>
              <FormError msg={otherFormErrors?.["drivingLicensePhotoUrl"]} />
            </div>
          </Col>

          <Col lg={6}>
            <div className="form-group">
              <label htmlFor="State">Resume (required):</label>
              <UploadFile
                gridView={true}
                multiple={false}
                id="resumeUrl"
                accept={[...ACCEPT_PDF, ...ACCEPT_DOC]}
                folder="images"
                max={1}
                callbackFn={fileCallbackFn}
                deleteCallbackFn={deleteCallbackFn}
                errors={otherFormErrors}
                onFileRemove={onFileRemove}
                serverFiles={
                  otherFormData["resumeUrl"] ? [otherFormData["resumeUrl"]] : []
                }
              />
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col lg={6}>
            <FormSelect
              options={travelMile}
              placeholder="Select"
              control={control}
              name={"maximumShiftsDistance"}
              errors={errors}
              optionValue="value"
              optionLabel="label"
              rules={{}}
              label="How far are you willing to travel for shifts?"
              trigger={trigger}
            />
          </Col>
        </Row> */}
        <hr></hr>
        <Row className="facility">
          <Col md={6}>
            <h3>Facility Experience (years)</h3>

            <div className="days-available space">
              {fEFields.map((day, index) => {
                return (
                  <div
                    className="days"
                    key={day.id}>
                    <FormCheckbox
                      changeCallback={() => {
                        let v = getValues("facilityExperience");
                        let temp = [...arr];
                        temp[index] = v[index];
                        setArr([...temp]);
                        resetField(`facilityExperience[${index}].startTime`);
                      }}
                      control={control}
                      divClassName="weekdays"
                      className=""
                      name={`facilityExperience[${index}].isAvailable`}
                      id={`facilityExperience[${index}].isAvailable`}
                      options={[{ label: day.day }]}
                      register={register}
                      rules={{
                        validate: {
                          atLeastOneChecked: () => {
                            return arr.some((fe) => fe.isAvailable);
                          },
                        },
                      }}
                      errors={errors}
                    />

                    <div className="weektiming">
                      <FormSelect
                        isDisabled={!arr[index]?.isAvailable}
                        divClassName={"weekfrom"}
                        options={timeOptions}
                        placeholder="Select"
                        control={control}
                        name={`facilityExperience[${index}].startTime`}
                        id={`facilityExperience[${index}].startTime`}
                        errors={errors}
                        optionValue="value"
                        optionLabel="label"
                        rules={{}}
                        trigger={trigger}
                      />
                    </div>
                  </div>
                );
              })}
              <FormError msg={otherFormErrors?.["facilityExperience"]} />
            </div>
          </Col>
          <Col md={6}>
            <h3>Patient Experience (years)</h3>
            <div className="days-available">
              {pEFields.map((day, index) => {
                return (
                  <div
                    className="days"
                    key={day.id}>
                    <FormCheckbox
                      changeCallback={() => {
                        let v = getValues("patientExperience");
                        let temp = [...arr1];
                        temp[index] = v[index];
                        setArr1([...temp]);
                        resetField(`patientExperience[${index}].startTime`);
                      }}
                      divClassName="weekdays"
                      className=""
                      control={control}
                      name={`patientExperience[${index}].isAvailable`}
                      id={`patientExperience[${index}].isAvailable`}
                      options={[{ label: day.day }]}
                      register={register}
                      rules={{
                        validate: {
                          atLeastOneChecked: () => {
                            return arr1.some((pe) => pe.isAvailable);
                          },
                        },
                      }}
                      errors={errors}
                    />

                    <div className="weektiming">
                      <FormSelect
                        isDisabled={!arr1[index]?.isAvailable}
                        divClassName={"weekfrom"}
                        options={timeOptions}
                        placeholder="Select"
                        control={control}
                        name={`patientExperience[${index}].startTime`}
                        id={`patientExperience[${index}].startTime`}
                        errors={errors}
                        optionValue="value"
                        optionLabel="label"
                        rules={{}}
                        trigger={trigger}
                      />
                    </div>
                  </div>
                );
              })}
              <FormError msg={otherFormErrors?.["patientExperience"]} />
            </div>
          </Col>
          <Col md={6}>
            <h5>Available Days</h5>
            <div className="days-available">
              {weekDays.map((day, index) => (
                <div
                  className="days"
                  key={day.id}>
                  <FormCheckbox
                    name={`availableWeekDays[${day.value}]`}
                    control={control}
                    register={register}
                    options={[{ label: day.label }]}
                    divClassName="weekdays"
                    rules={{}}
                    errors={errors}
                  />
                </div>
              ))}
              <FormError msg={otherFormErrors?.["availableWeekDays"]} />
           
            </div>
          </Col>
           <Col md={6}>
       
          <div className="facility-type">
            <h5 style={{paddingTop:'5px', paddingBottom:'10px'}}>Facilities I'm Interested In:</h5>
            <div className="type">
              <FormCheckboxOther
                control={control}
                options={clinicianFacilityTypeOptions}
                register={register}
                errors={errors}
                rules={TypeOfFacilityRulesForClinician}
                name="facilityType"
               divClassName="types"
              />
            </div>
            {/* <FormInput
              disabled={!facilityType.includes("Other")}
              divClassName="textarea"
              name={"facilityTypeOther"}
              id={"facilityTypeOther"}
              type={"textarea"}
              label={""}
              register={register}
              rules={facilityType.includes("Other") ? CommentRules : {}}
              errors={errors}
              maxLength={MAX_LENGTH}
            /> */}
          
        </div>
          </Col>
        </Row>
        <hr></hr>
        <div className="form-group aboutme">
          <FormInput
            inputDivClassName={"signup-textarea"}
            name="aboutMe"
            id={"aboutMe"}
            type={"textarea"}
            maxLength={1500}
            register={register}
            rules={AboutMeRules}
            errors={errors}
            label={"About me:"}
          />
        </div>
        <hr></hr>

        <div className="picture-upload">
          <p>Profile picture:</p>
          <span>
            Select a high quality primary profile image to<br></br> represent
            yourself
          </span>
          <div className="upload-img mt-3">
            <UploadFile
              serverFiles={
                otherFormData["profileUrl"] ? [otherFormData["profileUrl"]] : []
              }
              multiple={false}
              id="profileUrl"
              accept={ACCEPT_IMAGE}
              folder="images"
              max={1}
              callbackFn={fileCallbackFn}
              deleteCallbackFn={deleteCallbackFn}
              errors={errors}
              onFileRemove={onFileRemove}
            />
          </div>
          <FormError msg={otherFormErrors?.["profileUrl"]} />
        </div>

        <FooterButtons
          onRightClick={() => validate()}
          // leftLabel={"Back"}
          rightLabel={"Save"}
          setCurStep={setCurStep}
          curStep={curStep}
          rightType={true}
          loader={loader}
          onSubmit={onSubmit}
          // onLeftClick={() => {
          //   navigate("/clinician/signup?step=3");
          //   setCurStep(curStep - 1);
          // }}
        />
      </Delayed>
    </>
  );
}
