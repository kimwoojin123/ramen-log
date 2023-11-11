
import './routes.js';
import firebase from 'firebase/app.js';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
  authDomain: "ramen-log.firebaseapp.com",
  projectId: "ramen-log",
  storageBucket: "ramen-log.appspot.com",
  messagingSenderId: "292296321273",
  appId: "1:292296321273:web:bacc165856b927edff5a28",
  measurementId: "G-LZHR47DK5H",
};

// initializeApp 함수 정의
export function initializeApp() {
  // Firebase 초기화
  firebase.initializeApp(firebaseConfig);
}

// DOMContentLoaded 이벤트에 initializeApp 함수를 호출하는 부분을 이동
document.addEventListener("DOMContentLoaded", initializeApp);

// 나머지 코드는 그대로 유지
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