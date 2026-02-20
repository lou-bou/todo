import { PersistanceManager } from '../logic.js';
import { createTaskContainerDOM, createTaskTitleDOM, createTaskCategoriesDOM, setTaskContainerColor } from './taskBaseElementsDOM.js';
import { createTaskEditButtonDOM } from './taskEditButtonDOM.js';
import { createTaskDeleteButtonDOM } from './taskDeleteButtonDOM.js';
import { createTaskStatusButtonDOM } from './taskStatusButtonDOM.js';

export { renderTasksDOM, createTaskDOM, editTaskDOM }

function renderTasksDOM() {
    const taskObjects = PersistanceManager.retrieveAllTasks();

    for (const taskObject of taskObjects) {
        createTaskDOM(taskObject);
    }
}

function createTaskDOMElements(taskObject, taskContainer) {
    // these DOM elements aren't really used so there's no need for their respective functions to return them but just in case yknow for potential future updates n shi

    // title and status

    const titleAndStatusContainer = document.createElement('div');
    titleAndStatusContainer.setAttribute('class', 'title-status-container');

    const taskStatusButton = createTaskStatusButtonDOM(taskObject, titleAndStatusContainer);

    const taskTitle = createTaskTitleDOM(taskObject, titleAndStatusContainer);

    // categories and buttons

    const categoriesAndButtonsContainer = document.createElement('div');
    categoriesAndButtonsContainer.setAttribute('class', 'categories-buttons-container');

    const taskCategories = createTaskCategoriesDOM(taskObject, categoriesAndButtonsContainer);

    const taskEditButton = createTaskEditButtonDOM(taskObject, categoriesAndButtonsContainer);

    const taskDeleteButton = createTaskDeleteButtonDOM(taskObject, categoriesAndButtonsContainer);

    // changing taskContainer background color

    setTaskContainerColor(taskObject, taskContainer);
    
    // appending

    taskContainer.appendChild(titleAndStatusContainer);
    taskContainer.appendChild(categoriesAndButtonsContainer);

    return { taskStatusButton, taskTitle, taskCategories, taskEditButton, taskDeleteButton };
}

function createTaskDOM(taskObject) {
    const tasksContainer = document.querySelector('#tasks-container');

    const taskContainer = createTaskContainerDOM(taskObject);
    
    const { taskStatusButton, taskTitle, taskCategories, taskEditButton, taskDeleteButton } = createTaskDOMElements(taskObject, taskContainer);

    tasksContainer.appendChild(taskContainer);
}

// the only difference between this function and createTaskDOM is that the latter creates and appends taskContainer to tasksContainer, but this one doesn't because the taskContainer already exists.
function editTaskDOM(taskObject, taskContainer) {
    taskContainer.setAttribute('data-task-id', taskObject.id);
    
    const { taskTitle, taskCategories, taskEditButton } = createTaskDOMElements(taskObject, taskContainer);
}