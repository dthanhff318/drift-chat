import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB6FArB7NGFFGuJZaIxjY2rmtAkjcC_O6A',
  authDomain: 'drift-chat-abff3.firebaseapp.com',
  projectId: 'drift-chat-abff3',
  storageBucket: 'drift-chat-abff3.appspot.com',
  messagingSenderId: '686242927554',
  appId: '1:686242927554:web:4b9ce13a85b12c5f6cfc5b',
  measurementId: 'G-QTB404SQGV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
