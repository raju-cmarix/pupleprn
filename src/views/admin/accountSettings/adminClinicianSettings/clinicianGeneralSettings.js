import { Close, Download, Upload } from "assets/svg";
import "component/adminAccountSettings/adminAccountSettings.scss";
import FormButton from "component/common/FormButton";
import FormCheckbox from "component/common/FormCheckbox";
import FormInput from "component/common/FormInput";
import FormRadio from "component/common/FormRadio";
import FormSelect from "component/common/FormSelect";
import {
  CLINICIAN_PROFILE_DOWNLOAD,
  DELETE_FILE_URL,
  EDIT_CLINICIAN_DATA,
} from "constants/ApiUrls";
import {
  ACCEPT_IMAGE,
  ACCEPT_IMAGE_PDF,
  ACCEPT_PDF,
  lastdayoflastmonth,
  REFERENCEBY,
  RESPONSE_OK,
  CERTI_SPECIALITY_DEFAULT_FIELDS,
  RESPONSE_CREATED,
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
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Col, Form, Input, Row } from "reactstrap";
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
import FormDatePicker from "component/common/FormDatePicker";

import UserContext from "utils/context/UserContext";
import { api } from "api/Api";
import FormCleave from "component/common/FormCleave";
import FormError from "component/common/FormError";
import UploadFile from "component/common/uploadFile";
import { toast } from "react-toastify";
import PlacesInput from "component/common/PlacesInput";

