import { api } from "api/Api";
import FormButton from "component/common/FormButton";
import FormCheckbox from "component/common/FormCheckbox";
import FormCheckboxOther from "component/common/FormCheckboxOther";
import FormError from "component/common/FormError";
import FormRadio from "component/common/FormRadio";
import FormToggle from "component/common/FormToggle";
import { EDIT_CLINICIAN_DATA, GET_LOGIN_DATA_URL } from "constants/ApiUrls";
import { NOTIFICATION_FREQ_TYPES, RESPONSE_OK } from "constants/AppConstants";
import { notificationFreqRules, TypeOfFacilityRulesForClinician, clinicianNotificationTypeRule } from "constants/Rules";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UserContext from "utils/context/UserContext";
import { clinicianFacilityTypeOptions, notificationFreqOptions, weekDays, clinicianNotificationType } from "views/authentication/signUpClinician/HourlyConstant";

const NotificationSetting = () => {
  const {
    register,
    reset,
    trigger,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
    availableWeekDays: weekDays,
    }
  });
 
  const [otherFormErrors, setOtherFormErrors] = useState({});
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const { fields: availableDaysFields } = useFieldArray({
    control,
    name: "availableWeekDays",
  })
  // const notificationTypes = user?.notificationType
  useEffect(() => {
    // Convert int to string for useForm hook
    let notificationData = { ...user?.notificationFrequency };
    for (let key in user?.notificationFrequency) {
      notificationData[key] = String(notificationData[key]);
    }
   let isAvailableWeek = user?.clinicianId?.availableWeekDays
   let facilityType = user?.clinicianId?.facilityType
   let notificationType = user?.notificationType

   // Ensure availableWeekDays is in correct format
 let availableWeekDaysData = {
  monday: isAvailableWeek?.monday || false,
  tuesday: isAvailableWeek?.tuesday || false,
  wednesday: isAvailableWeek?.wednesday || false,
  thursday: isAvailableWeek?.thursday || false,
  friday: isAvailableWeek?.friday || false,
  saturday: isAvailableWeek?.saturday || false,
  sunday: isAvailableWeek?.sunday || false,
};


    reset({
      notificationFrequency: notificationData,
      allowSMSNotifications: user?.clinicianId?.allowSMSNotifications,
      availableWeekDays: availableWeekDaysData,
      notificationType: notificationType,
    });
    setValue("availableWeekDays", availableWeekDaysData || []);
    setValue("facilityType", facilityType || []);
    setValue("notificationType", notificationType || [])
  }, [user]);

  const getUserObj = () => {
    api(GET_LOGIN_DATA_URL, {}).then((res) => {
      if (res.status === RESPONSE_OK) setUser(res.data.data);
      else setUser({});
    });
  };

  const handleSave = async () => {
    try {
      const res = await trigger(["notificationFrequency"]);
      if (!res) {
        return;
      }
      setLoader(true);
      // let values = getValues();
 
      // let obj;
      // let weekErr = false;
      // const isAnyWeekDayChecked = Object.values(values.availableWeekDays).some(
      //   (checked) => checked === true,
      // );
    
      // if (!isAnyWeekDayChecked) {
      //   obj = {
      //     ...obj,
      //     availableWeekDays: "At least one weekday must be selected.",
      //   };
      //   weekErr = true;
      //   setLoader(false)
      // }

      // setOtherFormErrors({ ...obj });
      // if (weekErr) return;
      setLoader(true);
      let values = getValues();
      
      let obj = {};
      let hasError = false;
  
       // Validate Notification Type
    if (!values.notificationType || values.notificationType.length === 0) {
      obj.notificationType = "Type of notification is required";
      hasError = true;
    }

    // Validate Facility Type
    if (!values.facilityType || values.facilityType.length === 0) {
      obj.facilityType = "Type of facility is required";
      hasError = true;
    }
      // Validate Available Weekdays
      const isAnyWeekDayChecked = Object.values(values.availableWeekDays).some(
        (checked) => checked === true
      );
  
      if (!isAnyWeekDayChecked) {
        obj = { ...obj, availableWeekDays: "At least one weekday must be selected." };
        hasError = true;
      }
  
      // Set form errors and stop API call if validation fails
      setOtherFormErrors(obj);
      if (hasError) {
        setLoader(false);
        return;
      }
    
       let data = {
        ...values,
        facilityType:values.facilityType,
        notificationType:values.notificationType,
        availableWeekDays: {
          monday: values.availableWeekDays?.monday || false,
          tuesday: values.availableWeekDays?.tuesday || false,
          wednesday: values.availableWeekDays?.wednesday || false,
          thursday: values.availableWeekDays?.thursday || false,
          friday: values.availableWeekDays?.friday || false,
          saturday: values.availableWeekDays?.saturday || false,
          sunday: values.availableWeekDays?.sunday || false,
        },
      }
      const endPoint = { ...EDIT_CLINICIAN_DATA, showToast: false };
      const payload = {
        id: user?.clinicianId?.id,
        userId: user?.id,
        roles: user?.roles,
        ...data,
      };

      // Convert string to numbers
      for (let key in payload.notificationFrequency) {
        payload.notificationFrequency[key] = Number(
          payload.notificationFrequency[key],
        );
      }

      // Make API call
      api(endPoint, payload)
        .then((res) => {
          if (res.status === RESPONSE_OK) {
            getUserObj();
            toast.success("Notification setting updated successfully!");
          }
        })
        .catch((error) => {
          toast.error("Failed to update notification settings.");
          console.error("Notification Setting Updation Error: ", error);
        })
        .finally(() => {
          setLoader(false);
        });
    } catch (error) {
      console.error("Notification Setting Updation Error: ", error);
    }
  };

  return (
    <div className="p-3">
      <h5 className="m-0">Notification Frequency</h5>
      {NOTIFICATION_FREQ_TYPES.map((notification, index) => {
        return (
          <div
            key={notification.name}
            className="d-flex flex-column pl-12 pt-4">
            <h6>
              {index + 1}. {notification.label}
            </h6>
            <FormRadio
              name={`notificationFrequency.${notification.name}`}
              options={notificationFreqOptions}
              register={register}
              rules={notificationFreqRules}
              errors={errors}
              divClassName="form-group pt-radio im-radio pt-1"
            />
          </div>
        );
      })}
   
       <div className="facility row mt-1">
       <div className="facility-type">
       <h5 style={{paddingTop:'5px', paddingBottom:'5px'}}>Notification Types</h5>
        <div style={{maxWidth:'300px', marginRight:'auto'}} className="type">
            <FormCheckboxOther
              control={control}
              options={clinicianNotificationType}
              register={register}
              errors={errors}
              // rules={clinicianNotificationTypeRule}
              name="notificationType"
              divClassName="types"
            />
            {otherFormErrors?.notificationType && <p style={{color:'#DC4535', fontSize:'12px'}} className="error">{otherFormErrors.notificationType}</p>}
                      </div>
        </div>
          {/* <Col md={6}> */}
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
              {/* </Col> */}
      

        <div>
          <div className="facility-type">
            <h5 style={{paddingTop:'5px', paddingBottom:'5px'}}>Facilities I'm Interested In:</h5>
            <div style={{maxWidth:'300px', marginRight:'auto'}} className="type">
              <FormCheckboxOther
                control={control}
                options={clinicianFacilityTypeOptions}
                register={register}
                errors={errors}
                // rules={otherFormErrors?.facilityType ? TypeOfFacilityRulesForClinician : TypeOfFacilityRulesForClinician}
                name="facilityType"
               divClassName="types"
              />
              {otherFormErrors?.facilityType && <p style={{color:'#DC4535', fontSize:'12px'}} className="error">{otherFormErrors.facilityType}</p>}
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
        </div>
        </div>

      <div className="dashed-border"></div>
      <div className="d-flex align-items-center justify-content-start">
        <h6 className="m-0">New Chat SMS Notification</h6>
        <FormToggle
          divClassName="d-flex"
          id="allowSMSNotifications"
          name="allowSMSNotifications"
          control={control}
          register={register}
          rules={{}}
          errors={errors}
        />
      </div>
      <div className="text-center mt-4">
        <FormButton
          className="pt-btn btn-primary pt-btn-small "
          type={"button"}
          label={"Save"}
          disabled={loader}
          loader={loader}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default NotificationSetting;
