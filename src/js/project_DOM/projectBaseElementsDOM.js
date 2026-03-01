import { renderSpecificTasksDOM } from "../task_DOM/taskDOM.js";

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
        const tasksContainer = document.querySelector('#tasks-container');

        tasksContainer.innerHTML = "";

        renderSpecificTasksDOM(projectObject.taskIds);
    });
}