function AdminClinicianGeneralInformation({ user, setUser }) {
  const subadmin = useContext(UserContext);
  const isSubadmin = subadmin?.user?.roles === "subadmin";
  const [initData, setInitData] = useState({});
  const [otherFormErrors, setOtherFormErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [downloadProfileLoader, setDownloadProfileLoader] = useState(false);
  const [otherFormData, setOtherFormData] = useState({});
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
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


// Facility Experience
const {
  fields: fEFields,
  append: appendFacility,
} = useFieldArray({
  control,
  name: "facilityExperience",
});

useEffect(() => {
  if (fEFields.length === 0 && facExp?.length > 0) {
    facExp.forEach((item) => appendFacility(item));
  }
}, [fEFields, appendFacility, facExp]);

// Patient Experience
const {
  fields: pEFields,
  append,
} = useFieldArray({
  control,
  name: "patientExperience",
});

useEffect(() => {
  if (pEFields.length === 0 && patientExp?.length > 0) {
    patientExp.forEach((item) => append(item));
  }
}, [pEFields, append, patientExp]);


  const { fields: availableDaysFields } = useFieldArray({
    control,
    name: "availableWeekDays",
  });

  useEffect(() => {
    if (isEmpty(user)) return;
    let data = {
      ...user?.clinicianId,
      ...user,
    };

    data.dateOfBirth = data.dateOfBirth
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
    for (let i = 0; i < data.facilityExperience.length; i++) {
      if (data.facilityExperience[i].isAvailable) tempF[i] = true;
    }
    setArr([...tempF]);

    let tempP = [];
    for (let i = 0; i < data.patientExperience.length; i++) {
      if (data.patientExperience[i].isAvailable) tempP[i] = true;
    }
    setArr1([...tempP]);

    data.isMalpracticeInsurance = data.isMalpracticeInsurance
      ? "true"
      : "false";
    data.isCPRCertification = data.isCPRCertification ? "true" : "false";
    data.isTbTest = data.isTbTest ? "true" : "false";

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
      malpracticeExp: data.malpracticeExp,
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

  const handleSave = async (obj, loaderValue) => {
    let reqData = {};

    let result = await trigger(obj);
    let values = { ...getValues(), ...otherFormData };

    if (loaderValue === 2) {
      let DirError = false;
      let obj = {
        // profileUrl: otherFormData.profileUrl
        //   ? ""
        //   : "Please add profile picture",
        drivingLicensePhotoUrl:
          otherFormData.drivingLicensePhotoUrl.length === 0
            ? "Driver's License is required"
            : "",
        // resumeUrl: otherFormData.resumeUrl ? "" : "Resume is required",
      };
      DirError = otherFormData.drivingLicensePhotoUrl.length === 0;
      setOtherFormErrors({ ...obj });

      if (DirError) return;
      // if (!otherFormData.profileUrl) return;
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

      if (tempF.length) {
        for (let i = 0; i < tempF.length; i++) {
          if (!tempF[i].startTime) {
            obj = {
              ...obj,
              facilityExperience: "Facility experience is required",
            };
            facError = true;
          }
        }
      }

      // patient error
      let patErr = false;
      let tempP = values.patientExperience.filter(
        (exp) => exp.isAvailable === true,
      );

      if (tempP.length) {
        for (let i = 0; i < tempP.length; i++) {
          if (!tempP[i].startTime) {
            obj = {
              ...obj,
              patientExperience: "Patient experience is required",
            };
            patErr = true;
          }
        }
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
      id: initData.id,
      userId: initData?.userId?.id,
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

    data.dateOfBirth = data.dateOfBirth
      ? `${new Date(data.dateOfBirth)?.getTime()}`
      : null;
    data.tbTestExpiryDate = data.tbTestExpiryDate
      ? `${new Date(data.tbTestExpiryDate)?.getTime()}`
      : null;
    data.cprExpiryDate = data.cprExpiryDate
      ? `${new Date(data.cprExpiryDate)?.getTime()}`
      : null;

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

    // If fileds are empty then filter them out
    data.certificationDetails = data?.certificationDetails?.filter(
      (certi) => certi.name && (certi.description || certi.receivedYear),
    );
    data.specialityDetails = data?.specialityDetails?.filter(
      (spec) => spec.name && (spec.description || spec.receivedYear),
    );

    if (data.facilityCertificates) {
      data.facilityCertificates = data?.facilityCertificates?.filter(
        (fc) => fc,
      );
    }

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
    });
  };

  const handleLicsenseAppend = () => {
    if (!errors?.licenseDetails) {
      licAppend({});
    } else {
      toast.error("Please complete the previous field - License Details");
    }
  };

  const handleDownloadProfile = async () => {
    setDownloadProfileLoader(true);
    console.log("true: ", true);
    try {
      const response = await api(CLINICIAN_PROFILE_DOWNLOAD, {}, null, {
        clinicianId: user.id,
      });

      // If the status is 200, the file is ready for download
      const resBlob = response.data;
      const url = window.URL.createObjectURL(resBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${user.userId.email}-profile-details.zip`; // File name
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Error while downloading profile:", error);
    } finally {
      setDownloadProfileLoader(false);
    }
  };

  return (
    <>
      <div className="general-content">
        <Form>
          <fieldset>
            <div className="first-block">
              <div className="general-photo-main m-0 p-0 border-0">
                <div className="picture-block m-0 p-0 border-0">
                  <h5>Profile picture</h5>
                  <p>
                    Select a high quality primary profile image to represent
                    yourself
                  </p>
                  <div className="uploaded-pic clinician">
                    <UploadFile
                      // hideRemoveBtn={isSubadmin}
                      serverFiles={
                        otherFormData.profileUrl
                          ? [otherFormData.profileUrl]
                          : []
                      }
                      multiple={false}
                      id="profileUrl"
                      name={"profileUrl"}
                      accept={ACCEPT_IMAGE}
                      folder="images"
                      max={1}
                      callbackFn={fileCallbackFn}
                      deleteCallbackFn={deleteCallbackFn}
                      // disabled={isSubadmin}
                      onFileRemove={handleFileRemove}
                    />
                  </div>
                  <FormError msg={otherFormErrors?.["profileUrl"]} />
                </div>

                <div className="d-flex align-items-center">
                  <FormButton
                    className="pt-btn btn-primary pt-btn-small p-3"
                    type="button"
                    disabled={downloadProfileLoader}
                    loader={downloadProfileLoader}
                    label={
                      <>
                        <Download />
                        <span className="ms-1">Download Profile</span>
                      </>
                    }
                    onClick={handleDownloadProfile}
                  />
              </div>

              </div>
            </div>
            <div className="primary-contact">
              <h5>Email</h5>
              <p>
                <b>{initData?.userId?.email}</b>
              </p>
            </div>
            <div className="primary-contact">
              <h5>{REFERENCEBY}</h5>
              <p>
                <b>{initData?.referenceFrom}</b>
              </p>
            </div>
            <div className="primary-contact">
              <h5>General information</h5>

              <Row>
                <Col md={6}>
                  <FormInput
                    // disabled={true}
                    divClassName="form-group pr-12"
                    name={"firstName"}
                    id={"firstName"}
                    type={"text"}
                    label={"First Name :"}
                    register={register}
                    rules={FirstNameRules}
                    errors={errors}
                    autoFocus={true}
                    // disabled={isSubadmin}
                  />
                </Col>
                <Col md={6}>
                  <FormInput
                    // isDisabled={true}
                    divClassName="form-group pl-12"
                    name={"lastName"}
                    id={"lastName"}
                    type={"text"}
                    label={"Last Name :"}
                    register={register}
                    rules={LastNameRules}
                    errors={errors}
                    // disabled={isSubadmin}
                  />
                </Col>
                <Col md={6}>
                  <FormSelect
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
                    // isDisabled={isSubadmin} 
                  />
                </Col>
                <Col md={6}>
                  <FormDatePicker
                    // disabled={true}
                    divClassName="form-group pl-12"
                    label={"Date of birth:"}
                    name={"dateOfBirth"}
                    id={"dateOfBirth"}
                    errors={errors}
                    trigger={trigger}
                    rules={DOBRules}
                    control={control}
                    maxDate={new Date()}
                    inlineIcon={true}
                    // disabled={isSubadmin}
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
                    // disabled={isSubadmin}
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
                    // isDisabled={true}
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
                    // isDisabled={isSubadmin} 
                  />
                </Col>
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
                    // isDisabled={isSubadmin} 
                    label="Clinician type:"
                  />
                </Col>
                <Col md={6}>
                  <div className="form-group pl-12">
                    <label>Resume (required):</label>
                 <UploadFile
                    // hideRemoveBtn={isSubadmin}
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
                      deleteCallbackFn={deleteCallbackFn}
                      onFileRemove={handleFileRemove}
                      // isDisabled={isSubadmin} 
                      // disabled={isSubadmin}
                    />

                    <FormError msg={otherFormErrors?.["resumeUrl"]} />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group license">
                    <label>Drivers License (required):</label>
                    <div className="signup-upload-file">
                      <UploadFile
                        hideRemoveBtn={isSubadmin}
                        serverFiles={otherFormData.drivingLicensePhotoUrl}
                        gridView={false}
                        multiple={true}
                        label={"Click here to upload file"}
                        icon={<Upload />}
                        id="drivingLicensePhotoUrl"
                        name={"drivingLicensePhotoUrl"}
                         accept={[ACCEPT_IMAGE, ...ACCEPT_PDF, ...ACCEPT_DOC]}
                        // accept={ACCEPT_IMAGE}
                        folder="images"
                        max={2}
                        callbackFn={fileCallbackFn}
                        deleteCallbackFn={deleteCallbackFn}
                        onFileRemove={handleFileRemove}
                        // isSubadmin={isSubadmin}
                        // disabled={isSubadmin}
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
                    // isDisabled={isSubadmin} 
                      // disabled={isSubadmin}
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
                    // disabled={isSubadmin}
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
                    // disabled={isSubadmin}
                    // disabled={true}
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
                    handleSave(
                      ["emrgencyContactName", "emrgencyContactPhone"],
                      3,
                    )
                  }
                />
              </div>
            </div>
            <div className="primary-contact">
              <h5>Home address</h5>
              <Row>
                <Col md={12}>
                  <div className="form-group">
                    {/* {isSubadmin ? (<Input
                      setValue={setValue}
                      register={register}
                      trigger={trigger}
                      value={getValues("homeAddress1")}
                      addressLine="homeAddress1"
                      addressCity="homeAddressCity"
                      addressZipcode="homeAddressZipCode"
                      addressState="homeAddressState"
                      error={errors["homeAddress1"]}
                      disabled={isSubadmin}
                      placeholder="Address Line 1"
                    />) : ( */}
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
                      disabled={isSubadmin}
                      placeholder="Address Line 1"
                    />
                    {/* )} */}
                  </div>
                  <FormInput
                    name={"homeAddress2"}
                    id={"homeAddress2"}
                    type={"text"}
                    register={register}
                    rules={{}}
                    errors={errors}
                    // disabled={isSubadmin}
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
                    // isDisabled={isSubadmin} 
                    // disabled={isSubadmin}
                  />
                </Col>
                <Col md={4}>
                  <FormSelect
                    // isDisabled={isSubadmin} 
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
                    // disabled={isSubadmin}
                  />
                </Col>
              </Row>
              <div className="text-center mt-4">
              {/* {!isSubadmin && ( */}
                <FormButton
                  className="pt-btn btn-primary pt-btn-small"
                  type={"button"}
                  label={"Save"}
                  loader={loader === 4}
                  onClick={() => handleSave(fourthSection, 4)}
                />
                {/* )} */}
              </div>
            </div>
            <div className="primary-contact">
              <h5>Education</h5>

              <Row>
                <Col md={12}>
                  <FormInput
                    name={"educationSchool"}
                    id={"educationSchool"}
                    type={"text"}
                    label={"PT, PTA, OT, OTA, SLP school:"}
                    register={register}
                    rules={EducationRules}
                    // disabled={isSubadmin}
                    errors={errors}
                  />
                </Col>
                <Col md={6}>
                  <FormSelect
                    // isDisabled={true}
                    divClassName={"form-group pr-12"}
                    options={education}
                    placeholder="Select"
                    control={control}
                    name={"graduationYear"}
                    errors={errors}
                    optionValue="value"
                    optionLabel="label"
                    rules={GraduationYearRules}
                    // isDisabled={isSubadmin} 
                    label="Graduation year:"
                  />
                </Col>
                <Col md={6}>
                  <FormSelect
                    // isDisabled={true}
                    divClassName={"form-group pl-12"}
                    options={experience}
                    placeholder="Select"
                    control={control}
                    name={"totalPracticYears"}
                    errors={errors}
                    optionValue="value"
                    optionLabel="label"
                    // isDisabled={isSubadmin} 
                    rules={YearsOfPracticeRules}
                    label="Years of practice:"
                  />
                </Col>
              </Row>
              <div className="text-center mt-4">
              {/* {!isSubadmin && ( */}
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
              {/* )} */}
              </div>
            </div>

            <div className="primary-contact">
              <h5>Professional license</h5>

              <div className="divider-form">
                {licFields?.map((field, index) => {
                  return (
                    <Row key={field.id}>
                      <Col md={6}>
                        <FormSelect
                          // isDisabled={true}
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
                          // isDisabled={isSubadmin} 
                          label="State:"
                        />
                      </Col>
                      <Col md={6}>
                        <FormInput
                          // disabled={true}
                          name={`licenseDetails[${index}].licenseNumber`}
                          id={`licenseDetails[${index}].licenseNumber`}
                          type={"text"}
                          label={"License #:"}
                          register={register}
                          rules={LicenseNumberRules}
                          errors={errors}
                          // disabled={isSubadmin}
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
                            errors["licenseDetails"]?.[index]?.[
                              "licenseExpDate"
                            ]?.message
                          }
                          errors={errors}
                          rules={PLExpireDateRules}
                          control={control}
                          trigger={trigger}
                          divClassName="form-group pr-12"
                          // disabled={isSubadmin}
                          minDate={new Date()}
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
                {certiFields?.map((certi, index) => {
                  return (
                    <Row key={certi.id}>
                      <Col md={6}>
                        <FormInput
                          // isDisabled={isSubadmin} 
                          // disabled={isSubadmin}
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
                          // disabled={true}
                        />
                      </Col>
                      <Col md={6}>
                        <FormSelect
                          // isDisabled={true}
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
                          // isDisabled={isSubadmin} 
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
                          // disabled={isSubadmin}
                        />
                      </Col>
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
                {boardcertiFields.map((certi, index) => {
                  return (
                    <Row key={certi.id}>
                      <Col md={6}>
                        <FormSelect
                          // isDisabled={true}
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
                          // isDisabled={isSubadmin} 
                        />
                      </Col>
                      <Col md={6}>
                        <FormSelect
                          // isDisabled={true}
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
                          // isDisabled={isSubadmin} 
                        />
                      </Col>
                      <Col md={12}>
                        <FormInput
                          // disabled={true}
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
                          // disabled={isSubadmin}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </div>

              <div className="text-center mt-4">
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
                            // disabled={isSubadmin}
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
                  <h5 className="mb-2">NPI number (optional)</h5>
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
                    type={"text"}
                    register={register}
                    rules={{}}
                    errors={errors}
                    // disabled={isSubadmin}
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
                      // disabled={true}
                      name={"isMalpracticeInsurance"}
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      register={register}
                      rules={MAlRules}
                      errors={errors}
                      divClassName="pt-radio"
                      // disabled={isSubadmin}
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
                      // disabled={isSubadmin}
                    />
                  </div>

                  <div className="form-group">
                    <label> PDF / image :</label>
                    <UploadFile
                      // disabled={true}
                      // isDisabled={isSubadmin} 
                      // disabled={isSubadmin}
                      hideRemoveBtn={isSubadmin}
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
                      deleteCallbackFn={deleteCallbackFn}
                      onFileRemove={handleFileRemove}
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
                  <h5 className="mb-2">CPR</h5>
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
                      // isDisabled={isSubadmin} 
                      // disabled={isSubadmin}
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
                    // disabled={isSubadmin}
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
                      deleteCallbackFn={deleteCallbackFn}
                      onFileRemove={handleFileRemove}
                      // disabled={isSubadmin}
                      // hideRemoveBtn={isSubadmin}
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
                      // disabled={isSubadmin}
                    />
                  </div>
                  <FormDatePicker
                    // disabled={true}
                    // minDate={new Date()}
                    dateFormat={"MM/yyyy"}
                    showMonthYearPicker={true}
                    label={"Test date:"}
                    trigger={trigger}
                    name={"tbTestExpiryDate"}
                    id={"tbTestExpiryDate"}
                    divClassName={"form-group"}
                    errors={errors}
                    rules={{}}
                    control={control}
                    // disabled={isSubadmin}
                  />
                  <div className="form-group">
                    <label> PDF / image (optional):</label>
                    <UploadFile
                      // disabled={true}
                      // hideRemoveBtn={isSubadmin}
                      // disabled={isSubadmin}
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
                      deleteCallbackFn={deleteCallbackFn}
                      onFileRemove={handleFileRemove}
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
              {/* <p>
                At Purple PRN, we have opportunities for both vaccinated and
                unvaccinated clinicians. However, several facilities require
                clinicians to be partially or fully vaccinated. To match you
                with the best positions, please let us know your current
                vaccination status. Note that you can update this status in the
                future.
              </p> */}
              <Row>
                <Col md={6}>
                  <FormSelect
                  // isDisabled={isSubadmin} 
                    // isDisabled={true}
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
                        // disabled={isSubadmin}
                        // hideRemoveBtn={isSubadmin}
                        serverFiles={otherFormData.covidTestPictureUrl}
                        gridView={false}
                        multiple={true}
                        label={"Click here to upload file"}
                        icon={<Upload />}
                        id="covidTestPictureUrl"
                        accept={[...ACCEPT_IMAGE_PDF, ...ACCEPT_IMAGE]}
                        folder="docs"
                        max={2}
                        callbackFn={fileCallbackFn}
                        deleteCallbackFn={deleteCallbackFn}
                        onFileRemove={handleFileRemove}
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
                    {fEFields.map((day, index) => {
                      return (
                        <div
                          className="days"
                          key={day.id}>
                          <FormCheckbox
                          //  disabled={isSubadmin}
                            // disabled={true}
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
                            rules={{
                              validate: {
                                atLeastOneChecked: () => {
                                  return arr.some((isChecked) => isChecked);
                                },
                              },
                            }}
                            errors={errors}
                          />

                          <div className="weektiming">
                            <FormSelect
                              // isDisabled={!arr[index] && isSubadmin} 
                              // disabled={isSubadmin}
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
                    {pEFields.map((day, index) => {
                      return (
                        <div
                          className="days"
                          key={day.id}>
                          <FormCheckbox
                          // isDisabled={isSubadmin} 
                          // disabled={isSubadmin}
                            // disabled={true}
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
                            rules={{
                              validate: {
                                atLeastOneChecked: () => {
                                  return arr1.some((isChecked) => isChecked);
                                },
                              },
                            }}
                            errors={errors}
                          />

                          <div className="weektiming">
                            <FormSelect
                              // isDisabled={!arr1[index] && isSubadmin} 
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
                <Col md={6}>
                  <h5>Available Days</h5>
                  <div className="days-available">
                    {availableDaysFields.map((day, index) => (
                      <div
                        className="days"
                        key={day.id}>
                        <FormCheckbox
                          // disabled={isSubadmin}
                          name={`availableWeekDays[${day.value}]`}
                          id={`availableWeekDays[${day.value}]`}
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
                        "availableWeekdays",
                        "patientExperience",
                      ],
                      14,
                    )
                  }
                />
              </div>
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
}

export default AdminClinicianGeneralInformation;
