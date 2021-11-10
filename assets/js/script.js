// at the top of the page set current date
var todayDate = moment();
$("#currentDay").text(todayDate.format("dddd, MMMM Do"));


// create array to store tasks in local storage

var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": [],  
};

// set tasks to local storage
var setTask = function(){
    // convert array/objects into strings to be saved to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//get tasks from local storage 
var getTask = function(){
    // convert string back into array/object
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks=loadedTasks
        
        // for each key pair in tasks, create new task
        $.each(tasks, function(hour, task){
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

    // make sure past/current/future time is reflected
    auditTasks();
}

var newTask = function(taskText, hourDiv) {
    // create a task in the row for the hour chosen

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
    taskDiv.html(taskP);
}

// replace text area with a <p> so you can add a task
var replaceTextArea = function(textAreaElement) {

    // get needed elements
    var taskInfo = textAreaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // get the time by searching for corresponding hour id
    var time = taskInfo.attr("id")
}