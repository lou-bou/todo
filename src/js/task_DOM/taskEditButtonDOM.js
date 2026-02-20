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
        editTaskForm.description.value = taskObject.description;

        const priorities = document.getElementsByName('priority');
        for (const priority of priorities) {
            if (priority.value == taskObject.priority)
            priority.checked = true;
        }

        let editTaskCategoryCheckbox; // used to assign each category value looped through
        
        for (const taskObjectCategory of taskObject.categories) {
            editTaskCategoryCheckbox = document.querySelector(`#edit-${taskObjectCategory}`);
            editTaskCategoryCheckbox.checked = true;
        }
    });
}