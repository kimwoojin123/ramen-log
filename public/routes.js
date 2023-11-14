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

  root2.style.display = "none";
  root3.innerHTML = pages[pageName];
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const pageName = hash.substring(1);
  renderPage(pageName);
});

async function join(event) {
  event.preventDefault();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const id = params.get('id');
  const pw = params.get('pw');

  console.log('ID:', id);
  console.log('Password:', pw);

  if (id && pw) {
    try {
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

      const userDocRef = firebase.firestore().collection("users").doc("data");
      await userDocRef.set({
        id: id,
        pw: pw,
      });

      console.log('회원가입 정보가 Firestore에 추가되었습니다.');
    } catch (error) {
      console.error('회원가입 정보를 추가하는 도중 에러가 발생했습니다:', error);
    }
  } else {
    console.error('ID 또는 Password가 없습니다.');
  }
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit event triggered");
    join(event);
  });
}