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

const db = firebase.firestore(); // Firestore 연결

const pages = {
  quickSearch: "개발중 추후 구현 예정",
  advancedSearch: "개발중 추후 구현 예정",
  favorites: `
  <div id="favoritesPage">
    <h2>즐겨찾기</h2>
    <div id="favoriteStores">
      <!-- 즐겨찾기한 가게 목록이 여기에 표시될 것입니다. -->
    </div>
  </div>
`,
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

async function renderFavorites() {
  const favoritesPage = document.getElementById("favoriteStores");

  try {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userEmail = currentUser.email;
      const userRef = db.collection("users").doc(userEmail);

      const userDoc = await userRef.get();
      const userData = userDoc.data();

      if (userData) {
        // 사용자의 즐겨찾기 목록을 담을 배열
        const favorites = [];

        // userData에서 true 값인 가게명을 가져와 favorites 배열에 추가
        for (const store in userData) {
          if (userData[store] === true) {
            favorites.push(store);
          }
        }

        // favorites 배열의 각 아이템을 반복하여 목록에 추가
        favorites.forEach((store) => {
          const storeElement = document.createElement("p");
          storeElement.textContent = store;
          favoritesPage.appendChild(storeElement);
        });
      } else {
        console.log("사용자의 즐겨찾기 목록이 없습니다.");
      }
    } else {
      console.log("로그인되지 않은 사용자입니다.");
    }
  } catch (error) {
    console.error("즐겨찾기 목록을 가져오는 중 에러 발생:", error);
  }
}
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
  } else if (pageName === "favorites") {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
    } else {
      renderFavorites();
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
