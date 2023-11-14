const pages = {
  quickSearch: "빠른 검색 페이지 내용",
  advancedSearch: "고급 검색 페이지 내용",
  favorites: "즐겨찾기 페이지 내용",
  signup: `<form id="signup-form" action="#" method="post">
    <input type="text" name="id" placeholder="아이디">
    <input type="password" name="pw" placeholder="비밀번호">
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

// `signup` 함수를 `/signup` 경로에 연결합니다.
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  // `signup-form` 요소에 `submit` 이벤트 리스너를 연결합니다.
  signupForm.addEventListener("submit", join);
}
