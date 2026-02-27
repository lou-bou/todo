import { PersistanceManager } from "../logic.js";
import { createProjectContainerDOM, createProjectTitleDOM } from "./projectBaseElementsDOM.js";
import { createProjectEditButtonDOM } from "./projectEditButtonDOM.js";

export { renderProjectsDOM, createProjectDOM, editProjectDOM };

function renderProjectsDOM() {
    const projectObjects = PersistanceManager.retrieveAllProjects();

    for (const projectObject of projectObjects) {
        if (projectObject.id != 'default') {
            createProjectDOM(projectObject);
        }
    }
}

function createProjectDOMElements(projectObject, projectContainer) {
    
    // title

    const projectSubContainer1 = document.createElement("div");
    projectSubContainer1.setAttribute("class", "project-sub-container-1");

    const projectTitle = createProjectTitleDOM(projectObject, projectSubContainer1);

    // buttons

    const projectSubContainer2 = document.createElement("div");
    projectSubContainer2.setAttribute("class", "project-sub-container-2");

    const projectEditButton = createProjectEditButtonDOM(projectObject, projectSubContainer2);

    // appending

    projectContainer.appendChild(projectSubContainer1);
    projectContainer.appendChild(projectSubContainer2);

    return { projectTitle, projectEditButton };
}

function createProjectDOM(projectObject) {
    const projectsContainer = document.querySelector("#projects-container");

    const projectContainer = createProjectContainerDOM(projectObject);

    const { projectTitle, projectEditButton } = createProjectDOMElements(projectObject, projectContainer);

    projectsContainer.appendChild(projectContainer);
}

function editProjectDOM(projectObject, projectContainer) {
    projectContainer.setAttribute("data-project-id", projectObject.id);

    const { projectTitle, projectEditButton } = createProjectDOMElements(projectObject, projectContainer);
}