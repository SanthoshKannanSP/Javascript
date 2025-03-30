const taskInputElement = document.getElementById("input-bar");
const activeTaskSection = document.getElementById("active-section");
const completedTaskSection = document.getElementById("completed-section");

let todoCount = 0;
let isCompleted = window.localStorage.getItem("isCompleted")
if(isCompleted)
{
    isCompleted = JSON.parse(isCompleted);
}
else {
    isCompleted = {}
}

for (const taskTitle in isCompleted){
    let taskCard = createTaskCard(taskTitle,isCompleted[taskTitle]);
    if (isCompleted[taskTitle]) {
        completedTaskSection.appendChild(taskCard);
    }
    else {
        activeTaskSection.appendChild(taskCard);
    }
}

function createTaskCard(taskTitle, isChecked=false) {
    let taskCard = document.querySelector('div[data-type="template-task-card"]').cloneNode(true);

    // Remove the data-type attribute
    taskCard.removeAttribute("data-type")

    // Set the task title
    taskCard.querySelector('h3[class="task-title"]').textContent = taskTitle;

    // Add unique id to checkbox and associate it with the label
    let checkbox = taskCard.querySelector('input[type="checkbox"]');
    checkbox.id = "completed-check-"+todoCount;
    let label = taskCard.querySelector('label');
    label.setAttribute("for","completed-check-"+todoCount);
    todoCount += 1;
    checkbox.checked = isChecked;

    // When deleted icon is clicked, run the removeTask function
    let deleteIcon = taskCard.querySelector('.delete-icon');
    deleteIcon.addEventListener("click",removeTask);

    // When the checkbox changes state, run the updateTask function
    checkbox.addEventListener("change",updateTask)

    // Display the task card
    taskCard.style.display = "flex";

    return taskCard;
}


function addTask(){
    // Display alert if the input is empty
    if(taskInputElement.value === ''){
        alert("Write a task before adding!");
    }
    else {
        // Deep clone the template task card
        let taskCard = createTaskCard(taskInputElement.value)
        
        // Add the task card to the active section
        activeTaskSection.appendChild(taskCard);

        // Track the task
        isCompleted[taskInputElement.value] = false
        window.localStorage.setItem("isCompleted", JSON.stringify(isCompleted));

        // Reset the task input to empty string
        taskInputElement.value = ""
    }
}

function updateTask(){
     // Get the parent task-card of the checkbox changed
    const taskCard = this.closest(".task-card");
    const taskTitle = taskCard.querySelector(".task-title").innerHTML;

    // Remove the task card from DOM
    taskCard.remove();

    // If the checkbox state is checked, append it to completed section
    if (this.checked) {
        isCompleted[taskTitle] = true;
        completedTaskSection.appendChild(taskCard);
    }
    // If the checkbox state is unchecked, append it to active section
    else {
        isCompleted[taskTitle] = false;
        activeTaskSection.appendChild(taskCard)
    }
    window.localStorage.setItem("isCompleted", JSON.stringify(isCompleted));
}

function removeTask(){
    // Get the parent task-card of the delete icon clicked
    const taskCard = this.closest(".task-card");
    const taskTitle = taskCard.querySelector(".task-title").innerHTML;

    // Remove the task card from DOM
    taskCard.remove()

    // Remove the task from isCompleted and localStorage
    delete isCompleted[taskTitle];
    window.localStorage.setItem("isCompleted", JSON.stringify(isCompleted));
}