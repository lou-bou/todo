export { createProjectEditButtonDOM };

function createProjectEditButtonDOM(projectObject, projectContainer) {
    const projectEditButton = document.createElement('button');

    projectEditButton.innerText = 'Edit';
    projectEditButton.setAttribute("class", "edit-project-button");
    projectEditButton.setAttribute("data-task-id", projectObject.id);

    projectContainer.appendChild(projectEditButton);

    createProjectEditButtonEventListener(projectObject, projectEditButton);

    return projectEditButton;
}

function createProjectEditButtonEventListener(projectObject, projectEditButton) {
    const editProjectDialog = document.querySelector("#edit-project-dialog");
    const editProjectForm = document.querySelector("#edit-project-form");

    projectEditButton.addEventListener('click', () => {
        editProjectDialog.showModal();

        editProjectForm.setAttribute("data-project-id", projectObject.id);

        editProjectForm.title.value = projectObject.title;
    });
}