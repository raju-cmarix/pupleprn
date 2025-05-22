import React from "react";
import UploadFile from "../../../component/common/uploadFile";
import { ACCEPT_IMAGE, MAX_LENGTH } from "constants/AppConstants";
import FooterButtons from "./FooterButtons";
import FormError from "component/common/FormError";
import { useNavigate } from "react-router-dom";
import FormRadio from "component/common/FormRadio";
import { invoiceMethodRules } from "constants/Rules";
import FormInput from "component/common/FormInput";
import { invoiceMethodOptions } from "../signUpClinician/HourlyConstant";

const SignUpFacilityFourth = ({
  setCurStep,
  curStep,
  loader,
  callbackFn,
  otherFormErrors,
  deleteCallbackFn,
  profileImg,
  facility,
  register,
  errors,
  filesToRemove,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="upload-main-box">
        <div className="upload-box-item profile-picture">
          <h3>Profile picture (required)</h3>
          <p>
            Select a high quality primary profile image to represent your
            facility
          </p>
          <div className="upload-img profile">
            <UploadFile
              serverFiles={profileImg ? [profileImg] : []}
              multiple={false}
              id="profile"
              accept={ACCEPT_IMAGE}
              folder="images"
              max={1}
              callbackFn={callbackFn}
              deleteCallbackFn={deleteCallbackFn}
              onFileRemove={filesToRemove}
            />
          </div>
          <FormError msg={otherFormErrors["profileUrl"]} />
        </div>
        <div className="upload-box-item facility-photos">
          <h3>Additional Facility Photos (optional)</h3>
          <div className="upload-img">
            <UploadFile
              serverFiles={facility}
              multiple={true}
              max={5}
              id="facility"
              accept={ACCEPT_IMAGE}
              folder="images"
              callbackFn={callbackFn}
              deleteCallbackFn={deleteCallbackFn}
              onFileRemove={filesToRemove}
              s
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="w-100 mt-3">
          <h3 className="mt-2">How would you like to pay invoices:</h3>
          <div className="">
            <FormRadio
              name={"invoiceMethod"}
              options={invoiceMethodOptions}
              register={register}
              rules={invoiceMethodRules}
              errors={errors}
              divClassName="pt-radio im-radio"
            />
          </div>
          <p
            className="mb-0"
            style={{ marginBottom: 0 }}>
            We invoice weekly unless otherwise agreed
          </p>
          <p className="mb-0">
            *May incur a small processing fee, please see facility agreement
          </p>
        </div>
        <hr className="my-3" />
        <div className="signup-third-btm-textarea">
          <h3>Additional emails to copy on invoices (optional):</h3>

          <FormInput
            name="emailsForInvoice[0]"
            id="emailsForInvoice0"
            divClassName={"signup-input situation"}
            register={register}
            errors={errors}
            rules={{}}
            maxLength={MAX_LENGTH}
            errorMsg={errors?.emailsForInvoice?.[0]?.message || ""}
          />
          <FormInput
            name="emailsForInvoice[1]"
            id="emailsForInvoice1"
            divClassName={"signup-input situation"}
            register={register}
            errors={errors}
            rules={{}}
            maxLength={MAX_LENGTH}
            errorMsg={errors?.emailsForInvoice?.[1]?.message || ""}
          />
          <FormInput
            name="emailsForInvoice[2]"
            id="emailsForInvoice2"
            divClassName={"signup-input situation"}
            register={register}
            errors={errors}
            rules={{}}
            maxLength={MAX_LENGTH}
            errorMsg={errors?.emailsForInvoice?.[2]?.message || ""}
          />
        </div>
      </div>
      <FooterButtons
        rightType="submit"
        leftLabel={"Back"}
        rightLabel={"Save"}
        setCurStep={setCurStep}
        curStep={curStep}
        onRightClick={() => {}}
        loader={loader}
        callbackFn={callbackFn}
        onLeftClick={() => {
          navigate("/facility/signup?step=2");
          setCurStep(curStep - 1);
        }}
      />
    </>
  );
};

export default SignUpFacilityFourth;
