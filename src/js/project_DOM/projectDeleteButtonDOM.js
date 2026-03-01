import { PersistanceManager, defaultProjectObject } from "../logic.js";
import { renderAllTasksDOM } from "../task_DOM/taskDOM.js";

export { createProjectDeleteButtonDOM };

function createProjectDeleteButtonDOM(projectObject, projectContainer) {
    const projectDeleteButton = document.createElement('button');

    projectDeleteButton.innerText = 'Delete';
    projectDeleteButton.setAttribute("class", "delete-project-button");
    projectDeleteButton.setAttribute("data-project-id", projectObject.id);

    projectContainer.appendChild(projectDeleteButton);

    createProjectDeleteButtonEventListener(projectObject, projectDeleteButton);

    return projectDeleteButton;
}

function createProjectDeleteButtonEventListener(projectObject, projectDeleteButton) {
    projectDeleteButton.addEventListener('click', () => {

        const taskObjects = PersistanceManager.retrieveMultipleTasks(projectObject.taskIds)

        for (const taskObject of taskObjects) {
            defaultProjectObject.removeTask(taskObject.id);
            defaultProjectObject.store()

            taskObject.delete();
        }

        projectObject.delete();

        const tasksContainer = document.querySelector('#tasks-container');

        tasksContainer.innerHTML = '';

        PersistanceManager.currentProjectID = defaultProjectObject.id;

        renderAllTasksDOM();

        const projectsContainer = document.querySelector("#projects-container");
        const projectContainer = document.querySelector(`div[data-project-id='${projectObject.id}']`);

        projectsContainer.removeChild(projectContainer);
    })
}