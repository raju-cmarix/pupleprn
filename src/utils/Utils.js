import axios from "axios";

import { api } from "api/Api";
import { ADD_DEVICE_TOKEN } from "constants/ApiUrls";
import {
  DEFAULT_TIMEZONE,
  GeocodeAPIKey,
  LOCALSTORAGEDEVICEID,
  LOCALSTORAGEDEVICETOKEN,
  ROLE_CLINICIAN,
  ROLE_FACILITY,
} from "constants/AppConstants";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { getBrowsername, requestForToken } from "firebase";
import queryString from "query-string";
import { capitalize, isEmpty, sort } from "radash";

dayjs.extend(timezone);
dayjs.extend(utc);

export const timeZone = () => dayjs.tz.guess() || DEFAULT_TIMEZONE;
// export const timeZone = () => "America/Chicago";

// whenever we try to write times in input it changes to current date -  this function takes care of that issue
export const handleDateChange = (selectedDate, actualDate) => {
  try {
    if (
      selectedDate &&
      dayjs(selectedDate).isValid() &&
      dayjs(actualDate).isValid()
    ) {
      // Parse both dates as UTC
      const updatedDate = dayjs(selectedDate)
        .date(dayjs(actualDate).date())
        .month(dayjs(actualDate).month())
        .year(dayjs(actualDate).year());

      return updatedDate.toDate();
    }
  } catch (error) {
    console.error("Error in handleDateChange: ", error);
  }
};

export const getRouteFromRole = ({ roles, clinicianId, facilityId }) => {
  if (!roles) return;
  let nav;
  if (ROLE_CLINICIAN.includes(roles)) {
    nav = clinicianId?.isSignupCompleted
      ? "/clinician/jobboard"
      : `/clinician/signup?step=${(clinicianId?.signupStageCount === 4 ? 1 : 0 || 0) + 1}`;
  } else if (ROLE_FACILITY.includes(roles)) {
    nav = facilityId?.isSignupCompleted
      ? "/facility/shiftmanagement"
      : `/facility/signup?step=${(facilityId?.signupStageCount || 0) + 1}`;
  } else {
    nav = "/admin/users";
  }
  return nav;
};

export const findAndReplace = (arr, replaceKey, replaceValue) => {
  arr = arr.map(function (item) {
    return item === replaceKey ? replaceValue : item;
  });
  return arr;
};

export const getFullName = (user) => {
  if (!user || isEmpty(user)) return "-";
  return `${user.firstName}  ${user.lastName}`;
};
// export const DEFAULT_DATE_FORMAT = "MMM DD, YYYY";
// export const DEFAULT_TIME_FORMAT = "hh:mm a";
export const DEFAULT_DATE_FORMAT = "dddd, M/DD/YYYY";
export const DATE_FORMAT = "M/DD/YYYY";
export const ADMIN_DATE_FORMAT = "MM/DD";

export const DEFAULT_TIME_FORMAT = (d = new Date()) => "h:mm a";
export const getDateFormat = (date, formatVal = null) => {
  return dayjs(date)
    .tz(timeZone())
    .format(formatVal || DATE_FORMAT);
};

export const getAdminDateFormat = (date, formatVal = null) => {
  return dayjs(date).format(formatVal || ADMIN_DATE_FORMAT);
};

export const convertDateToServerDate = (date) => {
  if (!date) return null;
  return dayjs(date).unix().toString();
};

export const convertServerDateToDate = (date) => {
  return date ? new Date(parseInt(date)) : null;
};

export const getOtherDataFromList = (arrOfObj, arr) => {
  return arr.find((a) => !arrOfObj.find((o) => o.value === a));
};
export const getLocation = (data) => {
  if (!data || isEmpty(data)) return "";

  return `${data.jobAddress1 ? data.jobAddress1 : ""}${
    data.jobAddress1 && data.jobAddress2 ? ", " + data.jobAddress2 : ""
  }${
    (data.jobAddress1 || data.jobAddress2) && data.city ? ", " + data.city : ""
  }${
    (data.jobAddress1 || data.jobAddress2) && data.state
      ? ", " + data.state
      : ""
  }${
    (data.jobAddress1 || data.jobAddress2 || data.state) && data.zipCode
      ? " - " + data.zipCode
      : ""
  }`;
};
export const compareSimpleObjs = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const convertArrayToString = (arr) => {
  if (!arr || !arr.length) return "";
  return arr.join(", ");
};

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export const getDynamicFilter = (label) => {
  if (!label) return undefined;
  return capitalize(label.replace(":", ""));
};

