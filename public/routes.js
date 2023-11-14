// Firebase 프로젝트에 대한 인증 정보를 설정합니다.
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
//     authDomain: "ramen-log.firebaseapp.com",
//     projectId: "ramen-log",
//     storageBucket: "ramen-log.appspot.com",
//     messagingSenderId: "292296321273",
//     appId: "1:292296321273:web:bacc165856b927edff5a28",
//     measurementId: "G-LZHR47DK5H",
//   });
// }

const pages = {
  quickSearch: "빠른 검색 페이지 내용",
  advancedSearch: "고급 검색 페이지 내용",
  favorites: "즐겨찾기 페이지 내용",
  signup: `<form id="signup-form" action="/">
    <input type="text" name="id" id="id" placeholder="아이디">
    <input type="password" name="pw" id="pw" placeholder="비밀번호">
    <input type="submit" value="가입">
    </form>`,
};
function renderPage(pageName) {
  const root2 = document.getElementById("root2");
  const root3 = document.getElementById("root3");

  // 맵을 숨김
  root2.style.display = "none";
  // 내용을 표시
  root3.innerHTML = pages[pageName];
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", join);
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const pageName = hash.substring(1);
  renderPage(pageName);
});

// 회원가입 정보를 가져오는 함수입니다.
function getSignupInfo() {
  const idInput = document.getElementById("id");
  const pwInput = document.getElementById("pw");

  if (idInput && pwInput) {
    const id = idInput.value;
    const pw = pwInput.value;
    return {id, pw};
  } else {
    return {id: "", pw: ""};
  }
}
console.log(getSignupInfo());
// `join()` 함수입니다.
function join(event) {
  // `event` 이벤트 객체를 사용합니다.
  event.preventDefault();

  // 회원가입 정보를 가져옵니다.
  const signupInfo = getSignupInfo();

  // `users` 컬렉션 내에 새로운 문서를 생성합니다.
  const userDocRef = firebase.firestore().collection("users").doc("data");

  // 새로운 문서에 회원가입 정보를 추가합니다.
  userDocRef.set({
    id: signupInfo.id,
    pw: signupInfo.pw,
  });
}
