let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        addTask(event);
    }
});

tabs.forEach((tab) => {
    tab.addEventListener("click", function(event) {
        filter(event);
        moveUnderline(event);
    });
});

window.onload = function() {
    document.getElementById("all").classList.add("active");
    underLine.style.width = document.getElementById("all").offsetWidth + "px";
    underLine.style.left = document.getElementById("all").offsetLeft + "px";
    underLine.style.top = document.getElementById("all").offsetTop + document.getElementById("all").offsetHeight + "px";
    render();
};

function addTask() {
    let taskValue = taskInput.value;
    if (taskValue === "") {
        return alert("할일을 입력해주세요");
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    taskInput.value = "";
    filterTasks(); // 현재 모드에 맞춰 필터링 및 렌더링
}

function render() {
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "notdone" || mode === "done") {
        list = filterList;
    }
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task_true">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button class="return_button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button class="delete_button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`;
        } else {
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button class="check_button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="delete_button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filterTasks();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filterTasks();
}

function filter(event) {
    mode = event.target.id;
    filterTasks();
}

function filterTasks(event) {
    filterList = [];
    if (mode === "all") {
        render();
    } else if (mode === "notdone") {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    
    if (event) {
        moveUnderline(event);
    }
}

function moveUnderline(event) {
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + event.target.offsetHeight + "px";
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
