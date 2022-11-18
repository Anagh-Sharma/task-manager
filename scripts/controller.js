window.addEventListener("load", initEvents);

let table;
let tableHeaders = ["ID", "Title", "Description", "Created", "Updated", "Select"];
let tableHeadersToTaskKey = {"ID" : "id", "Title" : "title", "Description" : "desc", "Created" : "date", "Updated" : "updateDate"};

function initEvents() {
    table = document.querySelector(".tasks-disp-table");
    generateTableHeaderAndBody();

    // Add task
    document.querySelector("#addTask").addEventListener("click", addTask);
    // Delete task
    document.querySelector("#deleteTask").addEventListener("click", deleteTask);
    // Update task
    document.querySelector("#updateTask").addEventListener("click", updateTask);
    // Search task
    document.querySelector("#searchTask").addEventListener("click", searchTask);
    // Save task
    document.querySelector("#saveTask").addEventListener("click", saveTask);
    // Load task
    document.querySelector("#loadTask").addEventListener("click", loadTask);
    // Sort task
    var elements = document.getElementsByClassName("table-sort-btn");
    for(var i=0; i<elements.length; i++) {
        elements[i].addEventListener("click", sortTasks);
    }
}

function generateTableHeaderAndBody() {
    // Creating table head row
    let thead = table.createTHead();
    table.appendChild(thead);

    // Creating the table's header row's values
    let row = thead.insertRow();
    for(let tableHeader of tableHeaders) {
        let thID = document.createElement("th");

        // A sort button is added for all headers except "Select"
        if(tableHeader != "Select") {
            let sortButton = document.createElement("button");
            sortButton.setAttribute("class", "table-sort-btn");
            sortButton.setAttribute("id", tableHeader);
            sortButton.ascending = true;

            let sortIcon = document.createElement("i");
            sortIcon.setAttribute("class", "fa-solid fa-sort table-sort-icon");

            sortButton.appendChild(sortIcon);
    
            thID.innerHTML = tableHeader;
            thID.appendChild(sortButton);

            row.appendChild(thID);
        }
        else {
            thID.innerHTML = tableHeader;
            row.appendChild(thID);
        }
    }

    // Creating table body
    let tbody = table.createTBody();
    table.appendChild(tbody);
}

function addTask() {
    // Reading title and description
    let taskTitle = document.querySelector("#title");
    let taskDesc = document.querySelector("#desc");

    // Inserting the task data in the database
    obj.insertTask(taskTitle.value, taskDesc.value);

    // Show the updated array of tasks
    showTasks(obj.taskList);

    // Clearing the inserted task from the input boxes
    taskTitle.value = "";
    taskDesc.value = "";
}

function showTasks(tasks) {
    // All tasks present in the taskList are to be desplayed again. 

    // Removing all the rows present in the table body
    table.tBodies[0].innerHTML = "";

    // All tasks present in the taskList of obj are printed.
    tasks.forEach(function(task) {
        // Creating a new row in tBody
        let row = table.tBodies[0].insertRow();
                    
        let columnID = row.insertCell();
        columnID.setAttribute("class", "task-id");
        columnID.innerHTML = task.id;
        
        let columnTitle = row.insertCell();
        columnTitle.setAttribute("class", "task-title");
        columnTitle.innerHTML = task.title;

        let columnDesc = row.insertCell();
        columnDesc.setAttribute("class", "task-desc");
        columnDesc.innerHTML = task.desc;

        let columnCreated = row.insertCell();
        columnCreated.setAttribute("class", "task-created");
        columnCreated.innerHTML = task.date;

        let columnUpdated = row.insertCell();
        columnUpdated.setAttribute("class", "task-updated");
        columnUpdated.innerHTML = task.updateDate;

        // Creating a new checkbox
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("class", "task-checkbox-input");
        // The new checkbox is associated with the current Task's ID using value attribute
        checkBox.setAttribute("value", task.id);
        // The selectTask function changes the selected truth value of the Task object
        checkBox.addEventListener("change", selectTask);

        let columnCheckBox = row.insertCell();
        columnCheckBox.setAttribute("class", "task-checkbox");
        columnCheckBox.append(checkBox);
    })
}

function selectTask() {
    obj.toggleTask(this.value);
}

function deleteTask() {
    obj.deleteTask();
    showTasks(obj.taskList);
}

function updateTask() {
    obj.updateTask();
}

function searchTask() {
    obj.searchTask();
}

function unselctAll(tasks) {
    tasks.forEach(function(task){
        task.selected = false;
    })
}

function saveTask() {
    if(window.localStorage) {
        unselctAll(obj.taskList);
        // Id is saved to ensure that after tasks are loaded, the ids of new tasks do not start from 1
        var savedData = [obj.id, obj.taskList];
        console.log(savedData);
        // var taskListString = JSON.stringify(obj.taskList);
        var taskListString = JSON.stringify(savedData);

        localStorage.setItem("taskListData", taskListString);
    }
    else {
        alert("ERROR : Cannot save to localStorage. Browser does not support localStorage.");
    }
}

function loadTask() {
    if(window.localStorage) {
        if(localStorage.taskListData) {
            var tasksData = JSON.parse(localStorage.getItem("taskListData"));
            obj.id = tasksData[0];
            obj.taskList = tasksData[1];
            // obj.taskList = JSON.parse(tasksData);
            unselctAll(obj.taskList);
            showTasks(obj.taskList);
        }
        else {
            alert("ERROR : No tasks to display.");
        }
    }
    else {
        alert("ERROR : Browser does not support localStorage.");
    }
}

function sortTasks() {
    // Read the id of the button to determine which column to sort on
    // Pass the id to tableHeadersToTaskKey to determine the cumn name in obj.taskList
    var sortColumn = tableHeadersToTaskKey[this.id];

    // If the ascending property of the button is true, then sort in ascending
    if(this.ascending) {

        if(isNaN(obj.taskList[0][sortColumn])) {
            obj.taskList.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? 1 : (a[sortColumn] === b[sortColumn]) ? ((a[sortColumn] > b[sortColumn]) ? 1 : -1) : -1 )
        }
        else {
            obj.taskList.sort((a,b) => a[sortColumn] - b[sortColumn]);
        }

        // Set the ascending property to false to sort in descending order next time the button is clicked
        this.ascending = false;
    }
    else {

        if(isNaN(obj.taskList[0][sortColumn])) {
            obj.taskList.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? -1 : (a[sortColumn] === b[sortColumn]) ? ((a[sortColumn] > b[sortColumn]) ? -1 : 1) : 1 )
        }
        else {
            obj.taskList.sort((a,b) => b[sortColumn] - a[sortColumn]);
        }

        // Set the ascending property to true to sort in ascending order next time the button is clicked
        this.ascending = true;
    }
    showTasks(obj.taskList);
    // alert(obj.id);
}