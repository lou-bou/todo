import { PersistanceManager } from '../logic.js';
import { createTaskContainerDOM, createTaskTitleDOM, setTaskContainerColor, createTaskDueDateDOM} from './taskBaseElementsDOM.js';
import { createTaskEditButtonDOM } from './taskEditButtonDOM.js';
import { createTaskDeleteButtonDOM } from './taskDeleteButtonDOM.js';
import { createTaskStatusButtonDOM } from './taskStatusButtonDOM.js';
import { createTaskExpansionButtonDOM } from './taskExpansionDOM.js';

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

    const taskSubContainer1 = document.createElement('div');
    taskSubContainer1.setAttribute('class', 'task-sub-container-1');

    const taskStatusButton = createTaskStatusButtonDOM(taskObject, taskSubContainer1);

    const taskTitle = createTaskTitleDOM(taskObject, taskSubContainer1);

    const taskExpansionButton = createTaskExpansionButtonDOM(taskObject, taskSubContainer1);

    // duedate and buttons

    const taskSubContainer2 = document.createElement('div');
    taskSubContainer2.setAttribute('class', 'task-sub-container-2');

    // const taskCategories = createTaskCategoriesDOM(taskObject, taskSubContainer2);
    // these will be shown in task expanded dialog modal instead

    const taskDueDate = createTaskDueDateDOM(taskObject, taskSubContainer2);

    const taskEditButton = createTaskEditButtonDOM(taskObject, taskSubContainer2);

    const taskDeleteButton = createTaskDeleteButtonDOM(taskObject, taskSubContainer2);

    // changing taskContainer background color

    setTaskContainerColor(taskObject, taskContainer);
    
    // appending

    taskContainer.appendChild(taskSubContainer1);
    taskContainer.appendChild(taskSubContainer2);

    return { taskStatusButton, taskTitle, taskExpansionButton, taskEditButton, taskDeleteButton };
}

function createTaskDOM(taskObject) {
    const tasksContainer = document.querySelector('#tasks-container');

    const taskContainer = createTaskContainerDOM(taskObject);
    
    const { taskStatusButton, taskTitle, taskExpansionButton, taskEditButton, taskDeleteButton } = createTaskDOMElements(taskObject, taskContainer);

    tasksContainer.appendChild(taskContainer);
}

// the only difference between this function and createTaskDOM is that the latter creates and appends taskContainer to tasksContainer, but this one doesn't because the taskContainer already exists.
function editTaskDOM(taskObject, taskContainer) {
    taskContainer.setAttribute('data-task-id', taskObject.id);
    
    const { taskStatusButton, taskTitle, taskExpansionButton, taskEditButton, taskDeleteButton } = createTaskDOMElements(taskObject, taskContainer);
}