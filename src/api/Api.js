/*eslint-disable */
import axios from "axios";
import { isEmpty } from "radash";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MAX_FIVE_MB_SERVER,
  TOAST_AUTO_CLOSE,
  TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  EXCEPT_REFRESH_TOKEN_URLS} from "../constants/AppConstants";
import queryString from "query-string";
import { FILE_MAX_LIMIT } from "constants/messages";
import { REFRESH_TOKEN_URL } from "constants/ApiUrls";
const URLS = new Map();
// ?reviewFor=b5c21637-3092-4d29-8d08-587c75fc8e3f
URLS.set("USER", process.env.REACT_APP_API_URL_USER);
URLS.set("MAP", process.env.REACT_APP_API_URL_MAP);

/**
 *
 * @param {Object} endpoint (One Obj get from ApiUrls)
 * @param {Object} data (data that we send in request... Generally used in POST, PUT methods)
 * @param {String} id (append data to URL...usually used tn PUT methods)
 * @param {Object} params (generates query string from the object)
 * @returns
 */
const createReqObj = (endpoint, data, id, params) => {
  const {
    method,
    isMultipart,
    url,
    module,
    responseType,
  } = endpoint;

  const token = localStorage.getItem([TOKEN_NAME]);
  const refreshToken = localStorage.getItem([REFRESH_TOKEN_NAME]);

  const obj = {
      data,
      method: method,
      headers: {
        "Content-Type": isMultipart
          ? `multipart/form-data boundary=${data._boundary}`
          : "application/json",
      },
      responseType: responseType || "",
      url:
        URLS.get(module) +
        url +
        (id ? id : "") +
        (params ? `?${queryString.stringify(params)}` : ""),
    };
    if (!responseType) {
      delete obj?.responseType;
    }
    if (method === "GET" && data && typeof data === "string") {
      obj.url += data;
    }
    if (method === "POST") {
      if (!data) data = {};
    }

    // if the api call is refresh token call attach x-refresh else only x-auth
    if (token) obj.headers["x-auth"] = token;
    if (obj.url.includes(REFRESH_TOKEN_URL.url)) obj.headers['x-refresh'] = refreshToken;

    return obj;
}

/**
 * @param {Object} endpoint (One Obj get from ApiUrls)
 * @param {Object} data (data that we send in request... Generally used in POST, PUT methods)
 * @param {String} id (append data to URL...usually used tn PUT methods)
 * @param {Object} params (generates query string from the object)
 * @returns
 */
export const api = async (endpoint, data, id = null, params = null) => {
  const {
    showToast,
    ignoreError,
  } = endpoint;
  let res = null;
  
  const mainReqObj = createReqObj(endpoint, data, id, params);

  try {
    //try to make main api call
    try {
      res = await axios(mainReqObj);
    } catch (error) {
      res = error.response;
      const { status } = res?.data;
      const url = res?.config?.url;
      const enpoint = url?.split("/api/")[1];

      // If the api respond with 401 or 403 try to make a refresh token api call
      // EXCEPT_REFRESH_TOKEN_URLS - url error throw of 401 or 403 we don't have to retry with refresh token
      if ((status === 401 || status === 403) && (!enpoint || !EXCEPT_REFRESH_TOKEN_URLS.includes(enpoint))) {
        const refreshTokenReqObj = createReqObj(REFRESH_TOKEN_URL, {});

        try {
          const tokenData = await axios(refreshTokenReqObj);
          const { token, refreshToken } = tokenData?.data?.data;

          // replace tokens with new tokens
          localStorage.setItem("purplePTAuthToken", token);
          localStorage.setItem("purplePTRefreshToken", refreshToken);

          // change the auth token in main request and try to make main request call with new token
          mainReqObj.headers['x-auth'] = token;
          res = await axios(mainReqObj);
        } catch (error) {
          throw error;
        }
      } else {
        throw error;
      }
    }
  } catch (err) {
    res = err.response;
    const url = res?.config?.url;
    const enpoint = url?.split("/api/")[1];
    const { message, status, error } = res?.data;

    // if the request status is 401 OR 403, redirect to login page
    if ((status === 401 || status === 403) && (!enpoint || !EXCEPT_REFRESH_TOKEN_URLS.includes(enpoint))) {
      localStorage.removeItem("purplePTAuthToken");
      localStorage.removeItem("purplePTRefreshToken");
      window.location.replace(`${process.env.PUBLIC_URL}/login`);
    }

    let displayMsg =
      error && typeof error === "object" && !isEmpty(error)
        ? typeof error[Object.keys(error)[0]] === "string"
          ? error[Object.keys(error)[0]]
          : error[Object.keys(error)[0]][0]
        : error && typeof error === "string"
        ? error
        : message
        ? message
        : "Something went wrong";

    try {
      !ignoreError &&
        toast.error(
          displayMsg === MAX_FIVE_MB_SERVER ? FILE_MAX_LIMIT(10) : displayMsg,
          {
            transition: Slide,
            autoClose: TOAST_AUTO_CLOSE,
          }
        );

      return {
        data: {
          error: true,
          status: status,
          message:
            displayMsg === MAX_FIVE_MB_SERVER ? FILE_MAX_LIMIT(5) : displayMsg,
        },
      };
    } catch (error) {
      return {
        data: {
          error: true,
          status: status,
          message:
            displayMsg === MAX_FIVE_MB_SERVER ? FILE_MAX_LIMIT(5) : displayMsg,
        },
      };
    }
  }

  // show sucess toast 
  if (res && res.data && res.data.status === 200 && showToast) {
    toast.success(res.data.message, {
      autoClose: TOAST_AUTO_CLOSE,
    });
  }

  // return res
  return res;
};
