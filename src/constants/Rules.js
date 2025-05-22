import {
  CVV_FIELD_MAX_LENGTH,
  CVV_FIELD_MIN_LENGTH,
  INPUT_FIELD_MAX_LENGTH,
  INPUT_PASSWORD_MAX_LENGTH,
  INPUT_PASSWORD_MIN_LENGTH,
  VALID_EMAIL_REGEX,
  VALID_PASSWORD_REGEX,
} from "./AppConstants";
import { msg } from "./messages";

export const EmailRules = {
  required: msg.email,
  pattern: {
    value: VALID_EMAIL_REGEX,
    message: msg.invalidEmail,
  },
};

export const InvoiceEmailRules = {
  pattern: {
    value: VALID_EMAIL_REGEX,
    message: msg.invalidEmail,
  },
};

export const LoginPasswordRules = {
  required: msg.password,
};

export const ConfirmEmailRules = {
  required: msg.confirmEmail,
};

export const FirstNameRules = {
  required: msg.firstName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.firstNameMaxLength,
  },
};

export const CardNumberRule = {
  required: msg.cardNumber,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.cardNumberMaxLength,
  },
};

export const AccountNumberRule = {
  required: msg.accountNumber,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.accountNumberMaxLength,
  },
};
export const CardHolderNameRule = {
  required: msg.cardHolderName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.cardHolderNameMaxLength,
  },
};
export const RoutingNumberRule = {
  required: msg.routingNumber,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.routingNumberMaxLength,
  },
};
export const AccountHolderNameRule = {
  required: msg.accountHolderName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.accountHolderNameMaxLength,
  },
};

export const CVVRule = {
  required: msg.cvv,
  maxLength: {
    value: CVV_FIELD_MAX_LENGTH,
    message: msg.cvvMaxLength,
  },
  minLength: {
    value: CVV_FIELD_MIN_LENGTH,
    message: msg.cvvMinLength,
  },
};

export const ExpYearRule = {
  required: msg.expYear,
};
export const AccTypeRule = {
  required: msg.accType,
};

export const ExpMonthRule = {
  required: msg.expMonth,
};

export const LastNameRules = {
  required: msg.lastName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.lastNameMaxLength,
  },
};
export const GenderRules = {
  required: msg.gender,
};

export const DOBRules = {
  required: msg.dob,
};

export const PLExpireDateRules = {
  required: msg.plExpireDate,
};

export const LanguageRules = {
  required: msg.languagesSpoken,
};

export const ZipCodeRules = {
  required: msg.zipCode,
  minLength: {
    value: 5,
    message: msg.zipCodeLength,
  },
  maxLength: {
    value: 5,
    message: msg.zipCodeLength,
  },
};

export const AddressRules = {
  required: msg.address,
};

export const jobDescriptionRules = {
  required: msg.jobDescription,
  validate: (value) => {
    const strippedValue = value.replace(/<\/?[^>]+(>|$)/g, "");
    return strippedValue.trim().length > 0 || msg.jobDescription;
  },
};

export const jobDatesRules = {
  required: msg.jobDates,
};

export const ArrivalTimeRules = {
  required: msg.arrivalTime,
};

export const EndTimeRules = {
  required: msg.endTime,
};

export const RolesRules = {
  // required: msg.roles,
};

export const PasswordRules = {
  required: msg.password,
  pattern: {
    value: VALID_PASSWORD_REGEX,
    message: msg.invalidPassword,
  },

  minLength: {
    value: INPUT_PASSWORD_MIN_LENGTH,
    message: msg.passwordNameMinLength,
  },
  maxLength: {
    value: INPUT_PASSWORD_MAX_LENGTH,
    message: msg.passwordNameMinLength,
  },
};

export const NewPasswordRules = {
  required: msg.newPassword,
  minLength: {
    value: INPUT_PASSWORD_MIN_LENGTH,
    message: msg.passwordNameMinLength,
  },
  maxLength: {
    value: INPUT_PASSWORD_MAX_LENGTH,
    message: msg.passwordNameMaxLength,
  },
  pattern: {
    value: VALID_PASSWORD_REGEX,
    message: msg.invalidPassword,
  },
};

export const ConformPasswordRules = {
  required: msg.confirmPassword,
};
export const ConformNewPasswordRules = {
  required: msg.confirmNewPassword,
};

export const CurrentPasswordRules = {
  required: msg.currentPassword,
};

export const otpRules = {
  minLength: {
    value: 6,
    message: msg.otpMinLength,
  },
  required: msg.otp,
};

export const TermsAndConditionRules = {
  required: msg.termsAndCondition,
};

export const OfficeNameRules = {
  required: msg.officeName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.officeNameMaxLength,
  },
};

export const OfficeNickNameRules = {
  required: msg.officeNickName,
  maxLength: {
    value: INPUT_FIELD_MAX_LENGTH,
    message: msg.officeNickNameMaxLength,
  },
};

export const phoneRules = {
  required: msg.phone,
  minLength: {
    value: 10,
    message: msg.phoneNumberMinLength,
  },
  maxLength: {
    value: 10,
    message: msg.phoneNumberMaxLength,
  },
};

