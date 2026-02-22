import { createTaskTitleDOM, createTaskDueDateDOM } from './taskBaseElementsDOM.js';

export { createTaskExpansionButtonDOM }

function createTaskDescriptionDOM(taskObject, taskContainer) {
    const taskDescription = document.createElement('div');

    taskDescription.innerText = taskObject.description;
    taskDescription.setAttribute('class', 'task-description');

    taskContainer.appendChild(taskDescription);

    return taskDescription;
}

function createTaskPriorityDOM(taskObject, taskContainer) {
    const taskPriority = document.createElement('span');

    taskPriority.innerText = taskObject.priority;
    taskDescription.setAttribute('class', 'task-priority');

    taskContainer.appendChild(taskPriority);

    return taskPriority;
}

function createTaskStatusDOM(taskObject, taskContainer) {
    const taskStatus = document.createElement('span');

    taskStatus.innerText = taskObject.status;
    taskStatus.setAttribute('class', 'task-status');

    taskContainer.appendChild(taskStatus);

    return taskStatus;
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

function createTaskExpansionButtonDOM(taskObject, taskContainer) {
    const taskExpansionButton = document.createElement('button');

    taskExpansionButton.innerText = 'Expand';
    taskExpansionButton.setAttribute('class', 'expand-task-button');
    taskExpansionButton.setAttribute('data-task-id', taskObject.id);

    taskContainer.appendChild(taskExpansionButton);

    createTaskExpansionEventListener(taskObject, taskExpansionButton);

    return taskExpansionButton;
}

function createTaskExpansionEventListener(taskObject, taskExpansionButton) {
    const taskExpansionDialog = document.querySelector('#task-expansion-dialog');
    const taskExpansionTitle = document.querySelector('#task-expansion-title');
    const taskExpansionDescription = document.querySelector('#task-expansion-description');
    const taskExpansionDueDate = document.querySelector('#task-expansion-dueDate');
    const taskExpansionStatus = document.querySelector('#task-expansion-status');
    const taskExpansionPriority = document.querySelector('#task-expansion-priority');
    const taskExpansionCategories = document.querySelector('#task-expansion-categories');
    
    taskExpansionButton.addEventListener('click', () => {
        taskExpansionDialog.showModal();

        taskExpansionTitle.innerText = taskObject.title;

        taskExpansionDescription.innerText = taskObject.description;

        taskExpansionDueDate.innerText = taskObject.dueDate;

        taskExpansionStatus.innerText = taskObject.status;

        taskExpansionPriority.innerText = taskObject.priority;

        if (taskObject.categories.length > 0) {
            for (const category of taskObject.categories) {
                const taskExpansionCategoriesList = document.createElement('ul');
                const taskExpansionCategory = document.createElement('li');
                taskExpansionCategory.innerText = category;

                taskExpansionCategoriesList.appendChild(taskExpansionCategory);
                taskExpansionCategories.appendChild(taskExpansionCategoriesList);
            }   
        } else {
            taskExpansionCategories.innerText = 'none';
        }
        
    })

    taskExpansionDialog.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
        taskExpansionTitle.innerHTML = '';

        taskExpansionDescription.innerHTML = '';

        taskExpansionDueDate.innerHTML = '';

        taskExpansionStatus.innerHTML = '';

        taskExpansionPriority.innerHTML = '';

        taskExpansionCategories.innerHTML = '';
        }
    });
}