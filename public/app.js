import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const db = getFirestore();

const firebaseConfig = {
  apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
  authDomain: "ramen-log.firebaseapp.com",
  databaseURL: "https://ramen-log-default-rtdb.firebaseio.com",
  projectId: "ramen-log",
  storageBucket: "ramen-log.appspot.com",
  messagingSenderId: "292296321273",
  appId: "1:292296321273:web:bacc165856b927edff5a28",
  measurementId: "G-LZHR47DK5H",
};
const app = initializeApp(firebaseConfig);

const name = document.getElementById("name");
name.addEventListener("click", () => {
  const aTuringRef = db.collection("users").doc("aturing");
  aTuringRef.set(
    {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    },
    {merge: true}
  );
});
