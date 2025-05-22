import { api } from "api/Api";
import SuccessfullSignup from "component/modals/SuccesfullSignUp";
import {
  DELETE_FILE_URL,
  GET_LOGIN_DATA_URL,
  UPDATE_FACILITY_URL,
} from "constants/ApiUrls";
import SignUpFacilityFirst from "./SignUpFacilityFirst";
import SignUpFacilitySecond from "./SignUpFacilitySecond";
import SignUpFacilityThird from "./SignUpFacilityThird";
import SignUpFacilityFourth from "./SignUpFacilityFourth";
import {
  ADDRESSES_DEFAULT_FIELDS,
  RESPONSE_CREATED,
  RESPONSE_OK,
  FBEventCookies,
} from "constants/AppConstants";
import { isEmpty, omit } from "radash";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import AuthContext from "utils/context/AuthContext";
import UserContext from "utils/context/UserContext";
import { findAndReplace, getOtherDataFromList } from "utils/Utils";
import {
  dressCodeOptions,
  facilityTypeOptions,
  patientTypeOptions,
} from "../signUpClinician/HourlyConstant";

export default function SignupFacilityForm({ setCurStep, curStep }) {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    resetField,
    unregister,
    setValue,
    formState: { errors, dirtyFields },
    watch,
    formState,
    getValues,
    reset,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      dressCode: [],
      facilityType: [],
      patientsType: [],
      emailsForInvoice: [],
      frontOfficePersonPhone: "",
      allowSMSNotifications: true,
      addresses: ADDRESSES_DEFAULT_FIELDS,
    },
    shouldFocusError: false,
  });
  const { user, setUser } = useContext(UserContext);
  const { isUserAuthenticated, setIsUserAuthenticated } =
    useContext(AuthContext);

  const [loader, setLoader] = useState(false);
  const [profileImg, setProfileImg] = useState(""); //uploaded profile image
  const [facility, setFacility] = useState([]); //uploaded facility images
  const [otherFormErrors, setOtherFormErrors] = useState({}); //images error
  const [canFocus, setCanFocus] = useState(true);
  const [successfull, setSuccessfull] = useState(false);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const handleFileRemove = (fileUrl) => {
    setFilesToRemove((prevFiles) => [...prevFiles, fileUrl]);
  };

  const onError = () => {
    setCanFocus(true);
  };
  const handleUploadedImages = (data, type) => {
    type === "profile"
      ? setProfileImg(data[0])
      : setFacility([...facility, ...data]);
  };

  useEffect(() => {
    if (!isEmpty(user)) setDataToForm();
  }, []);

  const setDataToForm = () => {
    // merge user data and facility data
    let data = {
      dressCode: [],
      facilityType: [],
      patientsType: [],
      allowSMSNotifications: user?.allowSMSNotifications || true,
      ...user,
      ...user?.facilityId,
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
      data?.patientsType || [],
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
      data?.facilityType || [],
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
      data?.dressCode || [],
    );
    if (data.dressCodeOther) {
      data.dressCode = data.dressCode.filter(
        (type) => type !== data.dressCodeOther,
      );
    }

    if (!data.addresses || !data.addresses?.length) {
      data.addresses = ADDRESSES_DEFAULT_FIELDS;
    }
    reset({ ...data });

    setProfileImg(data.addresses[0].picUrl);
    setFacility(data.facilityPicUrl);
  };

  // submit all form data to server

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

  const callAPI = async (data, isLast) => {
    data.addresses[0].picUrl = profileImg;
    data.facilityPicUrl = facility;
    data.isTestCompletedForClinician = Boolean(
      data.isTestCompletedForClinician,
    );
    data.isTrainingVideosForClinician = Boolean(
      data.isTrainingVideosForClinician,
    );

    // send other textarea data
    if (data.referenceByOther) data.referenceBy = data.referenceByOther;

    data.facilityType = findAndReplace(
      data?.facilityType || [],
      "Other",
      data.facilityTypeOther,
    );
    data.patientsType = findAndReplace(
      data?.patientsType || [],
      "Other",
      data.patientsTypeOther,
    );
    // data.dressCode = findAndReplace(
    //   data?.dressCode || [],
    //   "Other",
    //   data.dressCodeOther
    // );
    data.dressCode = [...(data?.dressCode || []), data.dressCodeOther].filter(
      (a) => a,
    );

    data = omit(data, [
      "referenceByOther",
      "facilityTypeOther",
      "patientsTypeOther",
      "dressCodeOther",
      "emrListOther",
      "confirmEmail",
      "iAgree",
      "confirmPassword",
    ]);

    const id = user?.facilityId?.id;
    const userId = user?.id;
    let submitData = {
      ...data,
      email: data?.email?.toLowerCase(),
      id,
      userId,
      isCPRRequired: data.isCPRRequired === "true",
      emailsForInvoice: data?.emailsForInvoice?.filter(Boolean) || [],
    };

    if (isLast) {
      submitData = {
        ...submitData,
        isSignupCompleted: true,
        isFromSignup: true,
        signupStageCount: 3,
        ...FBEventCookies,
      };
    }

    setLoader(true);
    await api(UPDATE_FACILITY_URL, submitData)
      .then((res) => {
        if (res.status === RESPONSE_OK || res.status === RESPONSE_CREATED) {
          // Set address data
          if (res?.data?.data?.addresses?.length) {
            setValue("addresses", res?.data?.data?.addresses);
          }
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
          setFilesToRemove([]);
          if (isLast) {
            if ((user && user?.id) || isUserAuthenticated) {
              getUserObj();
              setSuccessfull(true);
            } else navigate("/");
          } else {
            setUser((prev) => {
              return {
                ...prev,
                facilityId: res.data.data,
              };
            });
          }
        }
        setLoader(false);
      })
      .catch(() => {});
  };

  const onSubmit = (data) => {
    //profile image validation
    if (!profileImg) {
      setOtherFormErrors({ profileUrl: "Please add Profile Picture" });
      return;
    } else setOtherFormErrors({ profileUrl: "" });

    // convert data as per requirement
    callAPI(data, true);
  };

  /**
   * remove file callback function
   * @param {array} respData array of remaining files
   * @param {string} name of field
   */
  const deleteCallbackFn = (respData, name) => {
    if (name === "profile") setProfileImg(null);
    else setFacility(respData);
  };

  const commonProps = {
    register,
    errors,
    watch,
    trigger,
    setCurStep,
    curStep,
    user,
  }; //form common props

  useEffect(() => {
    if (formState.errors && canFocus) {
      // Sort inputs based on their position on the page. (the order will be based on validaton order otherwise)
      const elements = Object.keys(formState.errors)
        .map((name) => document.getElementsByName(name)[0])
        .filter((el) => !!el);
      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
      );

      if (elements.length > 0) {
        let errorElement = elements[0];
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" }); // scrollIntoView options are not supported in Safari
        errorElement.focus({ preventScroll: true });
        setCanFocus(false); // so the form doesn't suddenly jump to the next input that has error.
      }
    }
  }, [formState, canFocus]);

  useEffect(() => {
    if (user?.id && isUserAuthenticated) {
      setCurStep(2);
    } else {
      setCurStep(1);
    }
  }, []);

  useEffect(() => {
    if (curStep !== 1 && (isEmpty(user) || !user?.id)) {
      setCurStep(1);
    }
  }, [user, curStep]);

  return (
    <Form className="facility-form" onSubmit={handleSubmit(onSubmit, onError)}>
      {(!user?.id || !isUserAuthenticated) && curStep === 1 && (
        <SignUpFacilityFirst
          {...commonProps}
          dirtyFields={dirtyFields}
          control={control}
        />
      )}
      {curStep === 2 && (
        <SignUpFacilitySecond
          {...commonProps}
          unregister={unregister}
          resetField={resetField}
          control={control}
          formData={getValues()}
          callAPI={callAPI}
          loader={loader}
          setValue={setValue}
          getValues={getValues}
          handleFileRemove={handleFileRemove}
        />
      )}
      {curStep === 3 && (
        <SignUpFacilityThird
          {...commonProps}
          unregister={unregister}
          resetField={resetField}
          control={control}
          formData={getValues()}
          callAPI={callAPI}
          loader={loader}
          setValue={setValue}
        />
      )}
      {curStep === 4 && (
        <SignUpFacilityFourth
          {...commonProps}
          profileImg={profileImg}
          facility={facility}
          otherFormErrors={otherFormErrors}
          loader={loader}
          callbackFn={handleUploadedImages}
          deleteCallbackFn={deleteCallbackFn}
          filesToRemove={handleFileRemove}
        />
      )}
      <SuccessfullSignup
        isOpen={successfull}
        setIsOpen={setSuccessfull}
      />
    </Form>
  );
}
