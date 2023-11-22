import areaContent from "./reviewPage.js";

var mapOptions = {
  center: new naver.maps.LatLng(36.350411, 127.384547),
  zoom: 12,
};

var map = new naver.maps.Map("map", mapOptions);

function initMap() {
  let areaArr = [
    {location: "멘야이토", lat: 36.35026761782584, lng: 127.37714510689068},
    {location: "멘야산다이메", lat: 36.352281017969304, lng: 127.3773707115313},
  ];

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
}
initMap();
