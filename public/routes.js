import page from "./page.mjs";
import {initializeApp} from "./app.js";

const pages = {
  quickSearch: "빠른 검색 페이지 내용",
  advancedSearch: "고급 검색 페이지 내용",
  favorites: "즐겨찾기 페이지 내용",
  signup: "회원가입 페이지 내용",
};

function renderPage(pageName) {
  const root3 = document.getElementById("root2");
  root3.innerHTML = `<p>${pages[pageName]}</p>`;
}

page("/quickSearch", () => renderPage("quickSearch"));
page("/advanced-search", () => renderPage("advancedSearch"));
page("/favorites", () => renderPage("favorites"));
page("/signup", () => renderPage("signup"));
page();
