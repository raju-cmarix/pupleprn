import FormCheckbox from "component/common/FormCheckbox";
import FormCheckboxOther from "component/common/FormCheckboxOther";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import { MAX_LENGTH } from "constants/AppConstants";
import {
  CommentRules,
  DressCodeRules,
  NumberOfCliniciansRules,
  TypeOfFacilityRules,
  EmrRules,
  PatientSeenPerHourRules,
  IsTrainingVideosForClinicianRules,
  IsTestCompletedForClinicianRules,
  AboutFacilityRules,
  TypeOfPatientsRules,
  CPRRequirementRules,
  isCPRRequiredRules,
  checkInPlaceForFirstDayRules,
} from "constants/Rules";
import React, { useEffect } from "react";
import Delayed from "utils/Delayed";
import {
  boolList,
  dressCodeOptions,
  emrListOptions,
  facilityTypeOptions,
  patientTypeOptions,
} from "../signUpClinician/HourlyConstant";
import FooterButtons from "./FooterButtons";
import { useNavigate } from "react-router-dom";

const SignUpFacilityThird = ({
  setCurStep,
  curStep,
  register,
  errors,
  watch,
  resetField,
  trigger,
  unregister,
  control,
  formData,
  callAPI,
  loader,
  user,
  setValue
}) => {
  const navigate = useNavigate();
  // watch checkbox fields
  const facilityType = watch("facilityType");
  const patientsType = watch("patientsType");
  const dressCode = watch("dressCode");
  const isCPRRequired = watch("isCPRRequired");
  const dressCodeOther = watch("dressCodeOther");

  // if checkbox value is not "Other" reset & unregister other text-box
  useEffect(() => {
    if (!facilityType.includes("Other")) {
      resetField("facilityTypeOther");
      unregister("facilityTypeOther");
    }
    if (!patientsType.includes("Other")) {
      resetField("patientsTypeOther");
      unregister("patientsTypeOther");
    }

    
  }, [facilityType, patientsType, dressCode]);

  useEffect(() => {

    if (isCPRRequired === 'false') {
      resetField("CPRRequirement");
      unregister("CPRRequirement");
    }

  }, [isCPRRequired])

  // handle next button if no errors go to next step
  const handleNext = async () => {
    if (await trigger()) {
      try {
        await callAPI({
          ...formData,
          signupStageCount: user?.facilityId?.signupStageCount > 2 ? user?.facilityId?.signupStageCount : 2
        })
        navigate("/facility/signup?step=3");
        setCurStep(curStep + 1)
      } catch (error) {

      }
    }
  };

  return (
    <>
      <Delayed waitBeforeShow={0}>
        <div className="form-group facility-details">
          <h3>Facility details</h3>
          <p>Number of clinicians currently at this facility:</p>
          <FormInput
            divClassName="signup-input facility-input pl-input"
            type="text"
            id="numberOfClinicians"
            name="numberOfClinicians"
            register={register}
            rules={NumberOfCliniciansRules}
            errors={errors}
            placeholder={"Ex: 5 PTs, 3 PTAs, 1 OT and 2 techs"}
          />
        </div>
        <hr></hr>

        <div className="signup-main-box">
          <div className="left-box box-item">
            <p>Type of facility:</p>
            <div className="box-item-lists facility-lists">
              <FormCheckboxOther
                control={control}
                options={facilityTypeOptions}
                register={register}
                errors={errors}
                rules={TypeOfFacilityRules}
                name="facilityType"
                divClassName="signup-checkbox"
              />
            </div>
            <FormInput
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
            />
          </div>

          <div className="right-box box-item">
            <p>Type(s) of patients:</p>
            <div className="box-item-lists patients">
              <FormCheckboxOther
                control={control}
                options={patientTypeOptions}
                register={register}
                errors={errors}
                name="patientsType"
                divClassName="signup-checkbox"
                rules={TypeOfPatientsRules}
              />
            </div>
            <FormInput
              disabled={!patientsType.includes("Other")}
              divClassName="textarea"
              name={"patientsTypeOther"}
              id={"patientsTypeOther"}
              type={"textarea"}
              label={""}
              register={register}
              rules={patientsType.includes("Other") ? CommentRules : {}}
              errors={errors}
              maxLength={MAX_LENGTH}
            />
          </div>
        </div>
        <hr></hr>
        <div className="signup-main-box dress-code">
          <div className="left-box box-item">
            <p>Dress code:</p>
            <div className="box-item-lists">
              <FormCheckboxOther
                control={control}
                options={dressCodeOptions}
                register={register}
                errors={errors}
                name="dressCode"
                rules={DressCodeRules}
                divClassName="signup-checkbox"
                onChangeFor={(label) => {
                  let text = dressCodeOther;
                  unregister("dressCodeOther");
                  register("dressCodeOther");
                  setValue("dressCodeOther", text)
                }}
              />
            </div>

            <FormInput
              divClassName="textarea mb-3 pl-input"
              name={"dressCodeOther"}
              id={"dressCodeOther"}
              type={"textarea"}
              label={""}
              register={register}
              rules={dressCode.includes("Other") ? CommentRules : {}}
              errors={errors}
              maxLength={MAX_LENGTH}
              placeholder={"Anything specific about the dress code?"}
            />
            <hr />
            <FormInput
              divClassName="signup-input-psph mt-2 pl-input h-100"
              name={"patientsSeenPerHour"}
              id={"patientsSeenPerHour"}
              type={"textarea"}
              label={"Number of patients seen per hour:"}
              register={register}
              rules={PatientSeenPerHourRules}
              errors={errors}
              placeholder={"Example: 1 per hour. 1-2 per hour. 2 per hour with tech assistance. 45 minute treatment sessions."}
            />
          </div>

          <div className="right-box box-item justify-content-start">
            <p>What EMR do you use?</p>
            {/* <div className="box-item-lists last">
              <FormCheckboxOther
                control={control}
                options={emrListOptions}
                register={register}
                errors={errors}
                name="emrList"
                rules={EmrRules}
                divClassName="signup-checkbox"
              />
            </div> */}
            <FormInput
              divClassName="textarea mb-3"
              name={"emrList"}
              id={"emrList"}
              type={"textarea"}
              register={register}
              rules={EmrRules}
              errors={errors}
              maxLength={MAX_LENGTH}
            />
            <hr />
            <p className="mt-2">
              Is CPR required?
            </p>
            <div className="cpr-radio">
              <FormRadio
                name={"isCPRRequired"}
                options={boolList}
                register={register}
                rules={isCPRRequiredRules}
                errors={errors}
                divClassName="pt-radio"
              />
            </div>
            <FormInput
              divClassName="signup-input-psph mt-2 pl-input"
              name={"CPRRequirement"}
              id={"CPRRequirement"}
              type={"text"}
              register={register}
              rules={{}}
              errors={errors}
              label={'If yes, list any specific requirements (BLS, AHA-certified, etc)'}
            />
          </div>
        </div>
        <hr></hr>

        {/* <div className="signup-main-box emr">
          <div className="left-box box-item">
            <FormInput
              divClassName="signup-input"
              name={"patientsSeenPerHour"}
              id={"patientsSeenPerHour"}
              type={"text"}
              label={"Number of patients seen per hour"}
              register={register}
              rules={PatientSeenPerHourRules}
              errors={errors}
              placeholder={"Example: 1 per hour. 1-2 per hour. 2 per hour with tech assistance. 45 minute treatment sessions."}
            />
          </div>
        </div> */}
        <hr></hr>
        {/* <div className="signup-main-box begins">
          <p>
            Are there tests to be completed for clinician before shift begins?
          </p>
          <div className="box-item">
            <FormRadio
              name={"isTestCompletedForClinician"}
              options={boolList}
              register={register}
              rules={IsTestCompletedForClinicianRules}
              errors={errors}
              divClassName="pt-radio"
            />
          </div>
        </div>
        <hr></hr> */}
        <div className="signup-third-btm-textarea">
          <p>Where do clinicians check in on their first day:</p>

          <FormInput
            name="checkInPlaceForFirstDay"
            id="checkInPlaceForFirstDay"
            divClassName={"signup-input situation pl-input"}
            register={register}
            errors={errors}
            rules={checkInPlaceForFirstDayRules}
            maxLength={MAX_LENGTH}
            placeholder={"Example: 2nd Floor receptionist, first floor front office manager, etc"}
          />
        </div>

        <div className="signup-third-btm-textarea">
          <p>What is the parking situation? (Please be specific. Include location of specific lot, surface vs garage)</p>

          <FormInput
            name="parkingSituation"
            id="parkingSituation"
            divClassName={"signup-input situation"}
            register={register}
            errors={errors}
            maxLength={MAX_LENGTH}
          />
        </div>

        <div className="signup-third-btm-textarea">
          <FooterButtons
            leftLabel={"Back"}
            rightLabel={"Save & Next"}
            setCurStep={setCurStep}
            curStep={curStep}
            onRightClick={() => handleNext()}
            loader={loader}
            onLeftClick={() => {
              navigate("/facility/signup?step=1");
              setCurStep(curStep - 1);
            }}
          />
        </div>
      </Delayed>
    </>
  );
};

export default SignUpFacilityThird;
