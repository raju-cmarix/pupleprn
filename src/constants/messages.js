import {
  CURRENT_YEAR,
  CVV_FIELD_MAX_LENGTH,
  CVV_FIELD_MIN_LENGTH,
  INPUT_FIELD_MAX_LENGTH,
  INPUT_PASSWORD_MAX_LENGTH,
  INPUT_PASSWORD_MIN_LENGTH,
  OTP_DIGITS,
  PHONE_NUMBER_LENGTH,
  YearsOfPracticeString,
} from "./AppConstants";

export const msg = {
  email: "Email is required",
  invalidEmail: "Please enter correct email address",

  confirmEmail: "Confirm email is required",
  confirmEmailMatch: "Email address fields does not match",

  firstName: "First name is required",
  firstNameMaxLength: `First name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  name: "Name is required",
  nameMaxLength: `Name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  lastName: "Last name is required",
  lastNameMaxLength: `Last name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  zipCode: "Zip code is required",
  zipCodeNumeric: "Zip code must be numeric",
  zipCodeLength: "Zip code must be 5 characters long",

  gender: "Gender is required",

  dob: "Date of birth is required",

  plExpireDate: "Professional license expire date is required",

  languagesSpoken: "Languages spoken is required",

  roles: "Role is required",

  password: "Password is required",
  passwordNameMaxLength: `Password should not exceed ${INPUT_PASSWORD_MAX_LENGTH} characters`,
  passwordNameMinLength: `Password must at least be of ${INPUT_PASSWORD_MIN_LENGTH} characters`,
  currentPassword: "Current password is required",
  otp: "TOTP is required",
  otpMinLength: `TOTP must be of ${OTP_DIGITS} digits`,
  newPassword: "New password is required",
  invalidPassword:
    "Password should contain at least 1 number, 1 uppercase letter, 1 lowercase letter and One special character",
  NotEnterBlankSpace: "Blank space is not allowed",

  confirmPassword: "Confirm password is required",
  confirmNewPassword: "Confirm new password is required",
  passwordNotMatch: "Password and confirm password must match",
  newPasswordNotMatch: "New password and confirm new password must match",
  passwordMatch: "Password can only contain Latin letters.",
  newPasswordNotMatch: " New password and confirm new password must match",
  passwordMatch: "Password can only contain Latin letters.",

  termsAndCondition: "Terms And Conditions selection is required ",

  officeName: "Address name is required",
  officeNickName: "Address nickname is required",
  officeNameMaxLength: `Address name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,
  officeNickNameMaxLength: `Address nickname should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  phone: "Phone number is required",
  messagePhone: "Message phone number is required",
  invalidPhone: "Phone number must be numeric",
  phoneNumberMinLength: `Phone number must be ${PHONE_NUMBER_LENGTH} digits`,
  phoneNumberMaxLength: `Phone number must be ${PHONE_NUMBER_LENGTH} digits`,

  state: "State is required",
  referenceBy: "How did you hear about Purple PRN is required",
  licenseNumber: "License number is required",
  licenseNumberPattern: "License number must be alphanumeric",
  receivedYear: "Year Received is required",

  clinicianType: "Clinician type is required",
  clinicianText:"Message is required",
  clinicianTitle:"Clinician Title is Required",

  address: "Address is required",

  jobDescription: "Shift description is required",

  jobDates: "Shift dates is required",

  arrivalTime: "Arrival time is required",
  endTime: "End time is required",

  education: "School is required",
  graduationYears: "Graduation year is required",
  yearsOfPractice: `${YearsOfPracticeString} is required`,

  comment: "Comment is required",

  licensespeciality: "Speciality is required",
  CPR: "CPR is required",
  MalPractice: "Malpractice certificate is required",
  expireDate: "CPR expiration date is required",
  malExpDate: "Malpractice expiration date is required",
  license: "Driver's License is required",
  message: "Message is required",

  numberOfClinicians: "Number of clinicians is required",

  typeOfFacility: "Type of facility is required",
  TypeOfFacilityRulesForClinician:"Type of facility is required",
  clinicianNotificationTypes:"Type of notification is required",
  typeOfPatients: "Type of patients is required",
  dressCode: "Dress code is required",
  emr: "EMR is required",
  patientsSeenPerHour: "Patients seen per hour is required",
  isTrainingVideosForClinician: "Training video is required",
  isTestCompletedForClinician: "Test completed is required",
  officeAddressDescription: "About facility is required",
  parkingMaxLimit: "It should not be more than 100",
  otherMaxLimit: "It should not be more than 50",
  aboutMe: "About me is required",
  travelMile: "How far are you willing to travel for shifts is required",
  city: "City is required",

  endDate: "End date is required",
  hourlyRate: "Hourly rate is required",
  minimumExperience: "Minimum experience is required",

  cardNumber: "Card number is required",
  cardHolderName: "Card holder name is required",
  cardHolderNameMaxLength: `Card holder name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,
  cardNumberMaxLength: `Card number should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,
  accountNumber: "Account number is required",
  routingNumber: "Routing number is required",
  accountNumberMaxLength: `Account number should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,
  routingNumberMaxLength: `Routing number should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,
  accountHolderName: "Account holder name is required",
  accountHolderNameMaxLength: `Account holder name should not exceed ${INPUT_FIELD_MAX_LENGTH} characters`,

  cvv: "CVV/CVC is required",
  cvvMaxLength: `CVV/CVC should not exceed ${CVV_FIELD_MAX_LENGTH} characters`,
  cvvMinLength: `CVV/CVC should not be less then ${CVV_FIELD_MIN_LENGTH} characters`,

  expYear: "Expiry Year is required",
  accType: "Account type is required",
  expYearMinValue: `Expiry Year should not be less than ${CURRENT_YEAR()}`,
  expMonth: "Expiry Month is required",
  totalWorkedHours: "Total hours worked is required",
  CPRRequirementmsg: "CPR Requirement is required",
  isCPRRequiredmsg: "CPR is required",
  invoiceMethodmsg: "Invoice payment method is required",
  notificationFreqmsg: "Please select one.",
  checkInPlaceForFirstDayMsg: "Check in location is required",

  totalAmount: "Total amount is required",

  metroAreaNameMsg: "Metro area name is required.",
  fillPercentageMsg: "Fill percentage is required.",
  clinicianTypeMsg: "Clinician type is required.",
  radiusMsg: "Radius is required.",
  timeSheetStartMsg: "Shift Start Time is required.",
  breakStartMsg: "Break Start Time is required.",
  breakEndMsg: "Break End Time is required.",
  timeSheetEndMsg: "Shift End Time is required.",
  descriptionMsg: "Description is required.",
  facilityEmailMsg: "Facility Email is required.",
  completedDocumentaionCheck: "Please confirm documentation is completed.",
  clinicianNotWorkedCheck:"Please confirm did not work this shift.",
  facilityFeePercentage: "Please provide fee percentage.",
  rangeFacilityFeePercentage: "The fee percentage must be between 0 to 100.",
};
export const FILE_MAX_LIMIT = (MB) =>
  `Max file upload limit exceeded (${MB}MB)`;
