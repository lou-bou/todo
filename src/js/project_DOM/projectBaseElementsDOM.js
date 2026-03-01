import { renderSpecificTasksDOM } from "../task_DOM/taskDOM.js";
import { PersistanceManager } from "../logic.js";

export { createProjectContainerDOM, createProjectTitleDOM };

function createProjectContainerDOM(projectObject) {
    const projectContainer = document.createElement("div");

    projectContainer.setAttribute("class", "project-container");
    projectContainer.setAttribute("data-project-id", projectObject.id);

    return projectContainer;
}

function createProjectTitleDOM(projectObject, projectContainer) {
    const projectTitle = document.createElement("span");

    projectTitle.innerText = projectObject.title;
    projectTitle.setAttribute("class", "project-title");
    
    projectContainer.appendChild(projectTitle);

    createProjectTitleEventListener(projectObject, projectTitle);

    return projectTitle;
}

function createProjectTitleEventListener(projectObject, projectTitle) {
    projectTitle.addEventListener("click", () => {
        // setting each project container as not current in html

        const projectContainers = document.querySelectorAll('.project-container');

        projectContainers.forEach((projectContainer) => {
            projectContainer.setAttribute("data-current", "false");
        })

        // to style the current project differently
        const projectContainer = document.querySelector(`div[data-project-id='${projectObject.id}']`);

        projectContainer.setAttribute("data-current", "true");

        // clearing the tasks container to fill with current project's tasks

        const tasksContainer = document.querySelector('#tasks-container');

        tasksContainer.innerHTML = "";

        // rendering the current project's tasks

        renderSpecificTasksDOM(projectObject.taskIds);

        // setting the new current project

        PersistanceManager.currentProjectID = projectObject.id;
    });
}