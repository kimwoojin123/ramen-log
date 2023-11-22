const pages = {
  quickSearch: "빠른 검색 페이지 내용",
  advancedSearch: "고급 검색 페이지 내용",
  favorites: "즐겨찾기 페이지 내용",
  signup: `<form id="signup-form" action="/">
    <input type="text" name="email" id="email" placeholder="이메일"><br>
    <input type="password" name="pw" id="pw" placeholder="비밀번호"><br>
    <input type="submit" value="가입">
    </form>`,
  login: `<form id="login-form" action="/">
    <input type="text" name="email" id="email" placeholder="이메일"><br>
    <input type="password" name="pw" id="pw" placeholder="비밀번호"><br><br>
    <input type="submit" value="로그인">
  </form>`,
};

function renderPage(pageName) {
  const root2 = document.getElementById("root2");
  const root3 = document.getElementById("root3");

  // 맵을 숨김
  root2.style.display = "none";
  // 내용을 표시
  root3.innerHTML = pages[pageName];
  if (pageName === "signup") {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", join); // submit 이벤트 핸들러로 join 함수 연결
    }
  } else if (pageName === "login") {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", loginUser);
    }
  }
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  const pageName = hash.substring(1);
  renderPage(pageName);
});

async function join(event) {
  event.preventDefault();

  const email = document.getElementById("email").value; // 아이디 입력값 가져오기
  const pw = document.getElementById("pw").value; // 비밀번호 입력값 가져오기

  if (email && pw) {
    try {
      // Firebase 초기화
      const firebaseConfig = {
        apiKey: "AIzaSyBxyxuRlvxV3KsA4KErPwlZCPhbsHDN-IU",
        authDomain: "ramen-log.firebaseapp.com",
        projectId: "ramen-log",
        storageBucket: "ramen-log.appspot.com",
        messagingSenderId: "292296321273",
        appId: "1:292296321273:web:bacc165856b927edff5a28",
        measurementId: "G-LZHR47DK5H",
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, pw);
      if (userCredential) {
        // 회원가입 성공 시 로직
        console.log("회원가입 성공:", userCredential.user);

        alert("회원가입이 완료되었습니다.");
        // 확인을 누르면 메인 페이지로 이동
        window.location.href = "/";
      }
    } catch (error) {
      console.error("회원가입 정보를 추가하는 도중 에러가 발생했습니다:", error);
    }
  } else {
    console.error("ID 또는 Password가 없습니다.");
  }
}

async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const pw = document.getElementById("pw").value;

  if (email && pw) {
    try {
      const firebaseConfig = {
        // Firebase 설정 정보
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, pw);
      if (userCredential) {
        // 로그인 성공 시 로직
        console.log("로그인 성공:", userCredential.user);

        alert("로그인 되었습니다.");
        // 확인을 누르면 메인 페이지로 이동
        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그인 중 에러가 발생했습니다:", error);
    }
  } else {
    console.error("ID 또는 Password가 없습니다.");
  }
}
