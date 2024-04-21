// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyB6FArB7NGFFGuJZaIxjY2rmtAkjcC_O6A',
  authDomain: 'drift-chat-abff3.firebaseapp.com',
  projectId: 'drift-chat-abff3',
  storageBucket: 'drift-chat-abff3.appspot.com',
  messagingSenderId: '686242927554',
  appId: '1:686242927554:web:4b9ce13a85b12c5f6cfc5b',
  measurementId: 'G-QTB404SQGV',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = `Title : ${payload.notification.title}`;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    // self.registration.showNotification(notificationTitle, notificationOptions);
  });