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
var setTasks = function(){
    // convert array/objects into strings to be saved to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//get tasks from local storage 
var getTasks = function(){
    // convert string back into array/object
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks=loadedTasks
        
        // for each key pair in tasks, create new task
        $.each(tasks, function(hour, task){
            var hourDiv = $("#" + hour);
            newTask(task, hourDiv);
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

var auditTasks = function(){

    // update background of each row based on time of day

    var currentHour = moment().hour();
    $(".task-info").each(function(){
        var elementHour = parseInt($(this).attr("id"));

        // handle past, present, and future tasks
        if (elementHour < currentHour){
            $(this).removeClass(["present", "future"]).addClass("past");
        }else if (elementHour === currentHour){
            $(this).removeClass(["present", "future"]).addClass("present");
        }else {
            $(this).removeClass(["present", "present"]).addClass("future");
        }
    })
}

// replace text area with a <p> so you can add a task
var replaceTextArea = function(textAreaElement) {

    // get needed elements
    var taskInfo = textAreaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // get the time by searching for corresponding hour id
    var time = taskInfo.attr("id")
    // get the task
    var text = textArea.val().trim();

    // push data to dom
    tasks[time] = [text]; // setting to a one item list 

    setTasks();

    // replace the textarea element with a <p> element
    newTask(text, taskInfo);
}

// click handlers

//tasks
$(".task").click(function(){
    
    // save the other tasks if they've been clicked already
    $("textarea").each(function(){
        replaceTextArea($(this));
    })

    // convert to a textarea element if the time hasn't passed
    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {
        
        // create a text input element that includes the current task
        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);
        
        // add the text input element to the parent div
        $(this).html(textInput);
        textInput.trigger("focus");
    }
});

// save button click handler
$(".saveBtn").click(function(){
    replaceTextarea($(this));
})

// check time and update the backgrounds of the tasks
timeToHour = 3600000 - todayDate.milliseconds(); // check how much time is left until the next hour

console.log(timeToHour);


getTasks();