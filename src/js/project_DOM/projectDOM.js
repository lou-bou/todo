import { PersistanceManager } from "../logic.js";
import { createProjectContainerDOM, createProjectTitleDOM } from "./projectBaseElementsDOM.js";
import { createProjectEditButtonDOM } from "./projectEditButtonDOM.js";
import { createProjectDeleteButtonDOM } from "./projectDeleteButtonDOM.js";

export { renderAllProjectsDOM, createProjectDOM, editProjectDOM, renderDefaultProjectDOM, editDefaultProjectDOM };

function renderAllProjectsDOM() {
    const projectObjects = PersistanceManager.retrieveAllProjects();

    for (const projectObject of projectObjects) {
        if (projectObject.id != 'default') {
            createProjectDOM(projectObject);
        }
    }
}

function renderDefaultProjectDOM() {
    const defaultProjectObject = PersistanceManager.retrieveProject("default");

    const projectsContainer = document.querySelector("#projects-container");

    const defaultProjectContainer = createProjectContainerDOM(defaultProjectObject);

    defaultProjectContainer.setAttribute('data-current', 'true');

    const defaultProjectTitle = createProjectTitleDOM(defaultProjectObject, defaultProjectContainer);

    projectsContainer.appendChild(defaultProjectContainer);
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

    const projectDeleteButton = createProjectDeleteButtonDOM(projectObject, projectSubContainer2);

    // appending

    projectContainer.appendChild(projectSubContainer1);
    projectContainer.appendChild(projectSubContainer2);

    return { projectTitle, projectEditButton, projectDeleteButton };
}

function createProjectDOM(projectObject) {
    const projectsContainer = document.querySelector("#projects-container");

    const projectContainer = createProjectContainerDOM(projectObject);

    const { projectTitle, projectEditButton, projectDeleteButton } = createProjectDOMElements(projectObject, projectContainer);

    projectsContainer.appendChild(projectContainer);
}

function editProjectDOM(projectObject, projectContainer) {
    projectContainer.setAttribute("data-project-id", projectObject.id);

    const { projectTitle, projectEditButton, projectDeleteButton } = createProjectDOMElements(projectObject, projectContainer);
}

function editDefaultProjectDOM(defaultProjectObject, defaultProjectContainer) {
    // the only use for this function is to re-render the event listener for the title, without it, the event listener would only render the tasks from the older version of the default project task ID list (after creating a new and switching to default project)
    defaultProjectContainer.innerHTML = "";

    const defaultProjectTitle = createProjectTitleDOM(defaultProjectObject, defaultProjectContainer);
}