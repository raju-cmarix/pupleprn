// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCOoGeyNfgpjE9Asc8FQR_i9Y5IzFpWSpA",
  authDomain: "purple-prn-87db1.firebaseapp.com",
  projectId: "purple-prn-87db1",
  storageBucket: "purple-prn-87db1.firebasestorage.app",
  messagingSenderId: "174193739905",
  appId: "1:174193739905:web:e0acd6cfabcfca94f4e580",
  measurementId: "G-Y9CQ5CHJZ9",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
