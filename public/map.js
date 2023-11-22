import areaContent from "./reviewPage.js";

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
} else {
  firebase.app(); // 이미 초기화된 앱을 가져옴
}

// Firestore의 reference를 가져오기
const db = firebase.firestore();
function addLocationToFirestore(locationObj) {
  db.collection("store")
    .doc(locationObj.location) // 가게명으로 문서 생성
    .set({}) // 빈 객체를 해당 문서에 저장
    .then(() => {
      console.log("Document written with ID: ", locationObj.location);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

let areaArr = [
  {location: "멘야이토", lat: 36.35026761782584, lng: 127.37714510689068},
  {location: "멘야산다이메", lat: 36.352281017969304, lng: 127.3773707115313},
];

// 각 위치 정보를 Firestore에 추가
areaArr.forEach((location) => {
  addLocationToFirestore(location);
});

var mapOptions = {
  center: new naver.maps.LatLng(36.350411, 127.384547),
  zoom: 12,
};

var map = new naver.maps.Map("map", mapOptions);

function initMap() {
  let markers = [];
  let infoWindows = [];

  for (let i = 0; i < areaArr.length; i++) {
    var marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(areaArr[i].lat, areaArr[i].lng),
      title: areaArr[i].location,
    });
    var infoWindow = new naver.maps.InfoWindow({
      content: areaContent(areaArr[i].location),
    });
    markers.push(marker);
    infoWindows.push(infoWindow);
  }

  naver.maps.Event.addListener(map, "click", function () {
    closeAllInfoWindows();
  });

  function closeAllInfoWindows() {
    for (let i = 0; i < infoWindows.length; i++) {
      infoWindows[i].close();
    }
  }

  function clickHandler(seq) {
    return function (e) {
      let marker = markers[seq];
      let infoWindow = infoWindows[seq];
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    };
  }

  for (let i = 0; i < markers.length; i++) {
    naver.maps.Event.addListener(markers[i], "click", clickHandler(i));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
      submitButton.addEventListener("click", () => {
        const locationElement = document.getElementById("locationTitle");
        const location = locationElement.innerText.trim(); // <b> 태그 내부의 텍스트를 가져와서 위치 정보로 사용합니다.

        submitReview(location);
      });
    } else {
      console.error("#submitButton을 찾을 수 없습니다.");
    }
  });
}

initMap();

function addReviewToFirestore(location, reviewData) {
  db.collection("store")
    .doc(location) // 가게명으로 문서 참조
    .update(reviewData) // 리뷰 데이터를 해당 문서에 추가
    .then(() => {
      console.log("Review added to Firestore for: ", location);
    })
    .catch((error) => {
      console.error("Error adding review to document: ", error);
    });
}

const submitReview = (location) => {
  const select1 = document.querySelector("#select1");
  const select2 = document.querySelector("#select2");
  const select3 = document.querySelector("#select3");
  const congauge = document.querySelector("#congauge");
  const saltgauge = document.querySelector("#saltgauge");
  const textArea = document.querySelector("#textArea");

  const reviewData = {
    면굵기: select1.value,
    익힘정도: select2.value,
    스프베이스: select3.value,
    농도: congauge.value,
    염도: saltgauge.value,
    평가: textArea.value,
  };

  addReviewToFirestore(location, reviewData);
};
