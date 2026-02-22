export { createTaskContainerDOM, createTaskTitleDOM, createTaskDueDateDOM }

/*
Important note:
taskContainer here isn't necessarily the main container for a task, it could also be the sub container for that tasks' title and description for example.
*/

function createTaskContainerDOM(taskObject) {
    const taskContainer = document.createElement('div');

    taskContainer.setAttribute('class', 'task-container');
    taskContainer.setAttribute('data-task-id', taskObject.id);

    return taskContainer;
}

function createTaskTitleDOM(taskObject, taskContainer) {
    const taskTitle = document.createElement('span');

    taskTitle.innerText = taskObject.title;
    taskTitle.setAttribute('class', 'task-title');

    taskContainer.appendChild(taskTitle);

    return taskTitle;
}

function createTaskDueDateDOM(taskObject, taskContainer) {
    const taskDueDate = document.createElement('span');

    taskDueDate.innerText = taskObject.dueDate;
    taskDueDate.setAttribute('class', 'task-dueDate');

    taskContainer.appendChild(taskDueDate);
}