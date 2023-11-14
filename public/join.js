// Firebase 프로젝트에 대한 인증 정보를 설정합니다.
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
    authDomain: "ramen-log.firebaseapp.com",
    projectId: "ramen-log",
    storageBucket: "ramen-log.appspot.com",
    messagingSenderId: "292296321273",
    appId: "1:292296321273:web:bacc165856b927edff5a28",
    measurementId: "G-LZHR47DK5H",
  });
}

// `users` 컬렉션이 존재하는지 확인합니다.
if (!firebase.firestore().collection("users").doc().exists()) {
  // `users` 컬렉션을 만듭니다.
  firebase.firestore().collection("users").create();
}

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
  firebase.firestore().collection("users").add({
    id: signupInfo.id,
    pw: signupInfo.pw,
  });

  // 성공 메시지를 표시합니다.
  alert("회원가입에 성공했습니다.");
}

// `join()` 함수를 `routes.js` 파일에서 export합니다.
export {join};

// `join()` 함수입니다.
function join(event) {
  // `event` 이벤트 객체를 사용합니다.
  event.preventDefault();

  // 회원가입 정보를 가져옵니다.
  const signupInfo = getSignupInfo();

  // `users` 컬렉션이 존재하는지 확인합니다.
  if (!firebase.firestore().collection("users").doc().exists()) {
    // `users` 컬렉션을 만듭니다.
    firebase.firestore().collection("users").create();
  }

  // 회원가입 정보를 DB에 추가합니다.
  addSignupInfo(signupInfo);
}
