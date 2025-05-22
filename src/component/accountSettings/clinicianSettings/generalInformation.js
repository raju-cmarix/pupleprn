import { api } from "api/Api";
import { Close, Upload } from "assets/svg";
import FormButton from "component/common/FormButton";
import FormCheckbox from "component/common/FormCheckbox";
import FormCleave from "component/common/FormCleave";
import FormDatePicker from "component/common/FormDatePicker";
import FormError from "component/common/FormError";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import FormSelect from "component/common/FormSelect";
import PlacesInput from "component/common/PlacesInput";
import {
  DELETE_FILE_URL,
  EDIT_CLINICIAN_DATA,
  GET_LOGIN_DATA_URL,
} from "constants/ApiUrls";
import {
  ACCEPT_IMAGE,
  ACCEPT_IMAGE_PDF,
  ACCEPT_PDF,
  CERTI_SPECIALITY_DEFAULT_FIELDS,
  lastdayoflastmonth,
  RESPONSE_CREATED,
  RESPONSE_OK,
  ACCEPT_DOC,
} from "constants/AppConstants";
import {
  AboutMeRules,
  CityRules,
  ClinicianTypeRules,
  CPRRules,
  DOBRules,
  EducationRules,
  FirstNameRules,
  GraduationYearRules,
  LanguageRules,
  LastNameRules,
  LicenseNumberRules,
  MAlRules,
  NameRules,
  phoneRules,
  PLExpireDateRules,
  StateRules,
  YearsOfPracticeRules,
  ZipCodeRules,
} from "constants/Rules";
import { isEmpty, pick } from "radash";
import { useContext, useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Col, Form, Row } from "reactstrap";
import UserContext from "utils/context/UserContext";
import { timeZone } from "utils/Utils";
import {
  certificationYear,
  clinician,
  education,
  experience,
  facExp,
  gender,
  language,
  patientExp,
  specialties,
  state,
  timeOptions,
  vaccination,
  weekDays,
} from "views/authentication/signUpClinician/HourlyConstant";
import { Navigate } from "react-router-dom";
import UploadFile from "../../common/uploadFile";

