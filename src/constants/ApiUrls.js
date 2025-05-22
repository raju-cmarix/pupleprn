/**
 * url: backend url endpoint
 * method: (post, get, delete, PUT, PATCH)

 * isMultipart: if form contains files
 * showToast: to show success/ error toast notification or not
 */

// Auth Routes
export const SIGNUP_URL = {
  url: "signup-user",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const FACILITY_SIGNUP_URL = {
  url: "add-facility",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const CLINICIAN_SIGNUP_URL = {
  url: "add-clinician",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const TERMS_AND_CONDITION_URL = {
  url: "accept-term",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const FILE_UPLOAD_URL = {
  url: "add-file",
  method: "post",
  isMultipart: true,
  showToast: false,
  module: "USER",
};

export const DELETE_FILE_URL = {
  url: "remove-file",
  method: "delete",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const LOGIN_URL = {
  url: "user-login",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const RESEND_CODE_URL = {
  url: "resend-otp",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const VERIFICATION_CODE_URL = {
  url: "verify-otp",
  method: "get",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const LOGIN_URL_SILENT = {
  url: "user-login",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const LOGOUT_URL = {
  url: "user-logout",
  method: "PATCH",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const LAST_JOB_POSTED = {
  url: "facility/last-posted-job/",
  method: "GET",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_LOGIN_DATA_URL = {
  url: "check-token",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const REFRESH_TOKEN_URL = {
  url: "user/refreshToken",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const FORGOT_PASSWORD_URL = {
  url: "forget-pass",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const RESET_PASSWORD_URL = {
  url: "reset-pass",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const CHANGE_PASSWORD_URL = {
  url: "change-pass",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const RESET_FACILITY_PASSWORD_URL = {
  url: "facility/password-reset/",
  method: "get",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_CLINICIAN_DATA = {
  url: "get-clinician",
  method: "get",
  showToast: false,
  module: "USER",
};
export const GET_FACILITY_DATA = {
  url: "get-facility",
  method: "get",
  showToast: false,
  module: "USER",
};
export const USER_LIST_URL = {
  url: "user-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const EDIT_CLINICIAN_DATA = {
  url: "edit-clinician",
  method: "PATCH",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const UPDATE_FACILITY_URL = {
  url: "edit-facility",
  method: "PATCH",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const ADMIN_HOURLY_RATE = {
  url: "admin/hourly-rate",
  method: "PATCH",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const EMAIL_CHECK_URL = {
  url: "email-check",
  method: "POST",
  isMultipart: false,
  showToast: false,
  module: "USER",
  ignoreError: true,
};
export const CONTACT_US_URL = {
  url: "contect-us",
  method: "POST",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const CONTACT_US_CITY_URL = {
  url: "request-us",
  method: "POST",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const ADD_JOB_POST_URL = {
  url: "add-jobs",
  method: "POST",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_FACILITY_JOB_POST_URL = {
  url: "facility-job-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const ADMIN_EDIT_JOB_POST_DETAILS_URL = {
  url: "admin/update-jobs",
  method: "PATCH",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_CONFIRMED_SHIFTS_URL = {
  url: "get-confirmed-shifts",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const GET_ALL_JOB_POST_URL = {
  url: "admin-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const DELETE_FACILITY_JOB_URL = {
  url: "delete-job",
  method: "delete",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_CLINICIAN_JOB_POST_URL = {
  url: "clinician-job-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const APPLY_FOR_JOB_URL = {
  url: "job-apply",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_JOB_BY_ID_URL = {
  url: "get-job",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_APPLICANTS_LIST_URL = {
  url: "get-applicants",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const APPROVE_REJECT_APPLICANT_URL = {
  url: "update-application",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const APPROVE_REJECT_APPLICANT_URL_SILENT = {
  url: "update-application",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const FEEDBACK_POST_URL = {
  url: "add-feedback",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const UPDATE_JOB_URL = {
  url: "update-jobs",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const MASS_UPDATE_JOB_URL = {
  url: "mass-update-jobs",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const FEEDBACK_GET_URL = {
  url: "get-reviews",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const ADD_UPDATE_TIMECARD_URL = {
  url: "upload-timcard",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_MY_EARNING_URL = {
  url: "clinician-earnings",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
// /clinician-job-list?skip=0&limit=60
export const GET_CLINICIAN_JOB_LIST = {
  url: "get-clinician-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_NOTIFICATIONS = {
  url: "list-user-notifications",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
//Only this API URL contains on patch showToast : false
export const READ_NOTIFICATION = {
  url: "notification-mark-read",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const READ_ALL_NOTIFICATION = {
  url: "notification-mark-all-as-reads",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const CLINICIAN_REMOVE_APPLICATION = {
  url: "remove-application",
  method: "PATCH"?.toLowerCase(),
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_LAT_LNG_URL = {
  url: "",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "MAP",
};

export const ADD_CARD = {
  url: "add-cards",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const ADD_ACCOUNT = {
  url: "add-account",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_CARDS = {
  url: "card-list",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_ACCOUNTS = {
  url: "list-accounts",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const APPROVE_REJECT_BY_ADMIN_URL = {
  url: "login-request",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const ADD_RECEIPT_URL = {
  url: "upload-invoice",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const DELETE_CARD = {
  url: "delete-card",
  method: "delete",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const MEDIAN_RATES = {
  url: "all-median-rate",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const ADD_MEDIAN_RATES = {
  url: "add-median-rate",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const UPDATE_MEDIAN_RATES = {
  url: "median-rate/",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const DELETE_MEDIAN_RATES = {
  url: "median-rate/",
  method: "delete",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_MEDIAN_WAGE = {
  url: "median-rate",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const DELETE_ACCOUNT = {
  url: "delete-account",
  method: "delete",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const UPDATE_APPLICANTS_URL = {
  url: "update-applicants",
  method: "patch",

  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const PRIMARY_CARD = {
  url: "primary-card",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const PRIMARY_ACCOUNT = {
  url: "set-default-account",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const UPDATE_ADMIN_PROFILE_URL = {
  url: "update-user",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const CREATE_CHAT_ROOM_URL = {
  url: "create-room",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_USER_ROOM_URL = {
  url: "get-user-room",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_MESSAGES_URL = {
  url: "get-messages",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const SEND_MESSAGE_URL = {
  url: "add-message",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_TRANSACTIONS = {
  url: "get-transactions",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_CLINICIAN_TRANSACTIONS = {
  url: "clinician-transactions",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const STRIPE_CONNECT = {
  url: "connect-account",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_BANK_ACCOUNTS = {
  url: "get-account",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_PAYMENT_RECEIPT = {
  url: "generate-receipt",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
  responseType: "blob",
};

export const READ_MESSAGES = {
  url: "read-message",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const POST_CUSTOM_PIXEL_PAGE_VIEW = {
  url: "add-event",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const MARK_AS_READ_ALL_NOTIFICATIONS = {
  url: "/notification-mark-all-as-read",
  method: "patch",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const ADMIN_CANCEL_SHIFT = {
  url: "cancel-shift",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const GET_ACH_PAYMENT_URL = {
  url: "add-stripe-bank",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

//2FA apis

export const ADMIN_2FA_ENABLE = {
  url: "enable2FA",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};
export const ADMIN_2FA_VERIFY = {
  url: "verify2FA",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const ADMIN_2FA_DISABLE = {
  url: "disable2FA",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};
export const ADMIN_CANEL_JOB = {
  url: "admin-cancel-job/",
  method: "delete",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const UPDATE_CLINICIAN_CSV_FILE = {
  url: "/clinician/update-agreement",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const UPLOAD_TIMESHEET = {
  url: "timesheet",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const GET_UPLOADED_TIMESHEET = {
  url: "timesheet/",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const UPDATE_TIMESHEET = {
  url: "timesheet/",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const DELETE_TIMESHEET = {
  url: "timesheet/",
  method: "delete",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const FACILITY_UPDATE_TIMESHEET_STATUS = {
  url: "timesheet/update-status",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const TIMESHEET_APPROVE = {
  url: "timesheet/approve",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const ADMIN_INVOICE_LISTING = {
  url: "admin/invoice",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const ADMIN_UPDATE_INVOICE_PAYMENT_STATUS = {
  url: "admin/update-payment",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const ADD_DEVICE_TOKEN = {
  url: "add-device-token",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const GET_SUB_USERS = {
  url: "sub-user",
  method: "get",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const ADD_SUB_USER = {
  url: "sub-user",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const UPDATE_SUB_USER = {
  url: "sub-user",
  method: "patch",
  isMultipart: false,
  showToast: true,
  module: "USER",
};

export const CLINICIAN_PROFILE_DOWNLOAD = {
  url: "clinician/download-profile",
  method: "get",
  isMultipart: false,
  showToast: true,
  module: "USER",
  responseType: "blob",
};

export const CLINICIAN_NOTIFICATION_SETTING_UPDATE = {
  url: "clinician/update-notification-setting",
  method: "post",
  isMultipart: false,
  showToast: false,
  module: "USER",
};

export const CLINICIAN_NOTIFICATION = {
  url: "clinician/notification",
  method: "post",
  isMultipart: false,
  showToast: true,
  module: "USER",
};