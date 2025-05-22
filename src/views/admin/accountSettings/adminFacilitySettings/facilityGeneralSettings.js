import { api } from "api/Api";
import { Close, Pencil } from "assets/svg";
import FormButton from "component/common/FormButton";
import FormCheckboxOther from "component/common/FormCheckboxOther";
import FormCleave from "component/common/FormCleave";
import FormError from "component/common/FormError";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import FormSelect from "component/common/FormSelect";
import PlacesInput from "component/common/PlacesInput";
import UploadFile from "component/common/uploadFile";
import EditEmailModal from "component/modals/EditEmailModal";
import ResetFacilityPasswordModal from "component/modals/ResetFacilityPasswordModal";
import {
  DELETE_FILE_URL,
  RESET_FACILITY_PASSWORD_URL,
  UPDATE_FACILITY_URL,
} from "constants/ApiUrls";
import {
  ACCEPT_IMAGE,
  MAX_LENGTH,
  REFERENCEBY,
  RESPONSE_CREATED,
  RESPONSE_OK,
} from "constants/AppConstants";
import {
  AboutFacilityRules,
  checkInPlaceForFirstDayRules,
  CityRules,
  CommentRules,
  DressCodeRules,
  EmrRules,
  FirstNameRules,
  invoiceMethodRules,
  isCPRRequiredRules,
  LastNameRules,
  NameRules,
  NumberOfCliniciansRules,
  OfficeNameRules,
  OfficeNickNameRules,
  PatientSeenPerHourRules,
  phoneRules,
  phoneRulesOptional,
  RolesRules,
  StateRules,
  TypeOfFacilityRules,
  TypeOfPatientsRules,
  ZipCodeRules,
} from "constants/Rules";
import { isEmpty, omit, pick } from "radash";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Col, Form, Input, Row } from "reactstrap";
import { findAndReplace, getOtherDataFromList, removeOther } from "utils/Utils";
import {
  boolList,
  dressCodeOptions,
  facilityExp,
  facilityTypeOptions,
  patientExp,
  patientTypeOptions,
  state,
} from "../../../authentication/signUpClinician/HourlyConstant";
import UserContext from "utils/context/UserContext";

