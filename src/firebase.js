/* eslint-disable brace-style */
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// "firebase": "^9.15.0",
export const firebaseConfig = {
  apiKey: "AIzaSyCOoGeyNfgpjE9Asc8FQR_i9Y5IzFpWSpA",
  authDomain: "purple-prn-87db1.firebaseapp.com",
  projectId: "purple-prn-87db1",
  storageBucket: "purple-prn-87db1.firebasestorage.app",
  messagingSenderId: "174193739905",
  appId: "1:174193739905:web:e0acd6cfabcfca94f4e580",
  measurementId: "G-Y9CQ5CHJZ9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const messaging = getMessaging();
const publicKey = process?.env?.REACT_APP_VAPID_KEY;

export const getBrowsername = () => {
  let nAgt = navigator.userAgent;
  let browserName = "";
  let nameOffset, verOffset;

  // In Opera, the true version is after "OPR" or after "Version"
  if ((verOffset = nAgt.indexOf("OPR")) !== -1) {
    browserName = "Opera";
  }
  // In MS Edge, the true version is after "Edg" in userAgent
  else if ((verOffset = nAgt.indexOf("Edg")) !== -1) {
    browserName = "Edge";
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
    browserName = "Microsoft Internet Explorer";
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
    browserName = "Chrome";
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
    browserName = "Safari";
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
    browserName = "Firefox";
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if (
    (nameOffset = nAgt.lastIndexOf(" ") + 1) <
    (verOffset = nAgt.lastIndexOf("/"))
  ) {
    browserName = nAgt.substring(nameOffset, verOffset);
    if (browserName.toLowerCase() === browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }

  return browserName;
};

/**
 * This function registers a service worker and returns a token for Firebase messaging.
 * @returns The `requestForToken` function is returning a promise that resolves to a Firebase Cloud
 * Messaging (FCM) token. The function first registers the service worker located at
 * `/purplept/webapp/firebase-messaging-sw.js`, and then calls the `getToken` function with the
 * `messaging` object, a `vapidKey` and the `serviceWorkerRegistration` object. If the `getToken`
 */
export const requestForToken = async () => {
  let browserName = getBrowsername();
  if (browserName.toLowerCase() === "edge") {
    return null;
  }
  const swPath = "/firebase-messaging-sw.js";
  let registration = await navigator.serviceWorker.register(swPath);
  const token = await getToken(messaging, {
    vapidKey: publicKey,
    serviceWorkerRegistration: registration,
  }).catch((err) => {
    console.log("err: ", err);
    return "";
  });
  return token;
};
