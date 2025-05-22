/* eslint-disable no-useless-escape */
import dayjs from "dayjs";
import { isEmpty } from "radash";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import { DEFAULT_DATE_FORMAT } from "utils/Utils";
import { v4 as uuidv4 } from "uuid";
import { LOGIN_URL, TIMESHEET_APPROVE } from "./ApiUrls";

export const uuid = function () {
  return uuidv4();
};

// export const STRIPE = "Stripe™";
export const STRIPE = "Stripe";

export const INPUT_FIELD_MAX_LENGTH = 50;
export const CVV_FIELD_MAX_LENGTH = 6;
export const CVV_FIELD_MIN_LENGTH = 3;
export const CURRENT_YEAR = () => new Date()?.getFullYear();
export const INPUT_PASSWORD_MIN_LENGTH = 8;
export const INPUT_PASSWORD_MAX_LENGTH = 32;
export const PHONE_NUMBER_LENGTH = 10;
export const OTP_DIGITS = 6;
export const TOAST_AUTO_CLOSE = 3000;
export const RESPONSE_OK = 200;
export const RESPONSE_CREATED = 201;

export const INVALID_NUMBER_INPUT = /e|\+|\.|-/i;
export const INVALID_DECIMAL_INPUT = /e|\+|-/i;

export const VALID_TEXT_REGEX = /^[A-Za-z ]+$/i;
export const VALID_ALPHA_NUMERIC_REGEX = /^[A-Za-z0-9]+$/i;
export const VALID_EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i;
export const VALID_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&^*()_])[A-Za-z\d!@#$%&^*()_]{8,}$/;
export const VALID_URL_REGEX =
  /^(https?:\/\/|(www\.))[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,12}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
export const VALID_DOMAIN = /^((https:\/\/|http:\/\/)|www\.|).+\..+$/i;
export const FILE_EXTENSION_REGEX = /\.[0-9a-zA-Z]+$/;
export const SYMBOLS = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const VALID_TEXT_INPUT = /^[A-Z a-z ]+$/i;
export const VALID_NUMBER = /^([0-9]+)|Backspace|Delete|Left|Right|v|a|c$/i;

export const ACCEPT_PDF = ["application/pdf"];
export const ACCEPT_VIDEO = ["video/x-ms-wmv", "video/mp4", "video/quicktime"];
export const ACCEPT_IMAGE = [
  "image/png",
  "image/jpg",
  "image/heif",
  "image/heic",
  "image/jpeg",
  // "image/svg+xml",
];
export const ACCEPT_IMAGE_PDF = [
  "image/png",
  "image/jpg",
  "image/heif",
  "image/heic",
  "image/jpeg",
  "application/pdf",
];
export const ACCEPT_IMAGE_EXT = ["jpeg", "png", "jpg", "heic", "heif"];
export const ACCEPT_AUDIO = ["audio/mp3", ".wav", ".m4a"];
export const ACCEPT_DOC = [
  ".doc",
  ".docx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ACCEPT_CSV = [".csv"];
export const ROLE_CLINICIAN = ["pta", "pt", "ot", "ota", "cota", "slp"];
export const ROLE_ADMIN = ["admin"];
export const ROLE_FACILITY = ["facility"];
export const REFERENCEBY = "How did you hear about PurplePRN?";
export const ADMIN = "admin";
export const SUBADMIN = "subadmin";

export const TOKEN_NAME = "purplePTAuthToken";
export const REFRESH_TOKEN_NAME = "purplePTRefreshToken";
export const ROLES_LABELS = new Map();
ROLES_LABELS.set("facility", "Facility");
ROLES_LABELS.set("pt", "PT");
ROLES_LABELS.set("pta", "PTA");
ROLES_LABELS.set("clinician", "Clinician");
ROLES_LABELS.set("clinicians", "Clinician");
ROLES_LABELS.set("ot", "OT");
ROLES_LABELS.set("ota", "OTA");
ROLES_LABELS.set("cota", "COTA");
ROLES_LABELS.set("slp", "SLP");

export const FACILITY_TYPE_LABELS = new Map();
FACILITY_TYPE_LABELS.set("outpatient", "Outpatient");
FACILITY_TYPE_LABELS.set("Inpatient", "Inpatient");
FACILITY_TYPE_LABELS.set("snf", "SNF");
FACILITY_TYPE_LABELS.set("ltacH", "LTACH");
FACILITY_TYPE_LABELS.set("Home Health", "Home Health");
FACILITY_TYPE_LABELS.set("Other", "Other:");

export const CLINICIAN_TYPE_LABELS = new Map();
CLINICIAN_TYPE_LABELS.set("pt", "PT");
CLINICIAN_TYPE_LABELS.set("pta", "PTA");
CLINICIAN_TYPE_LABELS.set("ot", "OT");
CLINICIAN_TYPE_LABELS.set("ota", "OTA");
CLINICIAN_TYPE_LABELS.set("cota", "COTA");
CLINICIAN_TYPE_LABELS.set("slp", "SLP");

export const PAYMENT_STATUS_LABELS = new Map();
PAYMENT_STATUS_LABELS.set("-", "-");
PAYMENT_STATUS_LABELS.set("inProcess", "In Progress");
PAYMENT_STATUS_LABELS.set("invoice", "Invoice");
PAYMENT_STATUS_LABELS.set("paymentDue", "Payment Due");
PAYMENT_STATUS_LABELS.set("completed", "Completed");

export const APP_LIMIT = 500;
export const CARD_LIMIT = 30;
export const NOREVIEWS = "No reviews available";
export const DEFAULTFILTERS = {
  skip: 0,
  limit: APP_LIMIT,
};
export const CARD_NUMBER_PLACEHOLDER = "Card number";
export const BANK_ACCOUNT_NUMBER_PLACEHOLDER = "Account number";
export const CARD_HOLDER_NAME_PLACEHOLDER = "Enter name here";
export const ROUTING_NUMBER_PLACEHOLDER = "Enter routing number here";
export const BANK_NAME_PLACEHOLDER = "Enter bank name here";
export const CVV_PLACEHOLDER = "123";

export const CARD_SVG = [
  "visa",
  "amex",
  "mastercard",
  "discover",
  "diners",
  "unionpay",
  "jcb",
];
export const CARD_BRAND = {
  visa: "Visa",
  amex: "American Express",
  mastercard: "Mastercard",
  discover: "Discover",
  diners: "Diners Club",
  unionpay: "UnionPay",
  jcb: "JCB",
};
export const AcceptClinicianApplicationTexts = {
  header: "Confirm payment to finalize your shift",
  label: "Are you sure you want to select this clinician?",
  note: `Once you click on “Confirm and pay,” the amount will be charged to your payment method and the shift will be confirmed with the clinician. Purple PRN handles payment to the clinician.`,
  stripe: `*${STRIPE} incures these fees for credit and debit card usage`,
  // stripeACH: `*${STRIPE} incures the changes to handle the secure payment on the platform`,
  stripeACH: ``,
  expiration: "Expiration: ",
  cardNumber: "XXXX-XXXX-XXXX-",
  totalShiftPay: "Total shift pay",
  serviceFee: "Service fee",
  serviceFeeCharges: "10% Purple PRN + stripe (2.9%) charge",
  serviceFeeAccountCharges: "10% Purple PRN charge",
  shiftId: "Shift ID",
  subTotal: "Sub-total",
  stripeCharges: `${STRIPE} charges*`,
  stripeChargesFees: "(2.9% of subtotal + 30)",
  totalPay: "Total pay",
  shiftPaymentDetails: "Shift payment details for shift",
  ID: "ID",
  amountPaid: "Amount paid",
  noteText: "Note:",
  cancel: "Cancel",
  manageCards:
    "To manage your cards, please go to account settings, click on card number to set it as your primary card",
  manageBanks: `To manage your banks, please go to account settings, click on
    bank account to set it as your primary bank`,
  selectCard: "Select your card",
  selectPayment: "Select your payment method",
  card: "Card",
  summary: "Summary",
  paymentMethod: "Payment method ",
  amountToPaid: "Amount to be paid",
  ACHPayButton: `Proceed to pay`,
  CardPayButton: `Confirm & Pay`,
  ACHPaymentLinkButton: `Link to payment`,
};

AcceptClinicianApplicationTexts.ACHAccountConnectText = `Clicking on "${AcceptClinicianApplicationTexts?.ACHPayButton}" will redirect you to the Stripe secure payment page.`;
AcceptClinicianApplicationTexts.ACHLINKTEXT = `Link is generated click on "${AcceptClinicianApplicationTexts?.ACHPaymentLinkButton}" button and you will be redirected to ${STRIPE} page in which you can complete the payment.`;
AcceptClinicianApplicationTexts.LINK_GENERATED = `Link is generated successfully! Click on ${AcceptClinicianApplicationTexts?.ACHPaymentLinkButton} button`;
AcceptClinicianApplicationTexts.SOMETHING = "Something went wrong.";

export const ACHPaymentLinkPopupTexts = {
  title: `Pay via ${STRIPE}`,
  text: `You will be redirected to the ${STRIPE} platform for secure payment.`,
  ok: "Okay",
};

export const ReceiptTexts = {
  header: "Payment Receipt",
  label: "Are you sure you want to select this clinician?",
  note: `Click on receipt to download in PDF format`,
  stripe: `*${STRIPE} incur these changes to handle the secure payment on the
  platform`,
  expiration: "Expiration: ",
  cardNumber: "XXXX-XXXX-XXXX-",
  totalShiftPay: "Total shift pay",
  serviceFee: "Service fee",
  serviceFeeCharges: "10% Purple PRN + stripe (2.9%) charge*",
  serviceFeeChargesACH: "10% Purple PRN charge*",
  // serviceFeeCharges: "10% Purple PRN charge",
  shiftId: "SHIFT ID",
  subTotal: "Sub-total",
  stripeCharges: `${STRIPE} charges*`,
  stripeChargesFees: "(2.9% of subtotal + 30)",
  totalPay: "Total pay",
  shiftPaymentDetails: "Shift payment details for job",
  ID: "ID",
  amountPaid: "Amount paid",
  noteText: "Note:",
  cancel: "Cancel",
  manageCards: "To manage your cards, please go to account settings",
  selectCard: "Select your card",
  otherReceipts: "Other receipts",
  card: "Card",
  summary: "Summary",
  paymentMethod: "Payment method ",
  amountToPaid: "Amount to be paid",
  downloadPDF: "Click to download PDF",
  stripeReceiptUrl: "https://pay.stripe.com",
  stripeReceipt: `${STRIPE} Receipt`,
  otherReceipt: "Receipt",
};
export const RejectClinicianApplicationTexts = {
  header: "Reject Applicant",
  label: "Are you sure you want to reject this clinician?",
};
export const PURPLEPT_SERVICE_CHARGES = 10;
export const PERCENTAGE = (num, per) => (num / 100) * per;
export const StripeCharges = (subtotal) =>
  Number(PERCENTAGE(subtotal, 2.9))?.toFixed(2);
export const StripeChargesAccount = (subtotal) =>
  Number(PERCENTAGE(subtotal, 0.8))?.toFixed(2);
export const DEFAULTDEVICEIDLENGTH = 30;
export const DEFAULTDEVICETOKENLENGTH = 40;
export const LOCALSTORAGEDEVICEID = "deviceId";

export const LOGIN_STATUS_LABELS = new Map();
LOGIN_STATUS_LABELS.set("approved", "Approved");
LOGIN_STATUS_LABELS.set("rejected", "Declined");
LOGIN_STATUS_LABELS.set("pending", "Pending");
LOGIN_STATUS_LABELS.set("deactivate", "Deactivated");

export const DEFAULT_TIME_INTERVAL = 30;
export const PATHTONODATAFOUND = "../component/common/noDataFound";
export const DISPLAYNONE = "d-none";
export const NOTIFICATIONPOPOVERLIMIT = 5;
export const NOTIFICATIONPAGELIMIT = 10;
export const PATCH = "patch";
export const GET = "get";
export const POST = "post";
export const VIEW_DETAILS = "View Details";
export const NOTIFICATION_TIME_FORMAT = "hh:mm a";
export const NOTIFICATION_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${NOTIFICATION_TIME_FORMAT}`;
export const MINUTE_MS = 60000;
export const CURSORPOINTER = { cursor: "pointer" };
export const POINTER = "pointer";
export const NotificationType = (type, jobId, facilityId, user, role) => {
  let returnUrl = "/notifications";
  switch (type) {
    case "testNotification":
      returnUrl = "/notifications";
      break;

    case "newChatMessage":
      returnUrl = "/chat-profile";
      break;

    case "facilityApprovesApplication":
      returnUrl = "/clinician/dashboard?confirmedshifts=1";
      break;

    case "facilityDeclinesApplication":
      returnUrl = "/clinician/dashboard";
      break;

    case "reviewForFacility":
      returnUrl = "/clinician/dashboard?confirmedshifts=1";
      break;

    case "clinicianShiftCompletedByFacility":
      returnUrl = "/clinician/dashboard?confirmedshifts=1";
      break;

    case "clinicianAppliedForJob":
      if (jobId && facilityId) {
        returnUrl = `/facility/applicants?jobId=${jobId || ""}&facilityId=${
          facilityId || ""
        }`;
      } else {
        returnUrl = "/notifications";
      }
      break;

    case "facilityShiftCompleted":
      returnUrl = "/facility/shiftmanagement?confirmedshifts=1";
      break;

    case "clinicianUploadTimecardReminder":
      returnUrl = "/clinician/dashboard?confirmedshifts=1";
      break;

    case "reviewForClinician":
      returnUrl = "/facility/shiftmanagement?confirmedshifts=1";
      break;

    case "newJobNotificationForClinician":
      if (jobId) {
        returnUrl = `/clinician/jobprofile/${jobId}`;
      } else {
        returnUrl = "/clinician/dashboard";
      }
      break;

    case "clinicianRatingOnFacility":
      if (jobId) {
        returnUrl = `/facility/jobprofile/${jobId}`;
      } else {
        returnUrl = "/facility/shiftmanagement?confirmedshifts=1";
      }
      break;

    case "paymentCompletion":
      returnUrl = `/${
        user?.clinicianId ? "clinician/dashboard" : "facility/shiftmanagement"
      }?confirmedshifts=1`;

      break;

    case "shiftCancelled":
      returnUrl = `/${
        user?.clinicianId ? "clinician/dashboard" : "facility/shiftmanagement"
      }?confirmedshifts=1`;

      break;
    case "jobCancelledByAdmin":
      returnUrl = `/${
        user?.clinicianId ? "clinician/dashboard" : "facility/shiftmanagement"
      }`;

      break;
    case "facilityClinicianSignupToAdmin":
      returnUrl = `/admin/users?tab=${role}`;
      break;
    case "pendingTimesheetReminder":
      returnUrl = `/clinician/dashboard`;
      break;

    default:
      returnUrl = "/notifications";
      break;
  }
  return returnUrl;
};
export const LOCALSTORAGEDEVICETOKEN = "deviceToken";
export const DEFAULT_NOTIFICATION_TYPE = "testNotification";
export const TRANSACTIONS = {
  label: "Transactions",
  text: "There are no records to display",
};
export const DIRECT_DEPOSIT = {
  label: "Direct Deposit Information",
  text: `Add and manage your direct deposit info. Once you add an account, please wait for few minutes for it to process then refresh your page.`,
};
export const cardLastDigits = (lastDigits) =>
  String(lastDigits)?.length === 1
    ? `000${lastDigits}`
    : String(lastDigits)?.length === 2
    ? `00${lastDigits}`
    : String(lastDigits)?.length === 3
    ? `0${lastDigits}`
    : lastDigits;
export const CONFIRMED = ["confirmed", "completed"];
export const LANDING_PAGE_URLS = [
  "/",
  "/clinician",
  "/clinician/",
  "/facility",
  "/facility/",
  "/contactus",
  "/faq",
  "/aboutus",
];
export const PAYMENT_RECEIPT = "paymentReceipt";
export const PDF = "application/pdf";
export const STRIPE_SECOND_BUTTON = "Proceed";
export const STRIPE_SECOND_TEXT = `Click on "${STRIPE_SECOND_BUTTON}" and you'll be redirected to ${STRIPE} to finish up the process`;

export const DEFAULT_TIMEZONE = "America/Chicago";

export const AdminSortOptions = [
  { value: "", label: "None" },
  { value: "totalTime", label: "Total Time" },
  { value: "totalAmount", label: "Total Amount" },
  { value: "serialNumber", label: "Shift ID" },
];
export const FacilityJobPostSortOptions = [
  { label: "All", value: "" },
  { label: "Date Posted", value: "createdAt" },
  { value: "totalPay", label: "Total Amount" },
  { label: "No. of Applicants", value: "numberOfApplicants" },
];
// export const SmallLogoURL =
//   "https://purplept-s3-test.s3.ap-south-1.amazonaws.com/images/1674633551285-289a59a2-1d55-4aac-a490-2b1dfd64b9b3/small-logo.svg";
export const SmallLogoURL =
  "https://purplept-live.s3.us-west-1.amazonaws.com/images/1674636050809-8f346784-55ba-4bb9-94e2-fd939cc0b32a/Rectangle%203.png";

export const FACILITY_SIGNUP = "/facility/signup";
export const CLINICIAN_SIGNUP = "/clinician/signup";
export const applicantNewTimes = "Applicant has proposed new times";
export const InNewTab = {
  target: "_blank",
  rel: "noopener noreferrer",
  style: { zIndex: 99 },
};
// export const GeocodeAPIKey = "AIzaSyCk-p3nhfNeFRlFp_j89Y_ObbsLjsvFs8c";
export const GeocodeAPIKey = "AIzaSyCdfK4z2YzwP89totg0iIOFG3zGxbiFwuI";
export const NO_REVIEWS = "No reviews";
export const NO_RATINGS = "No ratings";
export const FlexibleTimingsText = "Flexible timing - Make adjustmentments?";
export const ADD_ACCOUNT_FIRST = "/clinician/settings?addaccount=1";
export const MAX_FIVE_MB_SERVER = "E_EXCEEDS_UPLOAD_LIMIT";
export const MAX_FIVE_MB_CLIENT = "File size should be less then 5MB";
export const HoursChangeError =
  "Total working hours per day can not be increased";
export const InvalidImages = "JPG, JPEG, PNG and HEIC images are supported";
export const AcceptClinicianApplicationInitialMessage = {
  header: "How would you like to confirm the shift ?",
  optionOne: "Pay now using credit or debit card.",
  optionThree: "Pay now using bank account transfer.",
  optionTwo: "Pay later when you receive an invoice.",
};

export const AcceptClinicianApplicationWInvoiceMessage = {
  header: AcceptClinicianApplicationInitialMessage?.optionTwo,
  text: "Confirm your shift now and you'll receive an invoice from Purple PRN via email.",
};
export const RateRequired = "Rating should not be zero";
export const PaymentMethods = {
  Card: "card",
  ACH: "ACH",
  Invoice: "invoice",
};
export const AddAccountFirstTexts = {
  header: "Add Account First",
  body: `Please add your bank account in account settings
before applying for the shift to ensure you receive
the payment post shift completion`,
};
export const MAX_LENGTH = 100;
export const YearsOfPracticeString = "Minimum years of clinician experience";
// export const HireStaff = "Hire Staff";
export const HireStaff = (u) => (u ? "Post a shift" : "Register as Facility");
// export const ApplyToWork = "Apply to Work";
export const ApplyToWork = (u) => (u ? "Find Shifts" : "Register as Clinician");
export const OnShiftManagementPage = " to show it on Shift Management page";
export const NoApplicants = "Applicant(s) not found";
export const lastdayoflastmonth = () => {
  let date = new Date();
  date.setMonth(date.getMonth(), 0);
  return date;
};
export const SameShiftTime =
  "One or more shifts' Start time and End time are same.";
export const TOTAL_HOURS = (
  jobSlots,
  fromApply = false,
  fromPayModal = false,
) => {
  const hoursPerSlot = jobSlots.map((slot) => {
    let x = dayjs(
      fromApply
        ? new Date(slot.endDate)
        : fromPayModal
        ? new Date(slot.endDate * 1000)
        : slot.endDate,
    ).diff(
      dayjs(
        fromApply
          ? new Date(slot.startDate)
          : fromPayModal
          ? new Date(slot.startDate * 1000)
          : slot.startDate,
      ),
      "minutes",
    );

    x = x / 60;
    const days = Math.floor(x / 24);
    x -= days * 24;
    // if x means per day total hours is more than 5 then removing 30 mins from it
    let y = x;
    if (x >= 5) {
      y -= 0.5;
    }
    return { x, y };
  });

  if (hoursPerSlot.length === 0) {
    return [0, 0];
  }

  let FullHours = hoursPerSlot?.map((e) => e?.x);
  let ReducedHours = hoursPerSlot?.map((e) => e?.y);

  let totalHoursFull = FullHours.reduce((accumulateSum, currentValue) => {
    return accumulateSum + currentValue;
  })?.toPrecision(3);

  if (totalHoursFull % 1 >= 0.5) {
    totalHoursFull = Number(totalHoursFull?.toString().split(".")[0]) + 0.5;
  } else {
    totalHoursFull = Number(totalHoursFull?.toString().split(".")[0]);
  }

  let totalHours = ReducedHours.reduce((accumulateSum, currentValue) => {
    return accumulateSum + currentValue;
  })?.toPrecision(3);

  if (totalHours % 1 >= 0.5) {
    totalHours = Number(totalHours?.toString().split(".")[0]) + 0.5;
  } else {
    totalHours = Number(totalHours?.toString().split(".")[0]);
  }

  return [totalHours, totalHoursFull];
};
export const USERROLE = (user) => {
  if (user?.clinicianId) {
    return "clinician";
  }
  if (user?.facilityId) {
    return "facility";
  }
};
export const FIRST_LETTER_CAPITAL = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const LUNCH_BREAK_TEXT = "May include lunch break";

export const LUNCH_BREAK = (slots, fromJobPost = false) => {
  const satisfy = slots.some((slot) => {
    const startDate =
      !isNaN(slot?.startDate) && !fromJobPost
        ? !fromJobPost
          ? new Date(slot?.startDate * 1000)
          : new Date(slot?.startDate)
        : slot.startDate;
    const endDate =
      !isNaN(slot?.endDate) && !fromJobPost
        ? !fromJobPost
          ? new Date(slot?.endDate * 1000)
          : new Date(slot?.endDate)
        : slot.endDate;

    let x = dayjs(endDate).diff(dayjs(startDate), "minutes");

    x = x / 60;
    const days = Math.floor(x / 24);
    x -= days * 24;

    return x >= 5;
  });

  if (satisfy) {
    return (
      <p
        className="includes"
        style={{ marginLeft: "3px" }}>
        {LUNCH_BREAK_TEXT}
      </p>
    );
  } else {
    return <></>;
  }
};
export const VERIFICATION_REQUIRED = (
  user,
  toggle,
  loggedIn,
  redirectUrl,
  isNotCompleted,
) => {
  if (loggedIn) {
    if (!isEmpty(user) && !user?.isApprovedByAdmin) {
      if (user?.roles === "facility") {
        return (
          <NavItem>
            <Link
              onClick={window.innerWidth < 767 && toggle}
              className="text-danger"
              to={!isNotCompleted ? redirectUrl : ""}>
              Verification required
            </Link>
          </NavItem>
        );
      } else if (user?.roles === "clinician" || user?.clinicianId) {
        return (
          <NavItem>
            <Link
              onClick={window.innerWidth < 767 && toggle}
              className="text-danger"
              to={!isNotCompleted ? redirectUrl : CLINICIAN_CALENDLY_LINK}
              target="_blank">
              OnBoarding Call
            </Link>
          </NavItem>
        );
      } else if (user?.roles === "admin") {
        return <></>;
      }
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export const INVALID_JOB_STATUS = ["expired", "deleted", "cancelled"];
export const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];
export const NOT_SUBMIT = "Not submitted";
export const FBP = "_fbp";
export const FBC = "_fbc";
export const FBPCookie = () => localStorage.getItem(FBP) || "";
export const FBCCookie = () => localStorage.getItem(FBC) || "";
export const FBEventCookies = { fbc: FBCCookie(), fbp: FBPCookie() };
export const SPACE_KEY = "Space";
export const COMPLETED = "completed";
export const CANCEL = "cancelled";
export const LOCALSTORAGE_CONFIRMSHIFT = "confirmShiftReqObj";
export const EMAIL_COPIED_TO_CLIPBOARD = "Email copied to clipboard";
export const CLICK_COPY = "Click to copy email";
export const FACILITY = "facility";
export const CLINICIAN = "clinician";
export const COMPLETE_PROFILE_FIRST = "Please complete your profile first";
export const SignUpSuccessfulText = {
  clinicianText:
    "The next step in the registration process is to schedule a virtual interview with our onboarding associate. This interview involves answering any questions you have to make sure we give you the best experience possible!",
  facilityText:
    "The next step in the registration process is to schedule a brief interview with our onboarding team. This will help us customize your experience to get more shifts fulfilled and answer any questions you may have. ",
};
export const INCOMPLETE_PROFILE = "Incomplete";
export const MEDIAN_RATE_UPDATED = "Median hourly rate updated successfully.";
export const EXPIRED = "expired";
export const TIMESHEET_URL =
  "https://purplept-live.s3.us-west-1.amazonaws.com/images/1705039320219-192880da-25c8-4157-933f-d4cdf3468f2f/Timesheet%20Purple%20PRN.pdf";

export const LICENSE_DEFAULT_FIELDS = [
  {
    licenseExpDate: "",
    licenseNumber: "",
    state: "",
  },
];

export const CERTI_SPECIALITY_DEFAULT_FIELDS = [
  {
    name: "",
    receivedYear: "",
    description: "",
  },
];

export const ADDRESSES_DEFAULT_FIELDS = [
  {
    nickname: "",
    address1: "",
    city: "",
    state: "",
    description: "",
    zipCode: "",
  },
];

// If below url error throw of 401 or 403 we don't have to retry with refresh token
export const EXCEPT_REFRESH_TOKEN_URLS = [TIMESHEET_APPROVE.url, LOGIN_URL.url];

export const CLINICIAN_CALENDLY_LINK =
  "https://calendly.com/purple_prn/clinician";
export const FACILITY_CALENDLY_LINK =
  "https://calendly.com/purple_prn/facilitycall";

export const NOTIFICATION_FREQ_TYPES = [
  { label: "New shifts posted in your area", name: "newShiftInArea" },
  { label: "Boosted shifts in your area", name: "boostedShift" },
];
