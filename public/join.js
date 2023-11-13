import firebase from "firebase";

// Firebase 프로젝트에 대한 인증 정보를 설정합니다.
firebase.initializeApp({
  apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
  authDomain: "ramen-log.firebaseapp.com",
  projectId: "ramen-log",
  storageBucket: "ramen-log.appspot.com",
  messagingSenderId: "292296321273",
  appId: "1:292296321273:web:bacc165856b927edff5a28",
  measurementId: "G-LZHR47DK5H",
});

// 회원정보 저장 DB를 만듭니다.
const usersDb = firebase.firestore().collection("users");

// 회원가입 페이지에서 POST 요청을 받았을 때 실행되는 함수입니다.
function signup(event) {
  // `id`와 `pw` 필드의 값을 가져옵니다.
  const id = event.target.elements.namedItem("id").value;
  const pw = event.target.elements.namedItem("pw").value;

  // `users` 컬렉션에 새로운 문서를 추가합니다.
  usersDb.add({
    id: id,
    pw: pw,
  });
}

// 회원가입 페이지에서 POST 요청을 받았을 때 실행되도록 이벤트 리스너를 설정합니다.
document.querySelector("form").addEventListener("submit", signup);
