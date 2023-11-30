const createStarButton = (location, isFavorite) => {
  const starButton = document.createElement("button");
  starButton.classList.add("star-btn");
  starButton.style.backgroundColor = "transparent";
  starButton.style.border = "none";
  starButton.style.cursor = "pointer";
  starButton.style.fontSize = "20px";
  starButton.id = `starButton_${location}`; // ID 추가

  if (isFavorite) {
    starButton.innerHTML = "★";
    starButton.style.color = "yellow";
    starButton.classList.add("favorite");
  } else {
    starButton.innerHTML = "☆";
    starButton.style.color = "black";
    starButton.classList.remove("favorite");
  }

  return starButton;
};

const areaContent = (location, reviewData, isFavorite, showDetailedInfo) => {
  if (showDetailedInfo) {
    // 상세 정보 페이지의 내용을 표시하는 코드
    return `<div style="width:300px; height:600px;padding:10px;">
      <div style="text-align:center; border-bottom : 1px solid #ccc;">
      <button id="reviewPageButton" style="position : absolute; left:2vw;">리뷰페이지</button>
      <b id="locationTitle">${location}</b>
      </div><br>
      <h3>상세정보</h3>
      <p>근시일내 구현예정.</p>
    </div>`;
  }

  let reviewsElement = "<h3>리뷰 목록</h3>";
  if (reviewData) {
    reviewsElement += "<ul>"; // 목록을 나타내기 위해 ul 태그 추가
    for (const email in reviewData) {
      const review = reviewData[email];
      const username = email.split("@")[0];
      reviewsElement += `<li><b>${username}</b>: `;
      const orderedKeys = ["면굵기", "익힘정도", "스프베이스", "농도", "염도", "평가"]; // 원하는 순서로 키 배열 정의
      orderedKeys.forEach((key) => {
        if (key !== "평가" && review[key] !== undefined) {
          reviewsElement += `${key}: ${review[key]}, `;
        }
      });

      if (review["평가"] !== undefined) {
        reviewsElement += `<br>평가: ${review["평가"]}`;
      }
      reviewsElement += `</li>`;
    }
    reviewsElement += "</ul>"; // ul 태그 닫기
  }

  const starButton = createStarButton(location, isFavorite); // 별 버튼 생성

  return `<div style="width:300px; height:600px;padding:10px;">
    <div style="text-align:center; border-bottom : 1px solid #ccc;"><button id="detailedInfoButton" style="position : absolute; left:2vw;">상세정보</button><b id="locationTitle">${location}</b>${starButton.outerHTML}</div>
    <h3 style="margin-top:1vh;">리뷰하기</h3>
    <p style="display:flex;">면 굵기\u00A0\u00A0\u00A0<select id="select1" required="required">
      <option value="" selected disabled hidden>선택</option>
      <option value="얇음">얇음</option>
      <option value="중간">중간</option>
      <option value="굵음">굵음</option>
    </select></p>
    <p style="display:flex;">익힘정도\u00A0\u00A0<select id="select2" required="required">
      <option value="" selected disabled hidden>선택</option>
      <option value="단단함">단단함</option>
      <option value="보통">보통</option>
      <option value="부드러움">부드러움</option>
    </select></p>
    <p style="display:flex;">스프베이스\u00A0\u00A0<select id="select3" required="required">
      <option value="" selected disabled hidden>선택</option>
      <option value="쇼유">쇼유</option>
      <option value="시오">시오</option>
      <option value="돈코츠">돈코츠</option>
      <option value="미소">미소</option>
      <option value="탄탄멘">탄탄멘</option>
    </select></p>
    <p style="display:flex;">농도\u00A0\u00A0</p><input type="range" min="0" max="10" value="0" id="congauge">
    <p style="display:flex;">염도\u00A0\u00A0</p><input type="range" min="0" max="10" value="0" id="saltgauge">
    <br><label for="textArea">평가</label>
    <textarea id="textArea"></textarea>
    <button id="submitButton">제출</button>
    <div id="reviewContainer" style="height: 330px; overflow-y: auto; margin-top: 1vh; border-top: 1px solid #ccc;">${reviewsElement}</div>
  </div>`;
};

export {areaContent, createStarButton};
