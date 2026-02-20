function setTaskStatusButtonColorDOM(taskObject) {
    // this doesnt swap, just returns the corresponding style for each status
    if (taskObject.status == 'pending') {
        return 'transparent';
    } else {
        return 'gray';
    }
}

export function createTaskStatusButtonDOM(taskObject, taskContainer) {
    const taskStatusButton = document.createElement('div');

    taskStatusButton.style.backgroundColor = setTaskStatusButtonColorDOM(taskObject);

    taskStatusButton.setAttribute('class', 'status-task-button');
    taskStatusButton.setAttribute('data-task-id', taskObject.id);

    taskContainer.appendChild(taskStatusButton);

    createTaskStatusButtonEventListener(taskObject, taskStatusButton);

    return taskStatusButton;
}

function createTaskStatusButtonEventListener(taskObject, taskStatusButton) {
    taskStatusButton.addEventListener('click', () => {
        taskObject.switchStatus();

        taskStatusButton.style.backgroundColor = setTaskStatusButtonColorDOM(taskObject);
    });
}