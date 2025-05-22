import { api } from "api/Api";
import { useContext, useEffect, useState } from "react";
import { isEmpty } from "radash";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Form } from "reactstrap";
import ReactGA from "react-ga4";

import SuccessfullSignup from "component/modals/SuccesfullSignUp";
import { DELETE_FILE_URL, EDIT_CLINICIAN_DATA, GET_LOGIN_DATA_URL } from "constants/ApiUrls";
import { CERTI_SPECIALITY_DEFAULT_FIELDS, RESPONSE_CREATED, RESPONSE_OK, FBEventCookies } from "constants/AppConstants";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import SignUpFacilityFirst from "../signUpFacility/SignUpFacilityFirst";
import { facExp, patientExp, weekDays } from "./HourlyConstant";
import SignUpClinicianFifth from "./SignUpClinicianFifth";
import SignUpClinicianFourth from "./SignUpClinicianFourth";
import SignUpClinicianSecond from "./SignUpClinicianSecond";
import SignUpClinicianThird from "./SignUpClinicianThird";

export default function SignupClinicianForm({ setCurStep, curStep }) {
  // initialize hook-form
  const {
    register,
    handleSubmit,
    trigger,
    control,
    resetField,
    unregister,
    setValue,
    getValues,
    formState: { errors, dirtyFields, isValid },
    watch,
    setError,
    reset,
    clearErrors,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      licenseDetails: [],
      certificationDetails: CERTI_SPECIALITY_DEFAULT_FIELDS,
      specialityDetails: CERTI_SPECIALITY_DEFAULT_FIELDS,
      facilityCertificates: [""],
      facilityExperience: facExp,
      patientExperience: patientExp,
      knownLanuages: [],
    },
  });
  const location = useLocation();
  const PageTitle = document?.title;
  ReactGA.send({
    hitType: "pageview",
    page: location?.pathname,
    title: PageTitle,
  });
  window.dataLayer.push({
    event: "pageview",
    page: {
      title: PageTitle,
      url: window.location.href,
      path: window.location.pathname,
    },
  });
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);
  const [loader, setLoader] = useState(false); //used for disabling and showing loader in button
  // used for storing all uploaded images
  const [otherFormData, setOtherFormData] = useState({
    drivingLicensePhotoUrl: [],
    covidTestPictureUrl: [],
    // resumeUrl: [],
  });
  const [showError, setShowError] = useState(false);
  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [otherFormErrors, setOtherFormErrors] = useState({}); // used for storing all images error
  const [successfull, setSuccessfull] = useState(false);
  const commonProps = { register, errors, setCurStep, trigger, curStep, user }; //common props used by all steps
  const [filesToRemove, setFilesToRemove] = useState([]);
  const handleFileRemove = (fileUrl) => {
    setFilesToRemove((prevFiles) => [...prevFiles, fileUrl]);
  };

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
    if (isEmpty(user)) return;
    let data = {
      ...user,
      ...user?.clinicianId,
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
    } else if (!data.licenseDetails || data.licenseDetails.length === 0) {
      data.licenseDetails = [{}];
    }

    if (!data.certificationDetails || data.certificationDetails.length === 0) {
      data.certificationDetails = CERTI_SPECIALITY_DEFAULT_FIELDS;
    }
    if (!data.specialityDetails || data.specialityDetails.length === 0) {
      data.specialityDetails = CERTI_SPECIALITY_DEFAULT_FIELDS;
    }

    if (!data.facilityCertificates || !data.facilityCertificates?.length) {
      data.facilityCertificates = [""];
    }

    let tempF = [];
    for (let i = 0; i < data.facilityExperience?.length; i++) {
      if (data.facilityExperience[i].isAvailable) tempF[i] = true;
    }
    if (data?.facilityExperience?.length === 0) {
      data.facilityExperience = facExp;
    } 

    // In old users we need to add home health if it is not present
    if (data?.facilityExperience?.length && !data?.facilityExperience.some(e => e.day === "Home Health")) {
      data.facilityExperience = [data?.facilityExperience[0], {
        day: "Home Health",
      }, ...data?.facilityExperience.slice(1)]
    }
    setArr([...tempF]);

    let tempP = [];
    for (let i = 0; i < data.patientExperience?.length; i++) {
      if (data.patientExperience[i].isAvailable) tempP[i] = true;
    }
    if (data?.patientExperience?.length === 0) {
      data.patientExperience = patientExp;
    }
    setArr1([...tempP]);

    data.isMalpracticeInsurance = data.isMalpracticeInsurance
      ? "true"
      : data.isMalpracticeInsurance === null
      ? null
      : "false";
    data.isCPRCertification = data.isCPRCertification
      ? "true"
      : data.isCPRCertification === null
      ? null
      : "false";
    data.isTbTest = data.isTbTest
      ? "true"
      : data.isTbTest === null
      ? null
      : "false";
    data.licenseDetails =
      data?.licenseDetails?.length > 0 ? data?.licenseDetails : [{}];
    data.certificationDetails =
      data?.certificationDetails?.length > 0
        ? data?.certificationDetails
        : CERTI_SPECIALITY_DEFAULT_FIELDS;
    data.specialityDetails =
      data?.specialityDetails?.length > 0
        ? data?.specialityDetails
        : CERTI_SPECIALITY_DEFAULT_FIELDS;

    reset({ ...data });
    setOtherFormData({
      profileUrl: data.profileUrl,
      cprPictureUrl: data.cprPictureUrl,
      drivingLicensePhotoUrl: data.drivingLicensePhotoUrl,
      covidTestPictureUrl: data.covidTestPictureUrl,
      resumeUrl: data.resumeUrl,
      tbTestPictureUrl: data.tbTestPictureUrl,
      malpracticeUrl: data?.malpracticeUrl,
    });
  }, [user]);

  const getUserObj = () => {
    api(GET_LOGIN_DATA_URL, {}).then((res) => {
      if (res.status === RESPONSE_OK) {
        setUser(res.data.data);
        setIsUserAuthenticated(true);
      } else {
        setUser({});
        setIsUserAuthenticated(false);
      }
    });
  };

  /**
   * fileCallbackFn
   * @param {array} res
   * @param {string} name field name
   * @param {Boolean} multiple if user can upload multiple files
   */
  const fileCallbackFn = (res, name, multiple) => {
    let setData = multiple ? [...otherFormData[name], ...res] : res[0];

    setOtherFormData({
      ...otherFormData,
      [name]: setData,
    });
  };

  /**
   * remove file callback function
   * @param {array} respData array of remaining files
   * @param {string} name of field
   */
  const deleteCallbackFn = (respData, name) => {
    setOtherFormData({ ...otherFormData, [name]: respData });
  };

  const callAPI = async (data, isLast = false) => {
    data = { ...data, ...otherFormData }; // merge other data with hook-form data

    if (data.referenceByOther) data.referenceBy = data.referenceByOther;

    // delete all data that are not needed by server
    delete data.iAgree;
    delete data.confirmPassword;
    delete data.confirmEmail;
    delete data.referenceByOther;

    // convert js date to unix date used by server
    data.dateOfBirth = data?.dateOfBirth
      ? new Date(String(data?.dateOfBirth)).getTime()
      : "";
    data.tbTestExpiryDate = data.tbTestExpiryDate
      ? new Date(String(data?.tbTestExpiryDate)).getTime().toString()
      : "";
    data.cprExpiryDate = data.cprExpiryDate
      ? new Date(String(data?.cprExpiryDate)).getTime().toString()
      : "";
    data.malpracticeExp = data.malpracticeExp
      ? new Date(data?.malpracticeExp).getTime().toString()
      : "";

    if (data.licenseDetails && data.licenseDetails.length > 0) {
      const tempLicenseDetails = data.licenseDetails.filter(
        (detail) => detail.licenseNumber && detail?.state
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
      (certi) => certi.name && (certi.description || certi.receivedYear)
    );

    data.specialityDetails = data?.specialityDetails?.filter(
      (spec) => spec.name && (spec.description || spec.receivedYear)
    );

    if (data.facilityCertificates) {
      data.facilityCertificates = data?.facilityCertificates?.filter(
        (fc) => fc
      );
    }

    const id = user?.clinicianId?.id;
    const userId = user?.id;
    const roles = user?.roles;

    let submitData = {
      ...data,
      id,
      userId,
      roles,
      email: data?.email?.toLowerCase(),
      dateOfBirth: data?.dateOfBirth ? String(data?.dateOfBirth) : "",
      tbTestExpiryDate: String(data.tbTestExpiryDate),
      cprExpiryDate: String(data.cprExpiryDate),
      availableWeekDays: {
        monday: data.availableWeekDays?.monday || false,
        tuesday: data.availableWeekDays?.tuesday || false,
        wednesday: data.availableWeekDays?.wednesday || false,
        thursday: data.availableWeekDays?.thursday || false,
        friday: data.availableWeekDays?.friday || false,
        saturday: data.availableWeekDays?.saturday || false,
        sunday: data.availableWeekDays?.sunday || false,
      },
    };

    if (isLast) {
      submitData = {
        ...submitData,
        isFromSignup: true,
        isSignupCompleted: true,
        signupStageCount: 4,
        ...FBEventCookies,
      }
    }

    setLoader(true);
    await api(EDIT_CLINICIAN_DATA, submitData)
      .then((res) => {
        if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
          // Call remove-file API for all files in filesToRemove state after successful save
          filesToRemove.forEach((fileUrl) => {
            api(DELETE_FILE_URL, { url: [fileUrl] }).then((res) => {
              if (
                res.status === RESPONSE_OK ||
                res.status === RESPONSE_CREATED
              ) {
                console.log(`File ${fileUrl} removed successfully`);
              } else {
                console.error(`Error removing file ${fileUrl}`);
              }
            });
          });

          // Clear the filesToRemove state after successful deletion
          setFilesToRemove([]);
          if (isLast) {
            if ((user && user?.id) || isUserAuthenticated) {
              getUserObj();
              setSearchParams({ completed: 1 });
              setSuccessfull(true);

              navigate("/clinician/signup/finalStep");
            } else {
             
              navigate("/");
            }
          } else {
            setUser((prev) => {
              return {
                ...prev,
                clinicianId: res.data.data,
              };
            });
          }
        }
        setLoader(false);
      })
      .catch(() => {});
  };

  const onSubmit = async () => {
    const isMalpracticeYes = watch("isMalpracticeInsurance") === "true";
    const isMalpracticeNo = watch("isMalpracticeInsurance") === "false";
    
    let data = getValues();
    let isValidateFields = [
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
      "referenceBy",
      "educationSchool",
      "graduationYear",
      "totalPracticYears",
    ];
  
    if (isMalpracticeYes) {
      isValidateFields.push("malpracticeExp", "malpracticeUrl");
    }
  
     if (data.isCPRCertification === "true") {
        setShowError(true);
        isValidateFields.push("cprExpiryDate", "cprPictureUrl");
      }
   
    const isStepValid = await trigger(isValidateFields);
  
    if (isMalpracticeYes && !isStepValid) {
      isValidateFields.push("malpracticeExp", "malpracticeUrl");
      setShowError(true);
    } else if (isMalpracticeNo) {
      clearErrors("malpracticeExp");
      setShowError(false);
    }
  
    if (!isStepValid) {
      return;
    }
  
    // File validation
    let obj = {
      profileUrl: otherFormData?.profileUrl ? "" : "Profile picture is required",
      drivingLicensePhotoUrl:
        otherFormData?.drivingLicensePhotoUrl.length === 0
          ? "Driver's License is required"
          : "",
      resumeUrl: otherFormData?.resumeUrl ? "" : "Resume is required",
    };
  
    // Facility experience validation
    let facError = false;
    let tempF = data.facilityExperience.filter(
      (exp) => exp.isAvailable === true
    );
  
    if (tempF?.length) {
      for (let i = 0; i < tempF.length; i++) {
        if (!tempF[i].startTime) {
          obj.facilityExperience = "Facility experience is required";
          facError = true;
        }
      }
    }
  
    // Patient experience validation
    let patErr = false;
    let tempP = data?.patientExperience?.filter(
      (exp) => exp?.isAvailable === true
    );
  
    if (tempP.length) {
      for (let i = 0; i < tempP.length; i++) {
        if (!tempP[i].startTime) {
          obj.patientExperience = "Patient experience is required";
          patErr = true;
        }
      }
    }
  
    setOtherFormErrors({ ...obj });
  
    // If any other error exists, stop submission
    if (
      !otherFormData?.profileUrl ||
      otherFormData?.drivingLicensePhotoUrl.length === 0 ||
      !otherFormData?.resumeUrl ||
      facError ||
      patErr
    )
      return;
  

    if (isStepValid && otherFormData) {
      callAPI(data, true);
    }
  };
  
  const validate = async () => {
    try {

      const category = 'User Interaction'; 
    const action = 'Click'; 
    const label = 'Save'; 
  
    window.dataLayer.push({
      event: 'submit-form',
      eventProps: {
        category: category,
        action: action,
        label: label
      }
    });
      let data = getValues();

      let isValidateFields = [
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
        "referenceBy",
        "educationSchool",
        "graduationYear",
        "totalPracticYears",
      ];
      if (data.isCPRCertification === "true") {
        setShowError(true);
        isValidateFields.push("cprExpiryDate", "cprPictureUrl");
      }
      if (data.isMalpracticeInsurance === null) {
        isValidateFields.push("isMalpracticeInsurance");
      }
      if (data.isMalpracticeInsurance === "true") {
        isValidateFields.push("malpracticeExp", "malpracticeUrl");
      }

      if (data.isTBTest) {
        isValidateFields.push("tbTestDate", "tbTestResult", "tbTestDocument");
      }
     
      // const isStepValid = await trigger(isValidateFields);

      // if (!isStepValid) {
      //   console.log("its not validate");
      // }

     

      let obj = {
        profileUrl: otherFormData?.profileUrl
          ? ""
          : "Profile picture is required",
        drivingLicensePhotoUrl:
          otherFormData?.drivingLicensePhotoUrl?.length === 0
            ? "Driver's License is required"
            : "",
        resumeUrl: otherFormData?.resumeUrl ? "" : "Resume is required",
      };

      // facility exp validation
     
      let tempF =
        data?.facilityExperience &&
        data?.facilityExperience.filter((exp) => exp?.isAvailable === true);
      tempF = tempF?.filter((exp) => exp?.startTime);

      if (!tempF?.length) {
        obj = { ...obj, facilityExperience: "Facility experience is required" };
      }

      // patient exp validation
      let tempP =
        data?.patientExperience &&
        data?.patientExperience.filter((exp) => exp?.isAvailable === true);

      tempP = tempP?.filter((exp) => exp?.startTime);

      if (!tempP.length) {
        obj = { ...obj, patientExperience: "Patient experience is required" };
      }

      let tempW = Object.values(data.availableWeekDays).some(
        (checked) => checked === true
      );

      if (!tempW) {
        obj = {
          ...obj,
          availableWeekDays: "At least one weekday must be selected.",
        };
      }

    setOtherFormErrors(obj);
    ReactGA.event({
      category: 'Signup',
      action: 'Clicked Save Button',
      label: 'Saved Clinician Signup Form',
    });
  
  } catch (error) {
    console.log(error, "error");
  }
 
  };

  useEffect(() => {
    if (user?.id && isUserAuthenticated) {
      setCurStep(2);
    } else {
      setCurStep(2);
    }
  }, []);

  useEffect(() => {
    if (curStep !== 1 && (isEmpty(user) || !user?.id)) {
      setCurStep(1);
    }
  }, [user, curStep]);

  return (
    <Form
      noValidate
      className="form-group-third"
      onSubmit={handleSubmit(onSubmit)}
    >
      {(!user?.id || !isUserAuthenticated) && curStep === 1 && (
        <SignUpFacilityFirst
          {...commonProps}
          dirtyFields={dirtyFields}
          watch={watch}
          control={control}
          isValid={isValid}
          isClinician={true}
        />
      )}
      {curStep === 2 && (
        <>
          <SignUpClinicianSecond
            {...commonProps}
            control={control}
            resetField={resetField}
            unregister={unregister}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
            otherFormData={otherFormData}
            formData={getValues()}
            callAPI={callAPI}
            loader={loader}
            curStep={2}
            trigger={trigger}
          />
          <SignUpClinicianThird
            {...commonProps}
            trigger={trigger}
            control={control}
            fileCallbackFn={fileCallbackFn}
            deleteCallbackFn={deleteCallbackFn}
            otherFormData={otherFormData}
            watch={watch}
            error={errors}
            setError={setError}
            setValue={setValue}
            formData={getValues()}
            callAPI={callAPI}
            loader={loader}
            filesToRemove={handleFileRemove}
            showError={showError}
            setShowError={setShowError}
            curStep={3}
          />
          <SignUpClinicianFourth
            {...commonProps}
            control={control}
            fileCallbackFn={fileCallbackFn}
            deleteCallbackFn={deleteCallbackFn}
            otherFormData={otherFormData}
            watch={watch}
            error={errors}
            setError={setError}
            setValue={setValue}
            formData={getValues()}
            callAPI={callAPI}
            loader={loader}
            showError={showError}
            setShowError={setShowError}
            filesToRemove={handleFileRemove}
          />
          <SignUpClinicianFifth
            {...commonProps}
            control={control}
            loader={loader}
            watch={watch}
            fileCallbackFn={fileCallbackFn}
            otherFormErrors={otherFormErrors}
            deleteCallbackFn={deleteCallbackFn}
            otherFormData={otherFormData}
            resetField={resetField}
            getValues={getValues}
            onSubmit={() => onSubmit()}
            validate={() => validate()}
            setValue={setValue}
            filesToRemove={handleFileRemove}
          />
        </>
      )}
      {/* {curStep === 3 && (
        <SignUpClinicianThird
          {...commonProps}
          trigger={trigger}
          control={control}
          fileCallbackFn={fileCallbackFn}
          deleteCallbackFn={deleteCallbackFn}
          otherFormData={otherFormData}
          watch={watch}
          error={errors}
          setError={setError}
          setValue={setValue}
          formData={getValues()}
          callAPI={callAPI}
          loader={loader}
          filesToRemove={handleFileRemove}
        />
      )}
      {curStep === 4 && (
        <SignUpClinicianFourth
          {...commonProps}
          control={control}
          fileCallbackFn={fileCallbackFn}
          deleteCallbackFn={deleteCallbackFn}
          otherFormData={otherFormData}
          watch={watch}
          error={errors}
          setError={setError}
          setValue={setValue}
          formData={getValues()}
          callAPI={callAPI}
          loader={loader}
          filesToRemove={handleFileRemove}
        />
      )}
      {curStep === 5 && (
        <SignUpClinicianFifth
          {...commonProps}
          control={control}
          loader={loader}
          watch={watch}
          fileCallbackFn={fileCallbackFn}
          otherFormErrors={otherFormErrors}
          deleteCallbackFn={deleteCallbackFn}
          otherFormData={otherFormData}
          resetField={resetField}
          getValues={getValues}
          validate={() => validate()}
          setValue={setValue}
          filesToRemove={handleFileRemove}
        />
      )} */}

      {/* <SuccessfullSignup
        isClinician={true}
        isOpen={successfull}
        setIsOpen={setSuccessfull}
      /> */}
    </Form>
  );
}
