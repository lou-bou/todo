import { createTaskTitleDOM, createTaskDueDateDOM } from './taskBaseElementsDOM.js';

export { createTaskExpansionButtonDOM }

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

        taskExpansionPriority.innerText = taskObject.priority;

        taskExpansionStatus.innerText = taskObject.status;

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
}