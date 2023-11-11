import page from './page.mjs';
import { initializeApp } from './app.js';

function renderQuickSearchPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>빠른 검색 페이지 내용</p>";
}

function renderAdvancedSearchPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>고급 검색 페이지 내용</p>";
}

function renderFavoritesPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>즐겨찾기 페이지 내용</p>";
}

function renderSignupPage() {
  const root2 = document.getElementById("root2");
  root2.innerHTML = "<p>회원가입 페이지 내용</p>";
}


page('/', renderQuickSearchPage);
page('/advanced-search', renderAdvancedSearchPage);
page('/favorites', renderFavoritesPage);
page('/signup', renderSignupPage);
page();