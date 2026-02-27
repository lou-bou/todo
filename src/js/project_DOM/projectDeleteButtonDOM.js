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
        projectObject.delete();

        const projectsContainer = document.querySelector("#projects-container");
        const projectContainer = document.querySelector(`div[data-project-id='${projectObject.id}']`);

        projectsContainer.removeChild(projectContainer);
    })
}