export default function AdminFacilityGeneralInformation({
  user,
  getFacilityData,
  resetPasswordModal,
  setResetPasswordModal,
  loader,
  setLoader,
}) {
  const {
    register,
    trigger,
    control,
    reset,
    watch,
    unregister,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      facilityExperience: facilityExp,
      patientExperience: patientExp,
      dressCode: [],
      facilityType: [],
      patientsType: [],
      officeAddressZipCode: "",
      emailsForInvoice: [],
    },
  });
  const  subadmin  = useContext(UserContext);
  const isSubadmin = subadmin?.user?.roles === 'subadmin';

  const facilityType = watch("facilityType");
  const patientsType = watch("patientsType");
  const dressCode = watch("dressCode");
  const isCPRRequired = watch("isCPRRequired");
  const dressCodeOther = watch("dressCodeOther");
  const [initData, setInitData] = useState({}); // set initial form data
  const [otherFormData, setOtherFormData] = useState({});
  const [otherFormErrors, setOtherFormErrors] = useState({});
  const [editEmailModal, setEditEmailModal] = useState(false);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const handleFileRemove = (fileUrl) => {
    setFilesToRemove((prevFiles) => [...prevFiles, fileUrl]);
  };
  const [primaryAddress] = getValues(["addresses[0]"]);

  const {
    fields: locaFields,
    append: locaAppend,
    remove: locaRemove,
  } = useFieldArray({
    control,
    name: "addresses",
  });

  useEffect(() => {
    if (!facilityType.includes("Other")) {
      setValue("facilityTypeOther", "");
      unregister("facilityTypeOther");
    }
    if (!patientsType.includes("Other")) {
      setValue("patientsTypeOther", "");
      unregister("patientsTypeOther");
    }
  }, [facilityType, patientsType]);

  useEffect(() => {
    if (isCPRRequired === "false") {
      setValue("CPRRequirement", "");
      unregister("CPRRequirement");
    }
  }, [isCPRRequired]);

  useEffect(() => {
    if (!isEmpty(user)) setDataToForm();
  }, [user]);

  // get data from user context and set data to form
  const setDataToForm = () => {
    // merge user data and facility data
    let data = {
      dressCode: [],
      facilityType: [],
      patientsType: [],
      ...user?.facilityId,
      ...user,
    };

    // convert server data to form data
    data.isTrainingVideosForClinician = data.isTrainingVideosForClinician
      ? "true"
      : "false";
    data.isTestCompletedForClinician = data.isTestCompletedForClinician
      ? "true"
      : "false";
    data.isCPRRequired = data.isCPRRequired ? "true" : "false";
    // extract other patient data from server data
    data.patientsTypeOther = getOtherDataFromList(
      patientTypeOptions,
      data.patientsType,
    );
    if (data.patientsTypeOther) {
      data.patientsType.push("Other");
      data.patientsType = data.patientsType.filter(
        (type) => type !== data.patientsTypeOther,
      );
    }

    // extract other facility data from server data
    data.facilityTypeOther = getOtherDataFromList(
      facilityTypeOptions,
      data.facilityType,
    );

    if (data.facilityTypeOther) {
      data.facilityType.push("Other");
      data.facilityType = data.facilityType.filter(
        (type) => type !== data.facilityTypeOther,
      );
    }

    // extract other dress code data from server data
    data.dressCodeOther = getOtherDataFromList(
      dressCodeOptions,
      data.dressCode,
    );
    if (data.dressCodeOther) {
      data.dressCode = data.dressCode.filter(
        (type) => type !== data.dressCodeOther,
      );
    }

    // // extract other emr data from server data
    // data.emrListOther = getOtherDataFromList(emrListOptions, data.emrList);
    // if (data.emrListOther) {
    //   data.emrList.push("Other");
    //   data.emrList = data.emrList.filter((type) => type !== data.emrListOther);
    // }

    reset({ ...data });
    setInitData({ ...data });

    setOtherFormData({
      picUrl: data.addresses[0]?.picUrl,
      facilityPicUrl: data?.facilityPicUrl,
    });
  };

  const fileCallbackFn = (res, id, multiple) => {
    setOtherFormData({
      ...otherFormData,
      [id]: multiple ? [...otherFormData[id], ...res] : res[0],
    });
  };

  const handleSave = async (keys, loaderValue) => {
    let reqData = {};
    let result = await trigger(keys);
    if (result) {
      let values = {
        ...getValues(),
        ...otherFormData,
      };
      values.addresses[0].picUrl = otherFormData?.picUrl;
      if (loaderValue === 1) {
        if (!otherFormData.picUrl) {
          setOtherFormErrors({ picUrl: "Please add profile picture" });
          return;
        } else setOtherFormErrors({ picUrl: "" });
        keys = [...keys, "addresses"];
      }

      if (loaderValue === 5) {
        values.facilityType = findAndReplace(
          values.facilityType,
          "Other",
          values?.facilityTypeOther,
        );
        values.patientsType = findAndReplace(
          values.patientsType,
          "Other",
          values?.patientsTypeOther,
        );
        // values.dressCode = findAndReplace(
        //   values.dressCode,
        //   "Other",
        //   values.dressCodeOther
        // );
        values.dressCode = [
          ...(values?.dressCode || []),
          values.dressCodeOther,
        ].filter((a) => a);
        // values.emrList = findAndReplace(
        //   values.emrList,
        //   "Other",
        //   values.emrListOther
        // );
        values.isCPRRequired = values.isCPRRequired === "true";
        values = omit(values, [
          "referenceByOther",
          "facilityTypeOther",
          "patientsTypeOther",
          "dressCodeOther",
          "emrListOther",
        ]);
      }

      if (loaderValue === 6) {
        values.emailsForInvoice =
          values?.emailsForInvoice?.filter((s) => s) || [];
      }
      reqData = pick(values, keys);
      onSave(reqData, loaderValue);
    }
  };

  const onSave = (reqData, loaderValue) => {
    let tempInitData = {
      ...initData,
      dressCode: removeOther(user?.dressCode),
      // emrList: removeOther(user?.emrList),
      facilityType: removeOther(user?.facilityType),
      patientsType: removeOther(user?.patientsType),
    };

    setLoader(loaderValue);
    let data = {
      ...tempInitData,
      ...reqData,
      id: initData?.id,
      userId: initData?.userId?.id,
    };
    const tempValues = getValues();

    api(UPDATE_FACILITY_URL, data).then((res) => {
      if (res.status === RESPONSE_OK) {
        // Set address
        if (res?.data.data?.addresses?.length) {
          setValue("addresses", res?.data.data?.addresses);
        }
        setInitData({ ...tempValues, ...reqData });
        // Call remove-file API for all files in filesToRemove state after successful save
        filesToRemove.forEach((fileUrl) => {
          api(DELETE_FILE_URL, { url: [fileUrl] }).then((res) => {
            if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
              console.log(`File ${fileUrl} removed successfully`);
            } else {
              console.error(`Error removing file ${fileUrl}`);
            }
          });
        });
        setFilesToRemove([]);
      }
      setLoader(false);
    });
  };

  const handleReset = (userId) => {
    api(RESET_FACILITY_PASSWORD_URL, null, (userId = initData.userId.id)).then(
      (res) => {
        if (res.status === RESPONSE_OK) {
        }
        setLoader(false);
      },
    );
  };

  const primaryFields = [
    "primaryFirstName",
    "primaryLastName",
    "primaryEmail",
    "primaryPhone",
    "primaryRole",
  ];
  const invoiceFields = ["invoiceMethod", "emailsForInvoice"];
  const clientDetails = [
    "numberOfClinicians",
    "facilityType",
    "facilityTypeOther",
    "patientsType",
    "patientsTypeOther",
    "dressCode",
    "dressCodeOther",
    "emrList",
    "patientsSeenPerHour",
    "isTrainingVideosForClinician",
    "isTestCompletedForClinician",
    "parkingSituation",
    "checkInPlaceForFirstDay",
    "isCPRRequired",
    "CPRRequirement",
  ];
  return (
    <div className="general-content">
      <Form>
        <fieldset>
          <div className="first-block">
            <div className="general-photo-main">
              <div className="picture-block">
                <h5>Profile picture (required)</h5>
                <p>
                  Select a high quality primary profile image to represent
                  yourself
                </p>
                <div className="uploaded-pic clinician">
                  <UploadFile
                  disabled={isSubadmin}
                  hideRemoveBtn={isSubadmin}
                    serverFiles={
                      otherFormData.picUrl ? [otherFormData.picUrl] : []
                    }
                    multiple={false}
                    id="picUrl"
                    accept={ACCEPT_IMAGE}
                    folder="images"
                    max={1}
                    callbackFn={fileCallbackFn}
                    deleteCallbackFn={(respData, id) =>
                      setOtherFormData({ ...otherFormData, [id]: respData })
                    }
                    onFileRemove={handleFileRemove}
                  />
                </div>
                <FormError msg={otherFormErrors?.picUrl} />
              </div>
              <div className="picture-block">
                <h5>Additional Facility Photos (optional)</h5>
                <div className="uploaded-pic">
                  <UploadFile
                    disabled={isSubadmin}
                    hideRemoveBtn={isSubadmin}
                    multiple={true}
                    serverFiles={otherFormData.facilityPicUrl}
                    max={5}
                    id="facilityPicUrl"
                    accept={ACCEPT_IMAGE}
                    folder="images"
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={(respData, id) =>
                      setOtherFormData({ ...otherFormData, [id]: respData })
                    }
                  />{" "}
                </div>
              </div>
            </div>
            <div className="office-block office">
              <h5>Facility name</h5>
              {/* <p>
                This will be displayed to our users, so please include the full
                name. If you have multiple locations, indicate which one it is
                within the name, e.g. Pinnacle Physical Therapy - Riverdale
              </p> */}
            </div>
            <FormInput
              disabled={isSubadmin}
              name="officeName"
              id="officeName"
              type="text"
              register={register}
              rules={OfficeNameRules}
              errors={errors}
              divClassName="signup-input office-name "
            />
            <div className="text-center mt-4">
              {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 1}
                onClick={() =>
                  handleSave(["officeName", "picUrl", "facilityPicUrl"], 1)
                }
              />)}
            </div>
          </div>
          <div className="primary-contact">
            <h5>Email</h5>
            <p className="email-block">
              <b className="email">
                {initData?.userId?.email}
                {!isSubadmin && (<span
                  style={{ cursor: "pointer", marginLeft: "3px" }}
                  className="pencilicon"
                  onClick={() => setEditEmailModal(!editEmailModal)}>
                  <Pencil />
                </span>)}
                <br />
                {!isSubadmin && (<FormButton
                  className="pt-btn btn-primary reset"
                  type={"button"}
                  label={"Reset Password"}
                  onClick={() => {
                    setResetPasswordModal(!resetPasswordModal);
                    // handleReset();
                  }}
                />)}
              </b>
            </p>
          </div>
          <div className="primary-contact">
            <h5>{REFERENCEBY}</h5>
            <p>
              <b>{initData?.referenceFrom}</b>
            </p>
          </div>
          <div className="primary-contact">
            <h5>Primary contact</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  name={"primaryFirstName"}
                  id={"primaryFirstName"}
                  type={"text"}
                  label={"First Name:"}
                  register={register}
                  rules={FirstNameRules}
                  errors={errors}
                  divClassName="form-group pr-12"
                />
              </Col>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  name={"primaryLastName"}
                  id={"primaryLastName"}
                  type={"text"}
                  label={"Last Name:"}
                  register={register}
                  rules={LastNameRules}
                  errors={errors}
                  divClassName="form-group pl-12"
                />
              </Col>
              <Col md={6}>
                <FormCleave
                  disabled={isSubadmin}
                  trigger={trigger}
                  name={"primaryPhone"}
                  id={"primaryPhone"}
                  type={"number"}
                  label={"Phone number:"}
                  control={control}
                  rules={phoneRules}
                  errors={errors}
                  divClassName="form-group pr-12"
                />
              </Col>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  name={"primaryRole"}
                  id={"primaryRole"}
                  type={"text"}
                  label={"Role:"}
                  register={register}
                  rules={RolesRules}
                  errors={errors}
                  divClassName="form-group pl-12"
                />
              </Col>
            </Row>
            <div className="text-center">
             {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 2}
                onClick={() => handleSave(primaryFields, 2)}
              />)}
            </div>
          </div>

          <div className="primary-contact">
            <h5>After hours contact</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  name={"afterHoursName"}
                  id={"afterHoursName"}
                  type={"text"}
                  label={"Name:"}
                  register={register}
                  rules={NameRules}
                  errors={errors}
                  divClassName="form-group pr-12"
                />
              </Col>
              <Col md={6}>
                <FormCleave
                  disabled={isSubadmin}
                  trigger={trigger}
                  name={"afterHoursPhone"}
                  id={"afterHoursPhone"}
                  type={"number"}
                  label={"Phone number:"}
                  control={control}
                  rules={phoneRules}
                  errors={errors}
                  divClassName="form-group pl-12"
                />
              </Col>
              <span className="sub-text-setting">
                Someone who can respond during non-business hours about
                emergencies or shift issues
              </span>
            </Row>
            <div className="text-center mt-4">
            {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 3}
                onClick={() =>
                  handleSave(["afterHoursName", "afterHoursPhone"], 3)
                }
              />)}
            </div>
          </div>
          <div className="primary-contact">
            <h5>Office Admin or Receptionist</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  name={"frontOfficePersonName"}
                  id={"frontOfficePersonName"}
                  type={"text"}
                  label={"Name:"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  divClassName="form-group pr-12"
                />
              </Col>
              <Col md={6}>
                <FormCleave
                  disabled={isSubadmin}
                  trigger={trigger}
                  name={"frontOfficePersonPhone"}
                  id={"frontOfficePersonPhone"}
                  type={"number"}
                  label={"Phone number:"}
                  control={control}
                  rules={phoneRulesOptional}
                  errors={errors}
                  divClassName="form-group pl-12"
                />
              </Col>
            </Row>
            <div className="text-center mt-4">
            {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 7}
                onClick={() =>
                  handleSave(
                    ["frontOfficePersonName", "frontOfficePersonPhone"],
                    7,
                  )
                }
              />)}
            </div>
          </div>
             <div className="primary-contact">
                    <h5>Timesheet Approval Person</h5>
          
                    <Row>
                      <Col md={6}>
                        <FormInput
                          name={"facilityRepresentativeName"}
                          id={"facilityRepresentativeName"}
                          type={"text"}
                          label={"Name:"}
                          register={register}
                          rules={{}}
                          errors={errors}
                          divClassName="form-group pr-12"
                        />
                      </Col>
                      <Col md={6}>
                        <FormInput
                          name={"facilityRepresentativeEmail"}
                          id={"facilityRepresentativeEmail"}
                          type={"text"}
                          label={"Email:"}
                          register={register}
                          rules={{}}
                          errors={errors}
                          divClassName="form-group pl-12"
                        />
                      </Col>
                    </Row>
                    <div className="text-center mt-4">
                      <FormButton
                        className="pt-btn btn-primary pt-btn-small"
                        type={"button"}
                        label={"Save"}
                        loader={loader === 8}
                        onClick={() =>
                          handleSave(
                            ["facilityRepresentativeName", "facilityRepresentativeEmail"],
                            8,
                          )
                        }
                      />
                    </div>
                  </div>

          <div className="primary-contact">
            <h5>Facility Location</h5>
            {locaFields && locaFields?.length > 0 && (
              <div className="divider-form">
                {locaFields &&
                  locaFields?.length > 0 &&
                  locaFields.map((loca, index) => {
                    const isPrimary = index === 0;
                    return (
                      <Row
                        key={loca.id}
                        className="mt-3">
                        <h5>
                          Location
                          {isPrimary ? " (Primary)" : ` ${index + 1}`}
                        </h5>

                        {!isPrimary && (
                          <Col md={6}>
                            <div className="picture-block">
                              <p className="mb-0">Profile Picture (optional)</p>
                              <div className="uploaded-pic">
                                <UploadFile
                                  disabled={isSubadmin}
                                  hideRemoveBtn={isSubadmin}
                                  multiple={false}
                                  serverFiles={
                                    getValues(`addresses[${index}].picUrl`)
                                      ? [
                                          getValues(
                                            `addresses[${index}].picUrl`,
                                          ),
                                        ]
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

                        <Col md={12}>
                          <FormInput
                            disabled={isSubadmin}
                            name={`addresses[${index}].nickname`}
                            id={`addresses[${index}].nickname`}
                            label={"Nickname: "}
                            placeholder={"Address Nickname"}
                            type={"text"}
                            register={register}
                            rules={OfficeNickNameRules}
                            errors={errors}
                            divClassName="form-group nick-name"
                            errorMsg={
                              errors["addresses"]?.[index]?.["nickname"]
                                ?.message
                            }
                          />
                        </Col>
                        <Col md={12}>
                          <div className="form-group">

                          {!isSubadmin ? (<PlacesInput
                              disabled={isSubadmin}
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
                            />) : (<Input
                              disabled={isSubadmin}
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
                            />)}
                          </div>
                          <FormInput
                            disabled={isSubadmin}
                            name={`addresses[${index}].address2`}
                            id={`addresses[${index}].address2`}
                            type={"text"}
                            register={register}
                            rules={{}}
                            errors={errors}
                            placeholder="Address line 2"
                            divClassName={"office-address form-group"}
                          />
                        </Col>
                        <Col md={4}>
                          <FormInput
                            disabled={isSubadmin}
                            divClassName="form-group"
                            name={`addresses[${index}].city`}
                            id={`addresses[${index}].city`}
                            type={"text"}
                            label={"City:"}
                            register={register}
                            rules={CityRules}
                            errors={errors}
                            errorMsg={
                              errors["addresses"]?.[index]?.["city"]?.message
                            }
                          />
                        </Col>
                        <Col md={4}>
                          <FormSelect
                            isDisabled={isSubadmin}
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
                              errors["addresses"]?.[index]?.state?.message
                            }
                            label="State:"
                          />
                        </Col>
                        <Col md={4}>
                          <FormInput
                            disabled={isSubadmin}
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
                        </Col>
                        <Col md={12}>
                          <div className="clinic-question-ans">
                            <label>
                              Share more about your facility and your
                              expectations (Highlight for clinicians why they
                              would want to pick up a shift at your clinic)
                            </label>

                            <FormInput
                              disabled={isSubadmin}
                              id={`addresses[${index}].description`}
                              name={`addresses[${index}].description`}
                              divClassName={"h-100 form-group office-address"}
                              register={register}
                              errors={errors}
                              type={"textarea"}
                              maxLength={10000}
                              rules={AboutFacilityRules}
                              placeholder={
                                "Example:  We are a small clinic. We see predominately musculoskeletal conditions in middle age adults with a sprinkle of total joints or neuro. Patients are scheduled every 45 minutes and get 1:1 care. We have techs to assist in setting up and cleaning."
                              }
                              errorMsg={
                                errors["addresses"]?.[index]?.["description"]
                                  ?.message
                              }
                            />
                          </div>
                        </Col>

                        <div className="d-grid add-remove-btn">
                          {!isSubadmin && index === locaFields.length - 1 && (
                            <button
                              type="button"
                              className="btn-link add-btn"
                              onClick={() => {
                                locaAppend({
                                  description: primaryAddress?.description,
                                  picUrl: "",
                                });
                              }}>
                              {" "}
                              + Add Location{" "}
                            </button>
                          )}
                          {!isSubadmin && !isPrimary && (
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
                      </Row>
                    );
                  })}
              </div>
            )}
            {!isSubadmin && locaFields?.length <= 0 && (
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
            <div className="text-center mt-4">
            {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 4}
                onClick={() => handleSave(["addresses"], 4)}
              />)}
            </div>
          </div>

          <div className="primary-contact">
            <h5>Clinic details</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  disabled={isSubadmin}
                  divClassName="form-group pr-12 pl-input"
                  type="text"
                  id="numberOfClinicians"
                  name="numberOfClinicians"
                  register={register}
                  rules={NumberOfCliniciansRules}
                  errors={errors}
                  label="Number of clinicians currently at this facility:"
                  placeholder={"Ex: 5 PTs, 3 PTAs, 1 OT and 2 techs"}
                />
              </Col>
            </Row>
            <div className="clinic-detail-block">
              <div className="clinic-detail-box border-bottom">
                <label>Type of facility:</label>
                <div className="clinic-checkbox">
                  <FormCheckboxOther
                    disabled={isSubadmin}
                    control={control}
                    options={facilityTypeOptions}
                    register={register}
                    errors={errors}
                    name="facilityType"
                    rules={TypeOfFacilityRules}
                    divClassName="checkbox-box"
                  />
                </div>
                <FormInput
                  disabled={!facilityType.includes("Other") && isSubadmin}
                  // disabled={!facilityType.includes("Other")}
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
              <div className="clinic-detail-box border-bottom">
                <label>Type(s) of patients:</label>
                <div className="clinic-checkbox">
                  <FormCheckboxOther
                    disabled={isSubadmin}
                    control={control}
                    options={patientTypeOptions}
                    register={register}
                    errors={errors}
                    rules={TypeOfPatientsRules}
                    name="patientsType"
                    divClassName="checkbox-box"
                  />
                </div>
                <FormInput
                  disabled={!patientsType.includes("Other") && isSubadmin}
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
              <div className="clinic-detail-box border-bottom">
                <label>Dress code:</label>
                <div className="clinic-checkbox">
                  <FormCheckboxOther
                    disabled={isSubadmin}
                    control={control}
                    options={dressCodeOptions}
                    register={register}
                    rules={DressCodeRules}
                    errors={errors}
                    name="dressCode"
                    divClassName="checkbox-box dress"
                    onChangeFor={(label) => {
                      let text = dressCodeOther;
                      unregister("dressCodeOther");
                      register("dressCodeOther");
                      setValue("dressCodeOther", text);
                    }}
                  />
                </div>
                <FormInput
                  disabled={isSubadmin}
                  divClassName="textarea pl-input"
                  name={"dressCodeOther"}
                  id={"dressCodeOther"}
                  type={"textarea"}
                  register={register}
                  rules={dressCode.includes("Other") ? CommentRules : {}}
                  errors={errors}
                  maxLength={MAX_LENGTH}
                  placeholder={"Anything specific about the dress code?"}
                />
                <hr style={{ borderTop: "1px dashed #80d3cb", opacity: 1 }} />
                <FormInput
                  disabled={isSubadmin}
                  divClassName="pl-input"
                  name={"patientsSeenPerHour"}
                  id={"patientsSeenPerHour"}
                  type={"text"}
                  className="w-100 mt-2"
                  label={"Number of patients seen per hour:"}
                  register={register}
                  rules={PatientSeenPerHourRules}
                  errors={errors}
                  placeholder={
                    "Example: 1 per hour. 1-2 per hour. 2 per hour with tech assistance. 45 minute treatment sessions."
                  }
                />
              </div>
              <div className="clinic-detail-box border-bottom">
                <label>What EMR do you use?</label>
                <FormInput
                  disabled={isSubadmin}
                  divClassName="textarea"
                  name={"emrList"}
                  id={"emrList"}
                  type={"textarea"}
                  label={""}
                  register={register}
                  rules={EmrRules}
                  errors={errors}
                  maxLength={MAX_LENGTH}
                />
                <hr style={{ borderTop: "1px dashed #80d3cb", opacity: 1 }} />
                <p className="mt-2">Is CPR required?</p>
                <div className="cpr-radio">
                  <FormRadio
                    disabled={isSubadmin}
                    name={"isCPRRequired"}
                    options={boolList}
                    register={register}
                    rules={isCPRRequiredRules}
                    errors={errors}
                    divClassName="pt-radio"
                  />
                </div>
                <FormInput
                  disabled={isSubadmin}
                  divClassName="signup-input-psph mt-2"
                  name={"CPRRequirement"}
                  id={"CPRRequirement"}
                  type={"text"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  label={
                    "If yes, list any specific requirements (BLS, AHA-certified, etc)"
                  }
                />
              </div>

              {/* <div className="clinic-detail-box">
                <label>Are there training videos for clinician to watch?</label>
                <div className="radio-main">
                  <FormRadio
                    name={"isTrainingVideosForClinician"}
                    options={boolList}
                    register={register}
                    rules={IsTrainingVideosForClinicianRules}
                    errors={errors}
                    divClassName="pt-radio"
                  />
                </div>
              </div> */}
            </div>
            <div className="clinic-detail-box border-bottom-dash mb-12">
              <label>Where do clinicians check in on their first day:</label>
              <FormInput
                disabled={isSubadmin}
                name="checkInPlaceForFirstDay"
                id="checkInPlaceForFirstDay"
                divClassName={"signup-input situation pl-input"}
                register={register}
                errors={errors}
                rules={checkInPlaceForFirstDayRules}
                maxLength={MAX_LENGTH}
                placeholder={
                  "Example: 2nd Floor receptionist, first floor front office manager, etc"
                }
              />
            </div>
            <div className="clinic-question-ans mb-12">
              <label>
                What is the parking situation? (Please be specific. Include
                location of specific lot, surface vs garage)
              </label>
              <FormInput
                disabled={isSubadmin}
                name="parkingSituation"
                id="parkingSituation"
                register={register}
                errors={errors}
                divClassName={"signup-input share"}
                maxLength={MAX_LENGTH}
              />
            </div>
            <div className="text-center mt-4">
            {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 5}
                onClick={() => handleSave(clientDetails, 5)}
              />)}
            </div>
          </div>
          <div className="primary-contact border-0 pb-0 mb-0">
            {/* <h5>Invoice section</h5>
            <div className="w-100">
              <h6 className="mt-2">How would you like to pay invoices:</h6>
              <div className="">
                <FormRadio
                  disabled={isSubadmin}
                  name={"invoiceMethod"}
                  options={[
                    { label: "Paper check", value: "Paper check" },
                    {
                      label: "ACH/Online bank transfer",
                      value: "Online bank transfer",
                    },
                    { label: "Credit card*", value: "Credit card" },
                  ]}
                  register={register}
                  rules={invoiceMethodRules}
                  errors={errors}
                  divClassName="pt-radio im-radio mb-2"
                />
              </div>
              <p
                className="sub-text-setting"
                style={{ marginBottom: 0 }}>
                We invoice weekly unless otherwise agreed
              </p>
              <p className="sub-text-settings">
                *May incur a small processing fee, please see facility agreement
              </p>
            </div> */}

            <div className="signup-third-btm-textarea">
              <h6>Additional emails to copy on invoices (optional):</h6>

              <FormInput
                disabled={isSubadmin}
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
                disabled={isSubadmin}
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
                disabled={isSubadmin}
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
            <div className="text-center mt-4">
            {!isSubadmin && (<FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 6}
                onClick={() => handleSave(invoiceFields, 6)}
              />)}
            </div>
          </div>
        </fieldset>
      </Form>
      <EditEmailModal
        modal={editEmailModal}
        toggle={() => setEditEmailModal(!editEmailModal)}
        data={initData}
        callbackFn={() => {
          setEditEmailModal(!editEmailModal);
          getFacilityData();
        }}
      />
      <ResetFacilityPasswordModal
        modal={resetPasswordModal}
        toggle={() => setResetPasswordModal(!resetPasswordModal)}
        data={initData}
        callbackFn={() => {
          setResetPasswordModal(!resetPasswordModal);
          handleReset();
        }}
      />
    </div>
  );
}
