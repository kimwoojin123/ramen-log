const areaContent = (location, reviewData) => {
  let reviewsElement = "<h3>리뷰 목록</h3>";
  if (reviewData) {
    for (const email in reviewData) {
      const review = reviewData[email];
      const username = email.split("@")[0];
      reviewsElement += `<p>${username} : 평가 ${review.평가}</p>`;
    }
  }

  return `<div style="width:300px; height:600px;padding:10px;">
    <div style="text-align:center;"><b id="locationTitle">${location}</b></div>
    <p>리뷰하기</p>
    <p style="display:flex;">면 굵기\u00A0\u00A0\u00A0<select id="select1">
      <option value="얇음">얇음</option>
      <option value="중간">중간</option>
      <option value="굵음">굵음</option>
    </select></p>
    <p style="display:flex;">익힘정도\u00A0\u00A0<select id="select2">
      <option value="단단함">단단함</option>
      <option value="보통">보통</option>
      <option value="부드러움">부드러움</option>
    </select></p>
    <p style="display:flex;">스프베이스\u00A0\u00A0<select id="select3">
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
    <div id="reviewContainer" style="margin-top: 10px; border-top: 1px solid #ccc;">${reviewsElement}</div>
  </div>`;
};

export default areaContent;
