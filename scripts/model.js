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
            document.querySelector("#update-save").style.display = "block";

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
                showTask();

                // Erase the input boxes
                document.querySelector("#title").value = "";
                document.querySelector("#desc").value = "";

                // Remove the Save button
                document.querySelector("#update-save").style.display = "none";

                // Update input box placeholder text
                document.querySelector("#title").placeholder = "Enter the title of a task.";
                document.querySelector("#desc").placeholder = "Enter the description of a task.";
            })
        }
    }
}