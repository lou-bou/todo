export { createTaskContainerDOM, createTaskTitleDOM, createTaskCategoriesDOM, setTaskContainerColor }

function setTaskContainerColor(taskObject, taskContainer) {
    taskContainer.setAttribute('data-background-color', taskObject.priority);
}

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

function createTaskCategoriesDOM(taskObject, taskContainer) {
    let taskCategory; // used for iteration

    for (const category of taskObject.categories) {
        taskCategory = document.createElement('span');
        taskCategory.innerText = category;
        taskCategory.setAttribute('class', 'task-category');

        taskContainer.appendChild(taskCategory);
    }

    return taskObject.categories; // taskCategory and a category in taskObject.categories are the same lol
}