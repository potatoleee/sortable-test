
const backlogDOM = document.querySelector(
  ".backlog-section .droppable-container"
);
const sprintDOM = document.querySelector(
  ".sprint-section .droppable-container"
);

const backlogArr = [
  { content: "前台職缺列表（職缺詳細內容、點選可發送應徵意願）", score: 5 },
  { content: "應徵者的線上履歷編輯器", score: 13 },
  { content: "會員系統（登入、註冊、權限管理）", score: 8 },
  { content: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）", score: 8 }
];

let totalScore = 0;
let totalScoreDOM = document.querySelector(".total-score");
totalScoreDOM.textContent = totalScore;

// 以map方式創造DOM node, 並塞入backlog的container
backlogArr.map((ele) => {
  let draggableCard = document.createElement("div");
  draggableCard.setAttribute("data-score", ele.score);
  draggableCard.setAttribute("draggable", "true");
  draggableCard.classList.add("draggble");
  draggableCard.textContent = ele.content;

  let timeAvatar = document.createElement("div");
  timeAvatar.classList.add("time-avatar");
  timeAvatar.textContent = ele.score;

  draggableCard.appendChild(timeAvatar);

  backlogDOM.appendChild(draggableCard);
});

let sprintSortableObj = Sortable.create(sprintDOM, {
  group: "dnd",
  animation: 10,
  dataIdAttr: "data-score",

  onEnd: (event) => {
    // 更新t// 更新totalSccore
    totalScore = sprintSortableObj
      .toArray()
      .map((ele) => parseInt(ele, 10))
      .reduce((a, b) => a + b, 0);
    totalScoreDOM.textContent = totalScore;

    let warningTextDOM = document.querySelector(".warning-text");

    warningTextDOM.classList.add("hidden");
    if (totalScore > 20) {
      warningTextDOM.classList.remove("hidden");
    }
  }
});

let backlogSortableObj = Sortable.create(backlogDOM, {
  group: "dnd",
  animation: 10,
  dataIdAttr: "data-score",

  onEnd: (event) => {
    totalScore = sprintSortableObj
      .toArray()
      .map((ele) => parseInt(ele, 10))
      .reduce((a, b) => a + b, 0);
    totalScoreDOM.textContent = totalScore;

    let warningTextDOM = document.querySelector(".warning-text");

    warningTextDOM.classList.add("hidden");
    if (totalScore > 20) {
      warningTextDOM.classList.remove("hidden");
    }
  }
});
