import "./routes.js";
import {initializeApp} from "firebase-admin";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// DOMContentLoaded 이벤트에 initializeApp 함수를 호출하는 부분을 이동
document.addEventListener("DOMContentLoaded", initializeApp(firebaseConfig));
