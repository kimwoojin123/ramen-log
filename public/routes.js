



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



window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const pageName = hash.substring(1);
  renderPage(pageName);
});

// 회원가입 정보를 가져오는 함수입니다.
function getSignupInfo(event) {
  const idInput = event.target.querySelector("input[name='id']");
  const pwInput = event.target.querySelector("input[name='pw']");

  if (idInput && pwInput) {
    const id = idInput.value;
    const pw = pwInput.value;
    return {id, pw};
  } else {
    return {id: "", pw: ""};
  }
}

async function join(event) {
  event.preventDefault();

  // Firebase 초기화
  firebase.initializeApp({
    apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
    authDomain: "ramen-log.firebaseapp.com",
    projectId: "ramen-log",
    storageBucket: "ramen-log.appspot.com",
    messagingSenderId: "292296321273",
    appId: "1:292296321273:web:bacc165856b927edff5a28",
    measurementId: "G-LZHR47DK5H",
  });

  // 회원가입 정보를 가져옵니다.
  const signupInfo = getSignupInfo(event);

  try {
    const userDocRef = firebase.firestore().collection("users").doc("data");
    await userDocRef.set({
      id: signupInfo.id,
      pw: signupInfo.pw,
    });

    console.log(signupInfo);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit event triggered"); // 추가된 부분
    join(event);
  });
}


const queryString = window.location.search;

// URLSearchParams를 사용하여 쿼리스트링을 분석합니다.
const params = new URLSearchParams(queryString);

// 특정 매개변수를 가져옵니다.
const id = params.get('id');
const pw = params.get('pw');

// 값을 콘솔에 출력합니다.
console.log('ID:', id);
console.log('Password:', pw);