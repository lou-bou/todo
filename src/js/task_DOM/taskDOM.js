import { PersistanceManager } from '../logic.js';
import { createTaskContainerDOM, createTaskTitleDOM, createTaskCategoriesDOM } from './taskBaseElementsDOM.js';
import { createTaskEditButtonDOM } from './taskEditButtonDOM.js';
import { createTaskDeleteButtonDOM } from './taskDeleteButtonDOM.js';
import { createTaskStatusButtonDOM } from './taskStatusButtonDOM.js';

export { renderTasksDOM, createTaskDOM, editTaskDOM }

function renderTasksDOM() {
    const tasks = PersistanceManager.retrieveAllTasks();

    for (let i = 0; i < tasks.length; i++) {
        createTaskDOM(tasks[i]);
    }
}

function createTaskDOMElements(taskObject, taskContainer) {
    // these three DOM elements aren't really used so there's no need for their respective functions to return them but just in case yknow for potential future updates

    const titleNStatusContainer = document.createElement('div');
    titleNStatusContainer.setAttribute('class', 'title-status-container');

    const taskStatusButton = createTaskStatusButtonDOM(taskObject, titleNStatusContainer);

    const taskTitle = createTaskTitleDOM(taskObject, titleNStatusContainer);

    const categoriesNButtonsContainer = document.createElement('div');
    categoriesNButtonsContainer.setAttribute('class', 'categories-buttons-container');

    const taskCategories = createTaskCategoriesDOM(taskObject, categoriesNButtonsContainer);

    const taskEditButton = createTaskEditButtonDOM(taskObject, categoriesNButtonsContainer);

    const taskDeleteButton = createTaskDeleteButtonDOM(taskObject, categoriesNButtonsContainer);

    taskContainer.appendChild(titleNStatusContainer);
    taskContainer.appendChild(categoriesNButtonsContainer);

    return { taskStatusButton, taskTitle, taskCategories, taskEditButton, taskDeleteButton };
}

function createTaskDOM(taskObject) {
    const tasksContainer = document.querySelector('#tasks');

    const taskContainer = createTaskContainerDOM(taskObject);
    
    const { taskStatusButton, taskTitle, taskCategories, taskEditButton, taskDeleteButton } = createTaskDOMElements(taskObject, taskContainer);

    tasksContainer.appendChild(taskContainer);
}

// the only difference between this function and createTaskDOM is that the latter creates and appends taskContainer to tasksContainer, but this one doesn't because the taskContainer already exists.
function editTaskDOM(taskObject, taskContainer) {
    taskContainer.setAttribute('data-task-id', taskObject.id);
    
    const { taskTitle, taskCategories, taskEditButton } = createTaskDOMElements(taskObject, taskContainer);
}