function GeneralInformation({ currentActiveTab, location }) {
  const pageTitle = document?.title;
  window.dataLayer.push({
    event: "pageview",
    page: {
      title: `${pageTitle}`,
      url: window.location.href,
      path: window.location.pathname,
    },
  });
  const [initData, setInitData] = useState({});
  const [otherFormErrors, setOtherFormErrors] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [otherFormData, setOtherFormData] = useState({});
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [trig, setTrig] = useState(false);
  const npiSectionRef = useRef(null);
  const {
    register,
    reset,
    trigger,
    getValues,
    control,
    resetField,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      licenseDetails: [{}],
      facilityExperience: facExp,
      patientExperience: patientExp,
      covidTestPictureUrl: [],
      availableWeekDays: weekDays,
    },
  });
  const isCPRCertification = watch("isCPRCertification");
  const isMalpracticeInsurance = watch("isMalpracticeInsurance");
  const malpracticeExp = watch("malpracticeExp");
  const [filesToRemove, setFilesToRemove] = useState([]);
  const handleFileRemove = (fileUrl) => {
    setFilesToRemove((prevFiles) => [...prevFiles, fileUrl]);
  };

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
    fields: boardcertiFields,
    append: boardcertiAppend,
    remove: boardcertiRemove,
  } = useFieldArray({
    control,
    name: "specialityDetails",
  });

  const {
    fields: facilityCertificationFields,
    append: faciCertiAppend,
    remove: faciCertiRemove,
  } = useFieldArray({
    control,
    name: "facilityCertificates",
  });

  const { fields: fEFields } = useFieldArray({
    control,
    name: "facilityExperience",
  });

  const { fields: pEFields } = useFieldArray({
    control,
    name: "patientExperience",
  });

  const { fields: availableDaysFields } = useFieldArray({
    control,
    name: "availableWeekDays",
  });

  const firstSection = [
    "profileUrl",
    "firstName",
    "lastName",
    "gender",
    "phone",
    "dateOfBirth",
    "knownLanuages",
    "minimumHourlyRate",
    "maximumShiftsDistance",
    "roles",
    "drivingLicensePhotoUrl",
    "resumeUrl",
    "aboutMe",
  ];

  const fourthSection = [
    "homeAddress1",
    "homeAddress2",
    "homeAddressCity",
    "homeAddressState",
    "homeAddressZipCode",
    "lat",
    "long",
  ];

  useEffect(() => {
    if (location.hash === "#npi-section") {
      setTimeout(() => {
        if (npiSectionRef.current) {
          npiSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (isCPRCertification === "false") {
      setValue("cprExpiryDate", null);
      setOtherFormData({
        ...otherFormData,
        cprPictureUrl: "",
      });
    } else {
      setError("cprExpiryDate", null);
    }
  }, [isCPRCertification]);

  useEffect(() => {
    if (isMalpracticeInsurance === "false") {
      setValue("malpracticeExp", null);
      setOtherFormData({
        ...otherFormData,
        malpracticeUrl: "",
        malpracticeFee: 1,
      });
    } else if (malpracticeExp) {
      const enteredDate = new Date(malpracticeExp);
      const today = new Date();
      if (enteredDate < today) {
        setOtherFormData({
          ...otherFormData,
          malpracticeFee: 1,
        });
      } else {
        setOtherFormData({
          ...otherFormData,
          malpracticeFee: null,
        });
      }
    } else {
      setOtherFormData({
        ...otherFormData,
        malpracticeFee: null,
      });
      setError("malpracticeExp", null);
    }
  }, [isMalpracticeInsurance, malpracticeExp]);

  useEffect(() => {
    for (let i = 0; i < arr?.length; i++) {
      if (!arr[i]) resetField(`facilityExperience[${i}].startTime`);
    }
  }, [arr]);

  useEffect(() => {
    for (let i = 0; i < arr1?.length; i++) {
      if (!arr1[i]) resetField(`patientExperience[${i}].startTime`);
    }
  }, [arr1]);

  useEffect(() => {
    if (isEmpty(user) || user.isEdited) return;
    if (user?.facilityId) {
      Navigate("/403");
    }
  });

  useEffect(() => {
    setValue("homeAddress1 ", watch("homeAddress1 "));
  }, [watch("homeAddress1")]);

  useEffect(() => {
    if (isEmpty(user)) return;
    let data = {
      ...user?.clinicianId,
      ...user,
    };

    data.dateOfBirth =
      data.dateOfBirth && data.dateOfBirth !== "NaN"
        ? new Date(Number(data?.dateOfBirth))
        : "";
    data.tbTestExpiryDate = data.tbTestExpiryDate
      ? new Date(Number(data?.tbTestExpiryDate))
      : "";
    data.cprExpiryDate = data.cprExpiryDate
      ? new Date(Number(data?.cprExpiryDate))
      : "";
    if (data?.licenseDetails && data?.licenseDetails.length > 0) {
      data.licenseDetails = data.licenseDetails.map((item) => {
        return {
          ...item,
          licenseExpDate: new Date(Number(item.licenseExpDate)),
        };
      });
    } else {
      data.licenseDetails = [{}];
    }

    if (!data.certificationDetails || data.certificationDetails.length === 0) {
      data.certificationDetails = CERTI_SPECIALITY_DEFAULT_FIELDS;
    }
    if (!data.specialityDetails || data.specialityDetails.length === 0) {
      data.specialityDetails = CERTI_SPECIALITY_DEFAULT_FIELDS;
    }

    let tempF = [];
    for (let i = 0; i < data.facilityExperience?.length; i++) {
      if (data.facilityExperience[i].isAvailable) tempF[i] = true;
    }
    setArr([...tempF]);

    let tempP = [];
    for (let i = 0; i < data.patientExperience?.length; i++) {
      if (data.patientExperience[i].isAvailable) tempP[i] = true;
    }
    setArr1([...tempP]);

    data.isMalpracticeInsurance = data.isMalpracticeInsurance
      ? "true"
      : "false";
    data.isCPRCertification = data.isCPRCertification ? "true" : "false";
    data.isTbTest = data.isTbTest ? "true" : "false";
    if (data.licenseDetails && data.licenseDetails.length) {
      data.licenseDetails.map((lic) => (lic.isServerData = true));
    }

    if (!data.facilityCertificates || !data.facilityCertificates?.length) {
      data.facilityCertificates = [""];
    }

    reset({ ...data });
    setInitData({ ...data });

    setOtherFormData({
      profileUrl: data.profileUrl,
      cprPictureUrl: data.cprPictureUrl,
      drivingLicensePhotoUrl: data.drivingLicensePhotoUrl,
      covidTestPictureUrl: data.covidTestPictureUrl,
      resumeUrl: data.resumeUrl,
      tbTestPictureUrl: data.tbTestPictureUrl,
      malpracticeUrl: data.malpracticeUrl,
    });
  }, [user]);

  const fileCallbackFn = (res, id, multiple) => {
    setOtherFormData({
      ...otherFormData,
      [id]: multiple ? [...otherFormData[id], ...res] : res[0],
    });
  };

  const deleteCallbackFn = (respData, id) => {
    setOtherFormData({ ...otherFormData, [id]: respData });
  };

  const handleSave = async (obj, loaderValue) => {
    const category = "User Interaction";
    const action = "Button Click";
    const label = "Save";

    window.dataLayer.push({
      event: "clinician-settings",
      eventProps: {
        category: category,
        action: action,
        label: label,
      },
    });
    let reqData = {};

    let result = await trigger(obj);
    let values = { ...getValues(), ...otherFormData };

    if (loaderValue === 2) {
      let DirError = false;
      let obj = {
        profileUrl: otherFormData.profileUrl
          ? ""
          : "Profile picture is required",
        drivingLicensePhotoUrl:
          otherFormData.drivingLicensePhotoUrl.length === 0
            ? "Driver's License is required"
            : "",
        resumeUrl: otherFormData.resumeUrl ? "" : "Resume is required",
      };
      DirError = otherFormData.drivingLicensePhotoUrl.length === 0;
      setOtherFormErrors({ ...obj });

      if (DirError) return;
      if (!otherFormData.profileUrl) return;
      if (!otherFormData.resumeUrl) return;
    }
    if (loaderValue === 10) {
      let mpError = false;
      if (isMalpracticeInsurance === "true") {
        let obj = {
          malpracticeUrl:
            otherFormData.malpracticeUrl === ""
              ? "Malpractice certificate is required"
              : "",
        };
        mpError = otherFormData.malpracticeUrl === "";
        setOtherFormErrors({ ...obj });
        if (values.malpracticeExp === "" || watch("malpracticeExp") === null) {
          setError("malpracticeExp", {
            type: "required",
            message: "Malpractice expiration date is required",
          });
          mpError = true;
        }
        if (mpError) return;
      } else {
        setOtherFormErrors({});
        setError("malpracticeExp", null);
      }
    }
    if (loaderValue === 11) {
      let cprError = false;
      if (isCPRCertification === "true") {
        let obj = {
          cprPictureUrl:
            otherFormData.cprPictureUrl === "" ? "Please upload PDF/image" : "",
        };
        cprError = otherFormData.cprPictureUrl === "";
        setOtherFormErrors({ ...obj });
        if (values.cprExpiryDate === "" || watch("cprExpiryDate") === null) {
          setError("cprExpiryDate", {
            type: "required",
            message: "CPR expiration date is required",
          });
          cprError = true;
        }

        if (cprError) return;
      } else {
        setOtherFormErrors({});
        setError("cprExpiryDate", null);
      }
    }
    if (loaderValue === 14) {
      let facError = false;
      let tempF = values.facilityExperience.filter(
        (exp) => exp.isAvailable === true,
      );

      tempF = tempF.filter((exp) => exp.startTime);

      if (!tempF.length) {
        obj = { ...obj, facilityExperience: "Facility experience is required" };
      }

      // patient error
      let patErr = false;
      let tempP = values.patientExperience.filter(
        (exp) => exp.isAvailable === true,
      );

      tempP = tempP.filter((exp) => exp.startTime);

      if (!tempP.length) {
        obj = { ...obj, patientExperience: "Patient experience is required" };
      }

      let weekErr = false;
      const isAnyWeekDayChecked = Object.values(values.availableWeekDays).some(
        (checked) => checked === true,
      );

      if (!isAnyWeekDayChecked) {
        obj = {
          ...obj,
          availableWeekDays: "At least one weekday must be selected.",
        };
        weekErr = true;
      }

      setOtherFormErrors({ ...obj });
      if (facError || patErr || weekErr) return;
    }

    if (result) {
      reqData = pick(values, obj);
      onSave(reqData, loaderValue);
    }
  };

  const onSave = (reqData, loaderValue) => {
    const values = getValues();

    setLoader(loaderValue);
    let data = {
      ...initData,
      ...reqData,
      userId: initData.id,
      id: initData.clinicianId.id,
      timeZone: timeZone(),
      messageNumber: values.messageNumber,
      malpracticeExp: values.malpracticeExp,
      availableWeekDays: {
        monday: values.availableWeekDays?.monday || false,
        tuesday: values.availableWeekDays?.tuesday || false,
        wednesday: values.availableWeekDays?.wednesday || false,
        thursday: values.availableWeekDays?.thursday || false,
        friday: values.availableWeekDays?.friday || false,
        saturday: values.availableWeekDays?.saturday || false,
        sunday: values.availableWeekDays?.sunday || false,
      },
    };

    if (data.dateOfBirth) {
      data.dateOfBirth = `${new Date(data.dateOfBirth)?.getTime()}`;
    } else {
      delete data?.dateOfBirth;
    }
    if (data.tbTestExpiryDate) {
      data.tbTestExpiryDate = `${new Date(data.tbTestExpiryDate)?.getTime()}`;
    } else {
      delete data?.tbTestExpiryDate;
    }
    if (data.cprExpiryDate) {
      data.cprExpiryDate = `${new Date(data.cprExpiryDate)?.getTime()}`;
    }
    if (data.malpracticeExp) {
      data.malpracticeExp = `${new Date(data.malpracticeExp)?.getTime()}`;
    }
    if (data.licenseDetails && data.licenseDetails.length > 0) {
      const tempLicenseDetails = data.licenseDetails.filter(
        (detail) => detail.licenseNumber && detail?.state,
      );
      if (tempLicenseDetails.length > 0) {
        data.licenseDetails = tempLicenseDetails.map((detail) => ({
          ...detail,
          licenseExpDate: detail.licenseExpDate
            ? new Date(detail.licenseExpDate).getTime().toString()
            : "",
        }));
      } else {
        data.licenseDetails = [];
      }
    } else {
      data.licenseDetails = [];
    }

    if (data.facilityCertificates) {
      data.facilityCertificates = data.facilityCertificates.filter((fc) => fc);
    }

    // If fileds are empty then filter them out
    data.certificationDetails = data?.certificationDetails?.filter(
      (certi) => certi.name && (certi.description || certi.receivedYear),
    );
    data.specialityDetails = data?.specialityDetails?.filter(
      (spec) => spec.name && (spec.description || spec.receivedYear),
    );

    api(EDIT_CLINICIAN_DATA, data).then((res) => {
      if (res.status === RESPONSE_OK) {
        setInitData({ ...values, ...reqData });
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
      setTrig(!trig);
    });
  };

  const getUserObj = () => {
    api(GET_LOGIN_DATA_URL, {}).then((res) => {
      if (res.status === RESPONSE_OK) setUser(res.data.data);
      else setUser({});
    });
  };

  useEffect(() => {
    getUserObj();
  }, [currentActiveTab, location, trig]);

  const handleLicsenseAppend = () => {
    if (!errors?.licenseDetails) {
      licAppend({});
    } else {
      toast.error("Please complete the previous field - License Details");
    }
  };

  return (
    <>
      <div className="general-content">
        <Form>
          <div className="first-block">
            <div className="general-photo-main m-0 p-0 border-0">
              <div className="picture-block m-0 p-0 border-0">
                <h5>Profile picture</h5>
                <p>
                  Select a high quality primary profile image to represent yourself
                </p>
                <div className="uploaded-pic clinician">
                  <UploadFile
                    serverFiles={
                      otherFormData.profileUrl ? [otherFormData.profileUrl] : []
                    }
                    multiple={false}
                    id="profileUrl"
                    name={"profileUrl"}
                    accept={ACCEPT_IMAGE}
                    folder="images"
                    max={1}
                    callbackFn={fileCallbackFn}
                    deleteCallbackFn={deleteCallbackFn}
                    onFileRemove={handleFileRemove}
                  />
                </div>
                <FormError msg={otherFormErrors?.["profileUrl"]} />
              </div>
            </div>
          </div>
          <div className="primary-contact">
            <h5>General information</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  disabled={true}
                  divClassName="form-group pr-12"
                  name={"firstName"}
                  id={"firstName"}
                  type={"text"}
                  label={"First Name :"}
                  register={register}
                  rules={FirstNameRules}
                  errors={errors}
                  autoFocus={true}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  disabled={true}
                  divClassName="form-group pl-12"
                  name={"lastName"}
                  id={"lastName"}
                  type={"text"}
                  label={"Last Name :"}
                  register={register}
                  rules={LastNameRules}
                  errors={errors}
                />
              </Col>
              <Col md={6}>
                <FormSelect
                  isDisabled={true}
                  divClassName="form-group pr-12"
                  name={"gender"}
                  id={"gender"}
                  label="Gender:"
                  register={register}
                  rules={{}}
                  options={gender}
                  errors={errors}
                  placeholder="Select"
                  control={control}
                  optionValue="value"
                  optionLabel="label"
                />
              </Col>
              <Col md={6}>
                <FormDatePicker
                  divClassName="form-group pl-12"
                  label={"Date of birth:"}
                  name={"dateOfBirth"}
                  id={"dateOfBirth"}
                  errors={errors}
                  rules={DOBRules}
                  control={control}
                  maxDate={new Date()}
                  inlineIcon={true}
                />
              </Col>
              <Col md={6}>
                <FormCleave
                  trigger={trigger}
                  control={control}
                  divClassName="form-group pr-12"
                  name={"phone"}
                  id={"phone"}
                  type={"number"}
                  label={"Phone number:"}
                  register={register}
                  rules={phoneRules}
                  errors={errors}
                />
                <div>
                  <p>
                    We send some notifications via text (shift confirmations,
                    chat messages, etc)
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <FormSelect
                  divClassName="form-group pl-12"
                  options={language}
                  placeholder="Select"
                  control={control}
                  name={"knownLanuages"}
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={LanguageRules}
                  multiple={true}
                  label="Languages spoken:"
                  className="lang"
                  isClearable={true}
                />
              </Col>
              {/* <Col md={6}>
                <FormCleave
                  divClassName="form-group pr-12"
                  trigger={trigger}
                  control={control}
                  name={"messageNumber"}
                  id={"messageNumber"}
                  type={"number"}
                  label={"Text message number:"}
                  rules={messagePhoneRules}
                  errors={errors}
                  // checkBox={
                  //   <div className="d-flex gap-1 align-items-center mt-1">
                  //     <FormCheckbox
                  //       control={control}
                  //       divClassName="i-agree mt-1"
                  //       className="form-check-input"
                  //       name="allowSMSNotifications"
                  //       options={[
                  //         { label: "", value: "allowSMSNotifications" },
                  //       ]}
                  //       register={register}
                  //       errors={errors}
                  //     ></FormCheckbox>
                  //     <div style={{ fontSize: "12px" }}>
                  //       I agree to receive SMS messages from application for
                  //       account notifications, new chats, etc.
                  //     </div>
                  //   </div>
                  // }
                />
              </Col> */}
            </Row>
            <div className="dashed-border"></div>
            <Row>
              {/* <Col md={6}>
                <div className="form-group pr-12">
                  <FormSelect
                    options={HourlyConstants}
                    placeholder="Select"
                    control={control}
                    name={"minimumHourlyRate"}
                    errors={errors}
                    optionValue="value"
                    optionLabel="label"
                    rules={{}}
                    label="Minimum hourly rate:"
                    className="space"
                  />
                </div>
              </Col> */}
              {/* <Col md={6}>
                <div className="form-group pr-12">
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
                  />
                </div>
              </Col> */}
              <Col md={6}>
                <FormSelect
                  divClassName="form-group"
                  options={clinician}
                  placeholder="Select"
                  control={control}
                  name={"roles"}
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={ClinicianTypeRules}
                  label="Clinician type:"
                />
              </Col>
              <Col md={6}>
                <div className="form-group pl-12">
                  <label>Resume (required):</label>
                  <UploadFile
                    serverFiles={
                      otherFormData.resumeUrl ? [otherFormData.resumeUrl] : []
                    }
                    gridView={true}
                    multiple={false}
                    id="resumeUrl"
                    name={"resumeUrl"}
                    accept={ACCEPT_PDF}
                    folder="images"
                    max={1}
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={deleteCallbackFn}
                  />
                  <FormError msg={otherFormErrors?.["resumeUrl"]} />
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group license">
                  <label>Drivers License (required):</label>
                  <div className="signup-upload-file">
                    <UploadFile
                      serverFiles={otherFormData.drivingLicensePhotoUrl}
                      gridView={false}
                      multiple={true}
                      label={"Click here to upload file"}
                      icon={<Upload />}
                      id="drivingLicensePhotoUrl"
                      name={"drivingLicensePhotoUrl"}
                      // accept={ACCEPT_IMAGE}
                      accept={[ACCEPT_IMAGE, ...ACCEPT_PDF, ...ACCEPT_DOC]}
                      folder="images"
                      max={2}
                      callbackFn={fileCallbackFn}
                      onFileRemove={handleFileRemove}
                      deleteCallbackFn={deleteCallbackFn}
                    />
                  </div>
                  <FormError
                    msg={otherFormErrors?.["drivingLicensePhotoUrl"]}
                  />
                </div>
              </Col>

              <Col md={12}>
                <FormInput
                  divClassName={"form-group aboutMe"}
                  className="form-control mb-24"
                  name={"aboutMe"}
                  id={"aboutMe"}
                  type={"textarea"}
                  maxLength={1500}
                  register={register}
                  rules={AboutMeRules}
                  errors={errors}
                  label={"About me:"}
                />
              </Col>
            </Row>

            <div className="text-center">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 2}
                onClick={() => handleSave(firstSection, 2)}
              />
            </div>
          </div>

          <div className="primary-contact">
            <h5>Emergency contact</h5>

            <Row>
              <Col md={6}>
                <FormInput
                  divClassName={"form-group pr-12"}
                  name={"emrgencyContactName"}
                  id={"emrgencyContactName"}
                  type={"text"}
                  label={"Name:"}
                  register={register}
                  rules={NameRules}
                  errors={errors}
                />
              </Col>
              <Col md={6}>
                <FormCleave
                  trigger={trigger}
                  divClassName={"form-group pl-12"}
                  name={"emrgencyContactPhone"}
                  id={"emrgencyContactPhone"}
                  type={"number"}
                  label={"Phone number:"}
                  control={control}
                  rules={phoneRules}
                  errors={errors}
                />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 3}
                onClick={() =>
                  handleSave(["emrgencyContactName", "emrgencyContactPhone"], 3)
                }
              />
            </div>
          </div>
          <div className="primary-contact">
            <h5>Home address</h5>

            <Row>
              <Col md={12}>
                <div className="form-group">
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
                  />
                </div>
                <FormInput
                  name={"homeAddress2"}
                  id={"homeAddress2"}
                  type={"text"}
                  register={register}
                  rules={{}}
                  errors={errors}
                  divClassName={"office-address form-group"}
                  placeholder="Address line 2"
                />
              </Col>
              <Col md={4}>
                <FormInput
                  divClassName={"form-group"}
                  name={"homeAddressCity"}
                  id={"homeAddressCity"}
                  type={"text"}
                  label={"City:"}
                  register={register}
                  rules={CityRules}
                  errors={errors}
                />
              </Col>
              <Col md={4}>
                <FormSelect
                  divClassName={"form-group"}
                  options={state}
                  placeholder="Select"
                  control={control}
                  name={"homeAddressState"}
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={StateRules}
                  label="State:"
                />
              </Col>
              <Col md={4}>
                <FormInput
                  divClassName={"form-group"}
                  name={"homeAddressZipCode"}
                  id={"homeAddressZipCode"}
                  type={"number"}
                  label={"Zip code:"}
                  register={register}
                  rules={ZipCodeRules}
                  errors={errors}
                />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 4}
                onClick={() => handleSave(fourthSection, 4)}
              />
            </div>
          </div>
          <div className="primary-contact">
            <h5>Education</h5>

            <Row>
              <Col md={12}>
                <FormInput
                  name={"educationSchool"}
                  id={"educationSchool"}
                  disabled={true}
                  type={"text"}
                  label={"PT, PTA, OT, OTA, SLP school:"}
                  register={register}
                  rules={EducationRules}
                  errors={errors}
                />
              </Col>
              <Col md={6}>
                <FormSelect
                  isDisabled={true}
                  divClassName={"form-group pr-12"}
                  options={education}
                  placeholder="Select"
                  control={control}
                  name={"graduationYear"}
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={GraduationYearRules}
                  label="Graduation year:"
                />
              </Col>
              <Col md={6}>
                <FormSelect
                  divClassName={"form-group pl-12"}
                  options={experience}
                  placeholder="Select"
                  control={control}
                  name={"totalPracticYears"}
                  errors={errors}
                  optionValue="value"
                  optionLabel="label"
                  rules={YearsOfPracticeRules}
                  label="Years of practice:"
                />
              </Col>
            </Row>
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 5}
                onClick={() =>
                  handleSave(
                    [
                      "educationSchool",
                      "graduationYear",
                      "experience",
                      "totalPracticYears",
                    ],
                    5,
                  )
                }
              />
            </div>
          </div>
          <div className="primary-contact">
            <h5>Professional license</h5>
            <div className="divider-form">
              {licFields &&
                licFields?.length >= 0 &&
                licFields?.map((field, index) => {
                  return (
                    <Row key={field.id}>
                      <Col md={6}>
                        <FormSelect
                          isDisabled={field.state}
                          options={state}
                          placeholder="Select"
                          control={control}
                          name={`licenseDetails[${index}].state`}
                          id={`licenseDetails[${index}].state`}
                          errorMsg={
                            errors["licenseDetails"]?.[index]?.["state"]
                              ?.message
                          }
                          errors={errors}
                          optionValue="value"
                          optionLabel="label"
                          rules={StateRules}
                          divClassName={"form-group pr-12"}
                          label="State:"
                        />
                      </Col>
                      <Col md={6}>
                        <FormInput
                          disabled={field.licenseNumber}
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
                          divClassName="form-group pl-12"
                        />
                      </Col>
                      <Col md={6}>
                        <FormDatePicker
                          dateFormat={"MM/dd/yyyy"}
                          label={"Expiration Date"}
                          name={`licenseDetails[${index}].licenseExpDate`}
                          id={`licenseDetails[${index}].licenseExpDate`}
                          errorMsg={
                            errors["licenseDetails"]?.[index]?.["licenseNumber"]
                              ?.message
                          }
                          errors={errors}
                          rules={PLExpireDateRules}
                          minDate={new Date()}
                          control={control}
                          trigger={trigger}
                          divClassName="form-group pr-12"
                        />
                      </Col>

                      <div className="d-grid add-remove-btn">
                        {index === licFields.length - 1 && (
                          <button
                            type="button"
                            className="btn-link add-btn"
                            onClick={() => handleLicsenseAppend({})}>
                            + Add another license
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
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 6}
                onClick={() => handleSave(["licenseDetails"], 6)}
              />
            </div>
          </div>
          <div className="primary-contact">
            <h5>Certification</h5>

            <div className="divider-form">
              {certiFields &&
                certiFields?.length > 0 &&
                certiFields.map((certi, index) => {
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
                            errors["certificationDetails"]?.[index]?.["name"]
                              ?.message
                          }
                          divClassName="form-group pr-12"
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
                            errors["certificationDetails"]?.[index]?.[
                              "receivedYear"
                            ]?.message
                          }
                          errors={errors}
                          optionValue="value"
                          optionLabel="label"
                          rules={{}}
                          label="Year received:"
                          divClassName={"form-group pl-12"}
                        />
                      </Col>
                      <Col md={12}>
                        <FormInput
                          name={`certificationDetails[${index}].description`}
                          id={`certificationDetails[${index}].description`}
                          type={"textarea"}
                          label={"Additional information:"}
                          register={register}
                          rules={{}}
                          errors={errors}
                          errorMsg={
                            errors["certificationDetails"]?.[index]?.[
                              "description"
                            ]?.message
                          }
                          divClassName="form-group"
                        />
                      </Col>
                      <div className="d-grid add-remove-btn">
                        {index === certiFields.length - 1 && (
                          <button
                            type="button"
                            className="btn-link add-btn"
                            onClick={() => certiAppend({})}>
                            + Add another certification
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

            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 7}
                onClick={() => handleSave(["certificationDetails"], 7)}
              />
            </div>
          </div>

          <div className="primary-contact">
            <h5>Board Certified Specialties</h5>

            <div className="divider-form">
              {boardcertiFields &&
                boardcertiFields?.length > 0 &&
                boardcertiFields.map((certi, index) => {
                  return (
                    <Row key={certi.id}>
                      <Col md={6}>
                        <FormSelect
                          options={specialties}
                          placeholder="Select"
                          control={control}
                          name={`specialityDetails[${index}].name`}
                          id={`specialityDetails[${index}].name`}
                          errorMsg={
                            errors["specialityDetails"]?.[index]?.["name"]
                              ?.message
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
                          options={certificationYear}
                          placeholder="Select"
                          control={control}
                          name={`specialityDetails[${index}].receivedYear`}
                          id={`specialityDetails[${index}].receivedYear`}
                          errorMsg={
                            errors["specialityDetails"]?.[index]?.[
                              "receivedYear"
                            ]?.message
                          }
                          errors={errors}
                          optionValue="value"
                          optionLabel="label"
                          rules={{}}
                          label="Year received:"
                          divClassName={"form-group pl-12"}
                        />
                      </Col>
                      <Col md={12}>
                        <FormInput
                          name={`specialityDetails[${index}].description`}
                          id={`specialityDetails[${index}].description`}
                          type={"textarea"}
                          label={"Additional information:"}
                          register={register}
                          rules={{}}
                          errors={errors}
                          errorMsg={
                            errors["specialityDetails"]?.[index]?.[
                              "description"
                            ]?.message
                          }
                          divClassName="form-group"
                        />
                      </Col>
                      <div className="d-grid add-remove-btn">
                        {index === boardcertiFields.length - 1 && (
                          <button
                            type="button"
                            className="btn-link add-btn"
                            onClick={() => boardcertiAppend({})}>
                            + Add another certification
                          </button>
                        )}
                        {boardcertiFields.length > 1 && (
                          <button
                            type="button"
                            className="btn-link-secondary remove-btn"
                            onClick={() => boardcertiRemove(index)}>
                            <Close />
                            Remove
                          </button>
                        )}
                      </div>
                    </Row>
                  );
                })}
            </div>

            <div
              className="text-center mt-4"
              ref={npiSectionRef}
              id="npi-section">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 8}
                onClick={() => handleSave(["specialityDetails"], 8)}
              />
            </div>
          </div>

          <div className="primary-contact">
            <h5>Facility Certificates</h5>

            <div className="divider-form">
              {facilityCertificationFields &&
                facilityCertificationFields?.length > 0 &&
                facilityCertificationFields.map((fc, index) => {
                  return (
                    <Row key={fc.id}>
                      <Col md={12}>
                        <FormInput
                          name={`facilityCertificates[${index}]`}
                          id={`facilityCertificates[${index}]`}
                          type={"text"}
                          label={"Name:"}
                          register={register}
                          rules={{}}
                          errors={errors}
                          errorMsg={
                            errors["facilityCertificates"]?.[index]?.message
                          }
                          divClassName="form-group"
                        />
                      </Col>
                      <div className="d-grid add-remove-btn">
                        {index === facilityCertificationFields.length - 1 && (
                          <button
                            type="button"
                            className="btn-link add-btn"
                            onClick={() => faciCertiAppend("")}>
                            + Add another facility certificate
                          </button>
                        )}
                        {facilityCertificationFields.length > 1 && (
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

            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 15}
                onClick={() => handleSave(["facilityCertificates"], 15)}
              />
            </div>
          </div>

          <div className="primary-contact">
            <div className="general-photo-main m-0 p-0 border-0">
              <div className="picture-block">
                <h5 className="mb-2">NPI number</h5>
                <p>
                  You can Find your NPI here:{" "}
                  <a
                    target={"_blank"}
                    rel={"noreferrer"}
                    href="https://npiregistry.cms.hhs.gov/">
                    https://npiregistry.cms.hhs.gov/
                  </a>
                </p>
                <FormInput
                  inputDivClassName={"signup-input education-input NPI"}
                  name="npiNumber"
                  id={"npiNumber"}
                  type={"textarea"}
                  register={register}
                  rules={{}}
                  errors={errors}
                />
                <div className="text-center mt-4">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small"
                    type={"button"}
                    label={"Save"}
                    loader={loader === 9}
                    onClick={() => handleSave(["npiNumber"], 9)}
                  />
                </div>
              </div>
              <div className="picture-block">
                <p className="mt-3">
                  Do you currently have malpractice insurance?
                </p>
                <div className="radio-main mb-12">
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
                <p>
                  Sign up for malpractice insurance here:{" "}
                  <a
                    target={"_blank"}
                    rel={"noreferrer"}
                    href="http://www.hpso.com/">
                    http://www.hpso.com/
                  </a>
                </p>
                <div>
                  <FormDatePicker
                    dateFormat={"MM/dd/yyyy"}
                    label={"Expiration Date"}
                    name={"malpracticeExp"}
                    id={"malpracticeExp"}
                    minDate={new Date()}
                    errors={errors}
                    rules={{}}
                    control={control}
                    trigger={trigger}
                  />
                </div>

                <div className="form-group">
                  <label> PDF / image :</label>
                  <UploadFile
                    serverFiles={
                      otherFormData.malpracticeUrl
                        ? [otherFormData.malpracticeUrl]
                        : []
                    }
                    gridView={true}
                    multiple={false}
                    id="malpracticeUrl"
                    accept={ACCEPT_IMAGE_PDF}
                    folder="docs"
                    max={1}
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={deleteCallbackFn}
                  />
                </div>
                <FormError msg={otherFormErrors?.["malpracticeUrl"]} />
                <div className="text-center mt-4">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small"
                    type={"button"}
                    label={"Save"}
                    loader={loader === 10}
                    onClick={() =>
                      handleSave(
                        [
                          "isMalpracticeInsurance",
                          "malpracticeExp",
                          "malpracticeUrl",
                        ],
                        10,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="primary-contact">
            <div className="general-photo-main m-0 p-0 border-0">
              <div className="picture-block">
                <h5 className="mb-2">CPR </h5>
                <p>Do you have current CPR certification?</p>
                <div className="radio-main mb-12">
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
                <FormDatePicker
                  minDate={lastdayoflastmonth()}
                  dateFormat={"MM/yyyy"}
                  showMonthYearPicker={true}
                  label={"Expiration date:"}
                  name={"cprExpiryDate"}
                  id={"cprExpiryDate"}
                  errors={errors}
                  trigger={trigger}
                  control={control}
                  divClassName="form-group"
                />
                <div className="form-group">
                  <label> PDF / image :</label>
                  <UploadFile
                    serverFiles={
                      otherFormData.cprPictureUrl
                        ? [otherFormData.cprPictureUrl]
                        : []
                    }
                    gridView={true}
                    multiple={false}
                    id="cprPictureUrl"
                    accept={ACCEPT_IMAGE_PDF}
                    folder="docs"
                    max={1}
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={deleteCallbackFn}
                  />
                </div>
                <FormError msg={otherFormErrors?.["cprPictureUrl"]} />
                <div className="text-center mt-4">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small"
                    type={"button"}
                    label={"Save"}
                    loader={loader === 11}
                    onClick={() =>
                      handleSave(
                        [
                          "isCPRCertification",
                          "cprExpiryDate",
                          "cprPictureUrl",
                        ],
                        11,
                      )
                    }
                  />
                </div>
              </div>
              <div className="picture-block">
                <h5 className="mb-2">TB test (optional)</h5>
                <p>Have you had a negative TB screen?</p>
                <div className="radio-main mb-12">
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
                <FormDatePicker
                  dateFormat={"MM/yyyy"}
                  showMonthYearPicker={true}
                  label={"Test date:"}
                  name={"tbTestExpiryDate"}
                  id={"tbTestExpiryDate"}
                  divClassName={"form-group"}
                  errors={errors}
                  rules={{}}
                  control={control}
                />
                <div className="form-group">
                  <label> PDF / image (optional):</label>
                  <UploadFile
                    serverFiles={
                      otherFormData.tbTestPictureUrl
                        ? [otherFormData.tbTestPictureUrl]
                        : []
                    }
                    gridView={true}
                    multiple={false}
                    id="tbTestPictureUrl"
                    accept={ACCEPT_IMAGE_PDF}
                    folder="docs"
                    max={1}
                    callbackFn={fileCallbackFn}
                    onFileRemove={handleFileRemove}
                    deleteCallbackFn={deleteCallbackFn}
                  />
                </div>
                <div className="text-center mt-4">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small"
                    type={"button"}
                    label={"Save"}
                    loader={loader === 12}
                    onClick={() =>
                      handleSave(
                        ["isTbTest", "tbTestExpiryDate", "tbTestPictureUrl"],
                        12,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="primary-contact ">
            <h5>COVID Vaccination Status</h5>
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
                  divClassName="form-group pr-12"
                  label="Vaccination status:"
                />
              </Col>
              <Col md={6}>
                <div className="form-group pl-12 license">
                  <label> PDF / image (optional):</label>

                  <div className="signup-upload-file">
                    <UploadFile
                      serverFiles={otherFormData.covidTestPictureUrl}
                      gridView={false}
                      multiple={true}
                      label={"Click here to upload file"}
                      icon={<Upload />}
                      id="covidTestPictureUrl"
                      accept={ACCEPT_IMAGE_PDF}
                      folder="docs"
                      max={2}
                      callbackFn={fileCallbackFn}
                      onFileRemove={handleFileRemove}
                      deleteCallbackFn={deleteCallbackFn}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 13}
                onClick={() =>
                  handleSave(["covidStatus", "covidTestPictureUrl"], 13)
                }
              />
            </div>
          </div>

          <div className="primary-contact border-0 m-0 p-0">
            <Row className="facility">
              <Col sm={6}>
                <h5>Facility Experience (years)</h5>

                <div className="days-available space">
                  {fEFields &&
                    fEFields?.length > 0 &&
                    fEFields.map((day, index) => {
                      return (
                        <div
                          className="days"
                          key={day.id}>
                          <FormCheckbox
                            changeCallback={() => {
                              resetField(
                                `facilityExperience[${index}].startTime`,
                              );
                              setValue(
                                `facilityExperience[${index}].startTime`,
                                "",
                              );
                              let v = getValues("facilityExperience");
                              let temp = [...arr];
                              temp[index] = v[index].isAvailable;
                              setArr([...temp]);
                            }}
                            control={control}
                            divClassName="weekdays"
                            className=""
                            name={`facilityExperience[${index}].isAvailable`}
                            id={`facilityExperience[${index}].isAvailable`}
                            options={[{ label: day.day, value: "true" }]}
                            register={register}
                            rules={{}}
                            errors={errors}
                          />

                          <div className="weektiming">
                            <FormSelect
                              isDisabled={!arr[index]}
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
                            />
                          </div>
                        </div>
                      );
                    })}
                  <FormError msg={otherFormErrors?.["facilityExperience"]} />
                </div>
              </Col>
              <Col sm={6}>
                <h5>Patient Experience (years)</h5>
                <div className="days-available">
                  {pEFields &&
                    pEFields?.length > 0 &&
                    pEFields.map((day, index) => {
                      return (
                        <div
                          className="days"
                          key={day.id}>
                          <FormCheckbox
                            changeCallback={() => {
                              resetField(
                                `patientExperience[${index}].startTime`,
                              );
                              setValue(
                                `patientExperience[${index}].startTime`,
                                "",
                              );
                              let v = getValues("patientExperience");
                              let temp = [...arr1];
                              temp[index] = v[index].isAvailable;
                              setArr1([...temp]);
                            }}
                            control={control}
                            divClassName="weekdays"
                            className=""
                            name={`patientExperience[${index}].isAvailable`}
                            id={`patientExperience[${index}].isAvailable`}
                            options={[{ label: day.day, value: "true" }]}
                            register={register}
                            rules={{}}
                            errors={errors}
                          />

                          <div className="weektiming">
                            <FormSelect
                              isDisabled={!arr1[index]}
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
                            />
                          </div>
                        </div>
                      );
                    })}
                  <FormError msg={otherFormErrors?.["patientExperience"]} />
                </div>
              </Col>
              {/* <Col md={6}>
                <h5>Available Days</h5>
                <div className="days-available">
                  {availableDaysFields.map((day, index) => (
                    <div
                      className="days"
                      key={day.id}>
                      <FormCheckbox
                        name={`availableWeekDays[${day.value}]`}
                        id={`availableWeekDays[${day.value}]`}
                        control={control}
                        register={register}
                        options={[{ label: day.label }]}
                        divClassName="weekdays"
                        rules={{
                          validate: {
                            atLeastOneChecked: (value) => value?.isChecked,
                          },
                        }}
                        errors={errors}
                      />
                    </div>
                  ))}
                  <FormError msg={otherFormErrors?.["availableWeekDays"]} />
                </div>
              </Col> */}
            </Row>
            <div className="text-center mt-4">
              <FormButton
                className="pt-btn btn-primary pt-btn-small"
                type={"button"}
                label={"Save"}
                loader={loader === 14}
                onClick={() =>
                  handleSave(
                    [
                      "facilityExperience",
                      "availableWeekDays",
                      "patientExperience",
                    ],
                    14,
                  )
                }
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default GeneralInformation;
