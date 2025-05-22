import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// "firebase": "^9.15.0",
export const firebaseConfig = {
  apiKey: "AIzaSyBbDF0YYhORgNi1WfnD6w0UPPv2jGaxRPM",
  authDomain: "purplept-dev.firebaseapp.com",
  projectId: "purplept-dev",
  storageBucket: "purplept-dev.appspot.com",
  messagingSenderId: "992699422584",
  appId: "1:992699422584:web:6b31dfa2a01a7a6a7a1a8d",
  measurementId: "G-EKE9Q07TJW",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const messaging = getMessaging();
const publicKey = process?.env?.REACT_APP_VAPID_KEY;
export const requestForToken = async () => {
  const swPath = "/firebase-messaging-sw.js";
  let registration = await navigator.serviceWorker.register(swPath);
  return await getToken(messaging, {
    vapidKey: publicKey,
    serviceWorkerRegistration: registration,
  }).catch((err) => {
    console.log(err);
    return "";
  });
};

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload);
//       resolve(payload);
//     });
//   });
