// 1. Building object using function as a constructor
// function Task(id, title, desc) {
//     this.id = id;
//     this.title = title;
//     this.desc = desc;
//     this.date = new Date();
// }

// 2. Post ES2015 classes and their constructors can be made to build to objects
class Task {
    constructor(id, title, desc) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.date = new Date().toLocaleString('en-GB');
        this.updateDate = "Not Updated";
        this.selected = false;
    }
}

var obj = {
    id : 0,
    taskList : [],
    insertTask : function(title, desc) {
        this.id++;
        let task = new Task(this.id, title, desc);
        this.taskList.push(task);
        console.log(this.taskList);
    },

    toggleTask : function(id) {
        // The filter function will return Task object with the given id
        var toggledTask = this.taskList.filter(function(taskObj) {
            return taskObj.id == id;
        });
        // If the value was to true it will become false and vice-versa
        toggledTask[0].selected = !toggledTask[0].selected; // filter returns an array
        console.log(toggledTask);
    },

    deleteTask : function() {
        // This filter removes the task objects who's "selected" truth value is true
        this.taskList = this.taskList.filter(function(taskObj) {
            return taskObj.selected == false;
        })
    },

    updateTask : function() {
        var toUpdate = this.taskList.filter(function(taskObj) {
            return taskObj.selected == true;
        });
        
        if(toUpdate.length>1) {
            alert("Select only one task to update!");
            toUpdate.forEach(task => {
                task.selected = false;
            });
        }
        
        else if(toUpdate.length === 1) {
            // Display the task's title and description in the input boxes
            document.querySelector("#title").value = toUpdate[0].title;
            document.querySelector("#desc").value = toUpdate[0].desc;

            // Display the Save button
            document.querySelector("#update-save").style.display = "flex";

            // Hide the input buttons
            document.querySelector("#task-input-actions").style.display = "none";

            // Update input box placeholder text
            document.querySelector("#title").placeholder = "Enter the updated title of the task.";
            document.querySelector("#desc").placeholder = "Enter the updated description of the task.";

            // On click of save -> update the task's title and description 
            // with the values present in the input boxes
            document.querySelector("#updateSaveTask").addEventListener("click", function(){
                
                // Update values
                toUpdate[0].title = document.querySelector("#title").value;
                toUpdate[0].desc = document.querySelector("#desc").value;
                toUpdate[0].updateDate = new Date().toLocaleString('en-GB');

                // Display the task list again
                showTasks(obj.taskList);

                // Erase the input boxes
                document.querySelector("#title").value = "";
                document.querySelector("#desc").value = "";

                // Remove the Save button
                document.querySelector("#update-save").style.display = "none";

                // Unhide the input buttons
                document.querySelector("#task-input-actions").style.display = "flex";

                // Update input box placeholder text
                document.querySelector("#title").placeholder = "Enter the title of a task.";
                document.querySelector("#desc").placeholder = "Enter the description of a task.";
            })
        }
    },

    searchTask : function() {
        // Hide the task-input-actions buttons
        document.querySelector("#task-input-actions").style.display = "none";

        // Display the search-task buttons
        document.querySelector("#search-task").style.display = "flex";

        // Hide the input-title and input-desc input boxes
        document.querySelector("#input-title").style.display = "none";
        document.querySelector("#input-desc").style.display = "none";

        // Display the search-task-input input box
        document.querySelector("#search-task-input").style.display = "block";

        // On click of find -> read the value in the title input box 
        // find the task objects with titles equal to the entered (non case sensitive)
        // and store the returned tasks in an array
        // If the returned array has any tasks, then:
        // remove all the rows of the table
        // display the tasks of the array
        document.querySelector("#findTask").addEventListener("click", function(){
            var query = document.querySelector("#search-task-query").value;
            var searchedTasks = obj.taskList.filter(function(taskObj) {
                var taskTitle = taskObj.title;
                var taskDesc = taskObj.desc;
                return (taskTitle.localeCompare(query, 'en-GB', { sensitivity: 'base' }) === 0) || 
                (taskDesc.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            });

            console.log(obj.taskList);
            console.log(searchedTasks);

            if(searchedTasks.length === 0) {
                alert("No match found!");
            }
            else {
                showTasks(searchedTasks);
            }
        })


        // On click of close_search -> show all the tasks in the task list
        document.querySelector("#closeSearch").addEventListener("click", function(){
            // Display the task-input-actions buttons
            document.querySelector("#task-input-actions").style.display = "flex";

            // Hide the search-task buttons
            document.querySelector("#search-task").style.display = "none";

            // Display the input-title and input-desc input boxes
            document.querySelector("#input-desc").style.display = "block";
            document.querySelector("#input-title").style.display = "block";

            // Erase the search-task-query input box
            document.querySelector("#search-task-query").value = "";

            // Hide the search-task-input input box section
            document.querySelector("#search-task-input").style.display = "none";

            // Display the task list again
            showTasks(obj.taskList);
        })
    }
}