export const messagePhoneRules = {
  required: msg.messagePhone,
  minLength: {
    value: 10,
    message: msg.phoneNumberMinLength,
  },
  maxLength: {
    value: 10,
    message: msg.phoneNumberMaxLength,
  },
};

export const phoneRulesOptional = {
  minLength: {
    value: 10,
    message: msg.phoneNumberMinLength,
  },
  maxLength: {
    value: 10,
    message: msg.phoneNumberMaxLength,
  },
};
export const NameRules = {
  required: msg.name,
};

export const ReceivedYearRules = {
  required: msg.receivedYear,
};

export const StateRules = {
  required: msg.state,
};

export const ReferenceByRules = {
  required: msg.referenceBy,
};

export const CertiYearRules = {
  required: msg.receivedYear,
};

export const LicenseNumberRules = {
  required: msg.licenseNumber,
};

export const ClinicianTypeRules = {
  required: msg.clinicianType,
};

export const ClinicianTextRules = {
  required: msg.clinicianText,
};
export const ClinicianTitleRules = {
  required: msg.clinicianTitle,
};

export const EducationRules = {
  required: msg.education,
};

export const GraduationYearRules = {
  required: msg.graduationYears,
};

export const YearsOfPracticeRules = {
  required: msg.yearsOfPractice,
};

export const CommentRules = {
  required: msg.comment,
};

export const SpecialityRules = {
  required: msg.speciality,
};
export const CPRRules = {
  required: msg.CPR,
};
export const MAlRules = {
  required: msg.MalPractice,
};
export const cprExpiryDateRules = {
  required: msg.expireDate,
};
export const MalExpDate = {
  required: msg.malExpDate,
};
export const DrivingLicenseRules = {
  required: msg.license,
};
export const MessageRules = {
  required: msg.message,
};

export const NumberOfCliniciansRules = {
  required: msg.numberOfClinicians,
};
export const TypeOfFacilityRules = {
  required: msg.typeOfFacility,
};
export const TypeOfFacilityRulesForClinician = {
  required: msg.TypeOfFacilityRulesForClinician,
};
export const clinicianNotificationTypeRule = {
  required: msg.clinicianNotificationTypes,
};

export const TypeOfPatientsRules = {
  required: msg.typeOfPatients,
};
export const DressCodeRules = {
  required: msg.dressCode,
};
export const EmrRules = {
  required: msg.emr,
};
export const PatientSeenPerHourRules = {
  required: msg.patientsSeenPerHour,
};

export const IsTrainingVideosForClinicianRules = {
  required: msg.isTrainingVideosForClinician,
};
export const IsTestCompletedForClinicianRules = {
  required: msg.isTestCompletedForClinician,
};

export const AboutFacilityRules = {
  required: msg.officeAddressDescription,
};

export const AboutMeRules = {
  required: msg.aboutMe,
};

export const TravelMileRules = {
  required: msg.travelMile,
};

export const CityRules = {
  required: msg.city,
};

export const HourlyRateRules = {
  required: msg.hourlyRate,
};

export const MinimumExperienceRules = {
  required: msg.minimumExperience,
};

export const TotalAmountRules = {
  required: msg.totalAmount,
};

export const TotalWorkedHoursRules = {
  required: msg.totalWorkedHours,
};

export const CPRRequirementRules = {
  required: msg.CPRRequirementmsg,
};

export const isCPRRequiredRules = {
  required: msg.isCPRRequiredmsg,
};

export const invoiceMethodRules = {
  required: msg.invoiceMethodmsg,
};

export const notificationFreqRules = {
  required: msg.notificationFreqmsg,
};

export const checkInPlaceForFirstDayRules = {
  required: msg.checkInPlaceForFirstDayMsg,
};

export const IMEmailRules = {
  pattern: {
    value: VALID_EMAIL_REGEX,
    message: msg.invalidEmail,
  },
};

export const metroAreaNameRules = {
  required: msg.metroAreaNameMsg,
};

export const fillPercentageRules = {
  required: msg.fillPercentageMsg,
};

export const radiusRules = {
  required: msg.radiusMsg,
};

export const timeSheetStartRules = {
  required: msg.timeSheetStartMsg,
};

export const BreakStartRules = {
  required: msg.breakStartMsg,
};

export const BreakEndRules = {
  required: msg.breakEndMsg,
};

export const timeSheetEndRules = {
  required: msg.timeSheetEndMsg,
};

export const descriptionRules = {
  required: msg.descriptionMsg,
};

export const facilityEmailRules = {
  required: msg.facilityEmailMsg,
  pattern: {
    value: VALID_EMAIL_REGEX,
    message: msg.invalidEmail,
  },
};

export const completedDocumentationRules = {
  required: msg.completedDocumentaionCheck,
};
export const clinicianNotWorkedRules = {
  required: msg.clinicianNotWorkedCheck,
};

export const FacilityFeePercentageRules = {
  required: msg.facilityFeePercentage,
  min: {
    value: 0,
    message: msg.rangeFacilityFeePercentage,
  },
  max: {
    value: 100,
    message: msg.rangeFacilityFeePercentage,
  },
};
