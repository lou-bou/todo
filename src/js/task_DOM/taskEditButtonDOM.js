export function createTaskEditButtonDOM(taskObject, taskContainer) {
    const taskEditButton = document.createElement('button');

    taskEditButton.innerText = 'Edit';
    taskEditButton.setAttribute('class', 'edit-task-button');
    taskEditButton.setAttribute('data-task-id', taskObject.id);

    taskContainer.appendChild(taskEditButton);

    createTaskEditButtonEventListener(taskObject, taskEditButton);

    return taskEditButton;
}

function createTaskEditButtonEventListener(taskObject, taskEditButton) {
    const editTaskDialog = document.querySelector('#edit-task-dialog');
    const editTaskForm = document.querySelector('#edit-task-form');

    taskEditButton.addEventListener('click', () => {
        editTaskDialog.showModal();

        editTaskForm.setAttribute('data-task-id', taskObject.id);
        editTaskForm.title.value = taskObject.title;

        let editTaskCheckbox; // used to assign each category value looped through
        
        for (let i = 0; i < taskObject.categories.length; i++) {
            editTaskCheckbox = document.querySelector(`#edit-${taskObject.categories[i]}`);
            editTaskCheckbox.checked = true;
        }
    });
}