import { PersistanceManager } from "../logic.js";

export function createTaskDeleteButtonDOM(taskObject, taskContainer) {
    const taskDeleteButton = document.createElement('button');

    taskDeleteButton.innerText = 'Delete';
    taskDeleteButton.setAttribute('class', 'delete-task-button');
    taskDeleteButton.setAttribute('data-task-id', taskObject.id);

    taskContainer.appendChild(taskDeleteButton);

    createTaskDeleteButtonEventListener(taskObject, taskDeleteButton);

    return taskDeleteButton;
}

function createTaskDeleteButtonEventListener(taskObject, taskDeleteButton) {
    taskDeleteButton.addEventListener('click', () => {
        PersistanceManager.deleteTask(taskObject.id);

        const tasksContainer = document.querySelector('#tasks');
        const taskContainer = document.querySelector(`div[data-task-id='${taskObject.id}']`);

        tasksContainer.removeChild(taskContainer);
    });
}