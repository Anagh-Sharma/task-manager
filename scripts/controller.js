window.addEventListener("load", initEvents);

let table;
let tableHeaders = ["ID", "Title", "Description", "Created", "Updated", "Select"];

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
}

function generateTableHeaderAndBody() {
    // Creating table head row
    let thead = table.createTHead();
    table.appendChild(thead);

    // Creating the table's header row's values
    let row = thead.insertRow();
    for(let tableHeader of tableHeaders) {
        let thID = document.createElement("th");
        thID.innerHTML = tableHeader;
        row.appendChild(thID);
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