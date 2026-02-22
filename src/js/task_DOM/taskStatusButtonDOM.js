export function createTaskStatusButtonDOM(taskObject, taskContainer) {
    const taskStatusButton = document.createElement('div');

    taskStatusButton.setAttribute('data-status', taskObject.status);

    taskStatusButton.setAttribute('class', 'status-task-button');
    taskStatusButton.setAttribute('data-task-id', taskObject.id);

    taskContainer.appendChild(taskStatusButton);

    createTaskStatusButtonEventListener(taskObject, taskStatusButton);

    return taskStatusButton;
}

function createTaskStatusButtonEventListener(taskObject, taskStatusButton) {
    taskStatusButton.addEventListener('click', () => {
        taskObject.switchStatus();

        taskStatusButton.setAttribute('data-status', taskObject.status);
    });
}