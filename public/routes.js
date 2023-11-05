const router = new YourRoutingLibrary();

// 페이지 경로와 해당 페이지를 렌더링할 함수를 추가합니다.
router.addRoute('#quick-search', () => {
  renderQuickSearchPage();
});

router.addRoute('#advanced-search', () => {
  renderAdvancedSearchPage();
});

router.addRoute('#favorites', () => {
  renderFavoritesPage();
});

router.addRoute('#signup', () => {
  renderSignupPage();
});

// 기본 라우트 설정 (해시값이 없는 경우 기본 페이지 설정)
router.setDefaultRoute('#quick-search');