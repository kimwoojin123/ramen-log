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

// 회원가입 정보를 가져오는 함수입니다.
function getSignupInfo() {
  // `id`와 `pw` 필드의 값을 가져옵니다.
  const id = document.querySelector("input[name='id']").value;
  const pw = document.querySelector("input[name='pw']").value;

  return {
    id,
    pw,
  };
}

// 회원가입 정보를 DB에 추가하는 함수입니다.
function addSignupInfo(signupInfo) {
  // `users` 컬렉션에 새로운 문서를 추가합니다.
  firebase.firestore().collection("users").add(signupInfo);

  // 성공 메시지를 표시합니다.
  alert("회원가입에 성공했습니다.");
}

// `routes.js` 파일에 `join()` 함수를 정의합니다.
function join(event) {
  // `signupInfo`를 가져옵니다.
  const signupInfo = getSignupInfo();

  // `addSignupInfo()` 함수를 호출하여 `signupInfo`를 DB에 추가합니다.
  addSignupInfo(signupInfo);

  // 페이지 이동을 방지합니다.
  event.preventDefault();
}
