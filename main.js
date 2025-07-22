//유저가 값을 입력한다
//+ 버튼을 클릭하면 할일이 추가된다
//delete 버튼을 클릭하면 할일이 삭제된다
//check 버튼을 클릭하면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 수간 true false를 바꿔준다
//2. true 이면 끝난 걸로 간주 하고 밑줄
//3. false면 안끝난 걸로 간주하고  그대로
//진행중 끝나 탭을 누르면 언더바가 이동한다
// 끝남탭은, 끝남 아이템만, 진행중 탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템이 보인다

let addButton = document.getElementById("add-button");
let userInput = document.getElementById("user-input");
let taskTab = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tab-underline");

console.log(taskTab);

let taskList = [];
let filteredTask = [];
let List = [];
let selector = "all";

for (let i = 1; i < taskTab.length; i++) {
  taskTab[i].addEventListener("click", function (e) {
    filter(e);
  });
}

addButton.addEventListener("click", addTask);
userInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

function addTask() {
  if (userInput.value === "") {
    alert("할 일을 입력하고 추가해주세요~!");
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: userInput.value,
    isComplete: false,
  };
  console.log(taskList);

  taskList.push(task);
  userInput.value = "";

  render();
}

function render() {
  let resultHTML = "";
  if (selector === "all") {
    List = taskList;
  } else {
    List = filteredTask;
  }
  for (let i = 0; i < List.length; i++) {
    if (List[i].isComplete) {
      resultHTML += `
            <div>
              <div class="task">
                <div class="left-section">
                  <div id="check-button" onclick="checkIsComplete('${List[i].id}')"}>
                    <i class="fa-regular fa-square-check"></i>
                  </div>
                  <div class="done-task">${List[i].taskContent}</div>
                </div>
                <div id="delete-button" onclick="taskDelete('${List[i].id}')"><i class="fa-regular fa-trash-can redcan"></i></div>
              </div>
            </div>`;
    } else {
      resultHTML += `
            <div>
              <div class="task">
                <div class="left-section">
                  <div id="check-button" onclick="checkIsComplete('${List[i].id}')"}>
                    <i class="fa-regular fa-square"></i>
                  </div>
                  <div>${List[i].taskContent}</div>
                </div>
                <div id="delete-button" onclick="taskDelete('${List[i].id}')">
                <i class="fa-regular fa-trash-can"></i>
                </div>
              </div>
            </div>`;
    }
  }
  let remainCounter = 0;
  let doneCounter = 0;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete === false) {
      remainCounter += 1;
    } else {
      doneCounter += 1;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
  document.getElementById("done-Area").innerHTML = `DONE : ${doneCounter}`;
  document.getElementById(
    "remain-Area"
  ).innerHTML = `REMAIN : ${remainCounter}`;
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function checkIsComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  console.log(taskList);
  filter();
}

function taskDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList);
  filter();
}

function filter(e) {
  if (e) {
    selector = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetTop + e.target.offsetHeight + 3 + "px";
  }

  console.log(selector);
  filteredTask = [];
  if (selector === "all") {
    render();
  } else if (selector === "remain") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filteredTask.push(taskList[i]);
      }
    }
    render();
  } else if (selector === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filteredTask.push(taskList[i]);
      }
    }
    render();
  }
}
