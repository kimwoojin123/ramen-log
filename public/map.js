import {areaContent, createStarButton} from "./reviewPage.js";

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

const db = firebase.firestore();

function addLocationToFirestore(locationObj) {
  db.collection("store")
    .doc(locationObj.location)
    .set({})
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
  {location: "미도인 둔산점", lat: 36.3540622, lng: 127.3772998},
  {location: "로얄라멘", lat: 36.3533879, lng: 127.369888},
  {location: "라멘무라본점", lat: 36.3414282, lng: 127.3908614},
  {location: "스바라시라멘 봉명점", lat: 36.3594511, lng: 127.3443237},
  {location: "건담s", lat: 36.2955764, lng: 127.3386544},
  {location: "마쯔미라멘", lat: 36.3631243, lng: 127.3587492},
  {location: "본미당", lat: 36.33969344181235, lng: 127.3903357217206},
  {location: "쇼부라멘", lat: 36.35467888354794, lng: 127.36341807493798},
  {location: "멘무샤", lat: 36.3465578, lng: 127.3886295},
  {location: "라멘우에무라", lat: 36.42462610207738, lng: 127.39026040477499},
  {location: "그레이토라멘", lat: 36.3554323, lng: 127.3781087},
  {location: "라멘81번옥", lat: 36.36189, lng: 127.3474045},
];

areaArr.forEach((location) => {
  db.collection("store")
    .doc(location.location)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        addLocationToFirestore(location);
      }
    })
    .catch((error) => {
      console.error("Error checking document: ", error);
    });
});

var mapOptions = {
  center: new naver.maps.LatLng(36.350411, 127.384547),
  zoom: 12,
};

var map = new naver.maps.Map("map", mapOptions);
let markers = [];
let areaInfoWindows = [];

naver.maps.Event.addListener(map, "click", function () {
  closeAllInfoWindows();
});

function closeAllInfoWindows() {
  areaInfoWindows.forEach((infoWindow) => {
    infoWindow.close();
  });
}

areaArr.forEach((location, index) => {
  var marker = new naver.maps.Marker({
    map: map,
    position: new naver.maps.LatLng(location.lat, location.lng),
    title: location.location,
  });

  var infoWindow = new naver.maps.InfoWindow();
  areaInfoWindows.push(infoWindow);

  marker.addListener("click", async function () {
    const infoWindow = areaInfoWindows[index];
    if (infoWindow.getMap()) {
      infoWindow.close();
    } else {
      getReviewsForStore(location.location)
        .then(async (reviewData) => {
          if (reviewData) {
            const isFavorite = await handleFavoriteStatus(location.location);
            const content = areaContent(location.location, reviewData, isFavorite, false);
            const contentDiv = document.createElement("div");
            contentDiv.innerHTML = content;
            const infoWindowStyle = `
                max-width: 295px;
                word-wrap: break-word;
              `;
            contentDiv.setAttribute("style", infoWindowStyle);
            infoWindow.setContent(contentDiv.outerHTML);
            infoWindow.open(map, marker);

            const detailedInfoButton = infoWindow.getContentElement().querySelector("#detailedInfoButton");
            if (detailedInfoButton) {
              detailedInfoButton.addEventListener("click", () => {
                const newContent = areaContent(location.location, reviewData, isFavorite, true);
                contentDiv.innerHTML = newContent;
                infoWindow.setContent(contentDiv.outerHTML);
              });
            }

            const submitButton = infoWindow.getContentElement().querySelector("#submitButton");
            if (submitButton) {
              submitButton.addEventListener("click", () => {
                const currentUser = firebase.auth().currentUser;
                if (currentUser) {
                  const selectedLocation = location.location;

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
                  const reviewerEmail = firebase.auth().currentUser.email;
                  addReviewToFirestore(selectedLocation, reviewData, reviewerEmail);
                  alert("리뷰가 작성되었습니다.");
                } else {
                  alert("로그인 해주세요.");
                }
              });
            } else {
              console.error("submitButton 없음");
            }
          }
          const starButton = document.getElementById(`starButton_${location.location}`);
          if (starButton) {
            handleFavoriteStatus(location.location, starButton);
            starButton.addEventListener("click", async () => {
              const currentUser = firebase.auth().currentUser;
              if (currentUser) {
                const userEmail = currentUser.email;
                const userRef = db.collection("users").doc(userEmail);

                const userDoc = await userRef.get();
                const userData = userDoc.data();
                const isFavorite = starButton.classList.contains("favorite");

                if (userData && userData[location.location]) {
                  starButton.classList.add("favorite");
                  starButton.innerHTML = "★"; // 즐겨찾기일 때 채워진 별로 변경
                  starButton.style.color = "yellow"; // 즐겨찾기일 때 별 색상을 변경
                } else {
                  starButton.classList.remove("favorite");
                  starButton.innerHTML = "☆"; // 즐겨찾기가 아닐 때 빈 별로 변경
                  starButton.style.color = "black"; // 즐겨찾기가 아닐 때 별 색상을 변경
                }

                if (isFavorite) {
                  // 이미 즐겨찾기된 상태이므로 제거
                  await userRef.update({
                    [location.location]: firebase.firestore.FieldValue.delete(),
                  });
                } else {
                  // 즐겨찾기 추가
                  await userRef.update({
                    [location.location]: true,
                  });
                }
              } else {
                // 로그인되어 있지 않은 경우 처리
                alert("로그인 해주세요.");
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error getting reviews:", error);
        });
    }
  });
  markers.push(marker);
});

function addReviewToFirestore(location, reviewData, reviewerId) {
  const docRef = db.collection("store").doc(location);
  docRef
    .set({[reviewerId]: reviewData}, {merge: true}) // 새로운 문서를 생성하고 리뷰 데이터를 추가 또는 업데이트
    .then(() => {
      console.log("Review added to Firestore for: ", location);
    })
    .catch((error) => {
      console.error("Error adding review to document: ", error);
    });
}

async function getReviewsForStore(storeName) {
  const docRef = db.collection("store").doc(storeName);
  const doc = await docRef.get();

  if (doc.exists) {
    return doc.data(); // 해당 가게의 리뷰 데이터 반환
  } else {
    console.log("No such document!");
    return null;
  }
}

async function handleFavoriteStatus(location, starButton) {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const userEmail = currentUser.email;
    const userRef = db.collection("users").doc(userEmail);

    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      try {
        await userRef.set({}); // 현재 로그인한 사용자의 데이터 문서 생성
        console.log("Document created for user:", userEmail);
      } catch (error) {
        console.error("Error creating document:", error);
      }
    }

    const unsubscribe = userRef.onSnapshot((snapshot) => {
      const userData = snapshot.data();

      if (userData && userData[location]) {
        starButton.classList.add("favorite");
        starButton.innerHTML = "★";
        starButton.style.color = "yellow";
      } else {
        starButton.classList.remove("favorite");
        starButton.innerHTML = "☆";
        starButton.style.color = "black";
      }
    });

    // 이전에 등록된 리스너를 제거하는 코드
    if (location in unsubscribe) {
      unsubscribe[location]();
    }
  }
}