export const cloneDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const convertCodeToBlankSpace = (text) => {
  if (!text) return "";
  return text
    .replaceAll("%20", " ")
    .replaceAll("%28", "(")
    .replaceAll("%29", ")");
};

export const getLatLng = async (address) => {
  address = address.replaceAll(/[^A-Za-z0-9\s]/g, "");
  const params = {
    address: address,
    // key: process.env.REACT_APP_GOOGLE_API_KEY,
    key: GeocodeAPIKey,
  };
  const data = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json?" +
      queryString.stringify(params),
  );

  let responseData = await data.data;

  return responseData;
};

export const getTimeZone = async (lat, lng) => {
  const params = {
    location: `${lat},${lng}`,
    timestamp: Math.floor(Date.now() / 1000),
    key: GeocodeAPIKey,
  };
  queryString.stringify(params);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?${queryString.stringify(
      params,
    )}`,
  );

  const data = await response.json();
  return data.timeZoneId; // Time zone ID for the location
};

// Below function merge utc date with timezone with timepicker date and minutes
export const mergeDateAndTime = (date, dateTimezone, enteredTime) => {
  dateTimezone = dateTimezone ?? DEFAULT_TIMEZONE;
  if (!date || !enteredTime) return null;

  enteredTime = new Date(enteredTime);
  return dayjs
    .utc(date)
    .tz(dateTimezone)
    .set("hour", enteredTime.getHours())
    .set("minute", enteredTime.getMinutes())
    .set("second", 0)
    .set("millisecond", 0)
    .valueOf();
};

/**
 * @name truncateToMinute
 * @param timestamp
 * @description This method will truncate the timestamp in to minutes
 * @author Kasif Mansuri(Zignuts)
 */
const truncateToMinute = (timestamp) => {
  return Math.floor(timestamp / 1000 / 60) * 60 * 1000;
};

/**
 * @name totalWorkedHours
 * @param timesheetData
 * @description This method will return total worked hours based on time
 * @author Kasif Mansuri(Zignuts)
 */
export const totalWorkedHours = (timesheet) => {
  if (isNaN(timesheet.startTime) || isNaN(timesheet.endTime)) {
    return null;
  }

  const startTime = truncateToMinute(timesheet.startTime);
  const endTime = truncateToMinute(timesheet.endTime);
  const breakStartTime = timesheet.breakStartTime
    ? truncateToMinute(timesheet.breakStartTime)
    : null;
  const breakEndTime = timesheet.breakEndTime
    ? truncateToMinute(timesheet.breakEndTime)
    : null;

  // Calculate total shift duration (in minutes)
  const totalShiftDuration = (endTime - startTime) / 1000 / 60;

  // Calculate total break duration (in minutes)
  let totalBreakDuration = 0;
  if (breakStartTime && breakEndTime && breakEndTime > breakStartTime) {
    totalBreakDuration = (breakEndTime - breakStartTime) / 1000 / 60;
  }

  // Calculate total worked hours (excluding break time)
  let totalWorkedHours = totalShiftDuration - totalBreakDuration;

  return `${parseInt(totalWorkedHours / 60)} Hours, ${parseInt(
    totalWorkedHours % 60,
  )} Minutes`;
};

// Below function used to fill data in FormTimePicker with consideration of timezone
export function setTimeField(timestamp, timezone) {
  if (!timestamp) {
    return "";
  }

  const dateInTimeZone = dayjs.utc(timestamp).tz(timezone ?? DEFAULT_TIMEZONE);

  const dateObject = new Date();
  dateObject.setHours(dateInTimeZone.hour(), dateInTimeZone.minute(), 0, 0);

  return dateObject.getTime();
}

export const localStorageDeviceToken = () =>
  localStorage.getItem(LOCALSTORAGEDEVICETOKEN) || "";

export const newDeviceToken = async (user) => {
  if (!localStorageDeviceToken()) {
    try {
      const token = await requestForToken();
      if (token) {
        localStorage.setItem(LOCALSTORAGEDEVICETOKEN, token);
        const localStorageData = {
          ...JSON.parse(
            localStorage?.getItem(`${LOCALSTORAGEDEVICEID}_${user?.email}`),
          ),
        };
        let browserName = getBrowsername();
        if (browserName.toLowerCase() === "edge") {
          browserName = null;
        }

        // Send new token to server
        await api(ADD_DEVICE_TOKEN, {
          userId: user?.subUserId || user.id,
          deviceId: localStorageData.deviceId,
          deviceToken: token,
          osType: browserName,
        });
      }
    } catch (err) {}
  }
};

export const removeOther = (arr) => {
  return arr.filter((val) => val !== "Other");
};
export const getFileExtension = (src) => {
  if (!src) return null;
  return src.split(".").pop().toLowerCase();
};

/**
 * The function `updateEndDateWithEndTime` takes an array of time slots and updates the end date of
 * each slot by combining the date part of the start date with the time part of the end date.
 * @param timeSlots - An array of objects representing time slots. Each object has the following
 * properties:
 * @returns an array of time slots with updated end dates.
 */
export const updateEndDateWithEndTime = (timeSlots) => {
  return timeSlots.map((slot) => {
    const startDate = new Date(slot.startDate);
    const endDate = new Date(slot.endDate);

    // Extract date part from startDate
    const startDateDatePart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );

    // Combine date part of startDate with time part of endDate
    const updatedEndDate = new Date(
      startDateDatePart.getFullYear(),
      startDateDatePart.getMonth(),
      startDateDatePart.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
      endDate.getSeconds(),
    );

    // Set the updated endDate in the slot object
    slot.endDate = updatedEndDate?.getTime();
    slot.startDate = startDate?.getTime();
    return slot;
  });
};

/**
 * The function `updateEndDateWithEndTimeEvery` takes an array of time slots and updates the end date
 * of each slot by combining the date part of the start date with the time part of the end date.
 * @param timeSlots - An array of objects representing time slots. Each object should have the
 * following properties:
 * @returns an array of time slots with the endDate property updated to include the time part from the
 * startDate property.
 */
export const updateEndDateWithEndTimeEvery = (timeSlots) => {
  return timeSlots.map((slot) => {
    const startDate = new Date(slot.startDate);
    const endDate = new Date(slot.endDate);

    // Extract date part from startDate
    const startDateDatePart = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );

    // Combine date part of startDate with time part of endDate
    const updatedEndDate = new Date(
      startDateDatePart.getFullYear(),
      startDateDatePart.getMonth(),
      startDateDatePart.getDate(),
      endDate.getHours(),
      endDate.getMinutes(),
      endDate.getSeconds(),
    );

    // Set the updated endDate in the slot object
    slot.endDate = updatedEndDate;
    slot.startDate = startDate;
    return slot;
  });
};

export const getLabelDate = (arr, serverDate, timeZone) => {
  timeZone = timeZone ?? timeZone();
  let clonedArr = [];
  if (arr) {
    clonedArr = JSON.parse(JSON.stringify(arr));
  }
  clonedArr = sort(clonedArr, (f) => f.sortOrder);

  let dateString = clonedArr.reduce((dateString, currentDate, index) => {
    let date = dayjs(
      serverDate ? currentDate.startDate * 1000 : currentDate.startDate,
    )
      ?.tz(timeZone)
      .format(DEFAULT_DATE_FORMAT);
    let startTime = dayjs(
      serverDate ? currentDate.startDate * 1000 : currentDate.startDate,
    )
      ?.tz(timeZone)
      .format(
        DEFAULT_TIME_FORMAT(
          serverDate ? currentDate.startDate * 1000 : currentDate.startDate,
        ),
      );
    let endTime = dayjs(
      serverDate ? currentDate.endDate * 1000 : currentDate.endDate,
    )
      ?.tz(timeZone)
      .format(
        DEFAULT_TIME_FORMAT(
          serverDate ? currentDate.endDate * 1000 : currentDate.endDate,
        ),
      );
    let coma = index !== 0 ? ",\n" : "";
    return `${dateString}${coma}${date} ${startTime} - ${endTime}`;
  }, "");

  return dateString;
};

export function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getErrorMessage(errors, name) {
  if (!errors || !name) return undefined;
  const keys = name.split(".");
  return keys.reduce((acc, key) => acc && acc[key], errors)?.message;
}
