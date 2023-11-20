document.addEventListener('DOMContentLoaded', function() {
  const loadEl = document.querySelector('#load');
  try {
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
      const app = firebase.initializeApp(firebaseConfig);

      let features = [
        'auth', 
        'database', 
        'firestore',
        'functions',
        'messaging', 
        'storage', 
        'analytics', 
        'remoteConfig',
        'performance',
      ].filter(feature => typeof app[feature] === 'function');

      loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;

      // Firebase 초기화 이후에 사용자 상태 변경 감지 및 이메일 표시
      firebase.auth().onAuthStateChanged((user) => {
        displayUserEmail(user); // 사용자 이메일 표시 함수 호출
      });

    } else {
      const app = firebase.app(); // 이미 초기화된 Firebase 앱 가져오기
      let features = [
        'auth', 
        'database', 
        'firestore',
        'functions',
        'messaging', 
        'storage', 
        'analytics', 
        'remoteConfig',
        'performance',
      ].filter(feature => typeof app[feature] === 'function');
      loadEl.textContent = `Firebase SDK already initialized with ${features.join(', ')}`;

      // Firebase 초기화 이후에 사용자 상태 변경 감지 및 이메일 표시
      firebase.auth().onAuthStateChanged((user) => {
        displayUserEmail(user); // 사용자 이메일 표시 함수 호출
      });
    }
  } catch (e) {
    console.error(e);
    loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
  }

  // 사용자 이메일 표시 함수
  function displayUserEmail(user) {
    const userEmailElement = document.getElementById("userEmail");
    if (user) {
      userEmailElement.textContent = user.email; // 사용자 이메일 표시
      const loginLink = document.querySelector('.menu ul li:nth-child(5) a');
      loginLink.textContent = "로그아웃"; // 로그인 링크를 로그아웃으로 변경
      loginLink.setAttribute('href', '#logout'); // 로그아웃 링크로 변경
    } else {
      userEmailElement.textContent = ''; // 이메일이 없으면 공백으로 표시
      const loginLink = document.querySelector('.menu ul li:nth-child(5) a');
      loginLink.textContent = "로그인"; // 로그아웃 링크를 로그인으로 변경
      loginLink.setAttribute('href', '#login'); // 로그인 링크로 변경
    }
  }
});