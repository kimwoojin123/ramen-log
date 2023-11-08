function initializeApp() {
  // Firebase 프로젝트 설정 객체
  const firebaseConfig = {
    apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
    authDomain: "ramen-log.firebaseapp.com",
    projectId: "ramen-log",
    storageBucket: "ramen-log.appspot.com",
    messagingSenderId: "292296321273",
    appId: "1:292296321273:web:bacc165856b927edff5a28",
    measurementId: "G-LZHR47DK5H",
  };
}
// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const firestore = firebase.firestore();

function renderQuickSearchPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>빠른 검색 페이지 내용</p>";
}

function renderAdvancedSearchPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = `<p>고급 검색 페이지 내용</p>`;
}

function renderFavoritesPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>즐겨찾기 페이지 내용</p>";
}

function renderSignupPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>회원가입 페이지 내용</p>";
}
