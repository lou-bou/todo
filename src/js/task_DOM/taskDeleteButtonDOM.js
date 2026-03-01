import { defaultProjectObject, PersistanceManager } from "../logic.js";
import { editProjectDOM, editDefaultProjectDOM } from '../project_DOM/projectDOM.js';

export { createTaskDeleteButtonDOM };

function createTaskDeleteButtonDOM(taskObject, taskContainer) {
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
        defaultProjectObject.removeTask(taskObject.id);
        defaultProjectObject.store();

        const defaultProjectContainer = document.querySelector(`div[data-project-id='${defaultProjectObject.id}']`);

        // re-rendering
        editDefaultProjectDOM(defaultProjectObject, defaultProjectContainer);

        const ownerProjectObject = PersistanceManager.retrieveProject(taskObject.ownerProjectID);

        if (ownerProjectObject.id != 'default') {
            ownerProjectObject.removeTask(taskObject.id);
            ownerProjectObject.store();

            const ownerProjectContainer = document.querySelector(`div[data-project-id='${ownerProjectObject.id}']`);

            ownerProjectContainer.innerHTML = '';

            // re-rendering
            editProjectDOM(ownerProjectObject, ownerProjectContainer);
        }

        taskObject.delete();

        const tasksContainer = document.querySelector('#tasks-container');
        const taskContainer = document.querySelector(`div[data-task-id='${taskObject.id}']`);

        tasksContainer.removeChild(taskContainer);
    });
}