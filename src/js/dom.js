// this is the entry DOM handling js module but it's also where most global event listeners go

import { Task, PersistanceManager } from './logic.js';
import { clearForm, clearForms, handleFormData } from './formsHandling.js';
import { renderTasksDOM, createTaskDOM, editTaskDOM } from './task_DOM/taskDOM.js';

renderTasksDOM(); // gets called each time the page is loaded to display all tasks in localStorage
clearForms(); // gets called each time the page is loaded to clear all forms from old values

// this handles pressing escape on a dialog form. Without it, the form would still have the values from the previous task
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clearForms();
    }
});

// adding a task

const addTaskButton = document.querySelector('#add-task-button');
const addTaskDialog = document.querySelector('#add-task-dialog');
const addTaskForm = document.querySelector('#add-task-form');

addTaskButton.addEventListener('click', () => {
    addTaskDialog.showModal();
}); // the add task button's sole purpose

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { taskTitle, taskDescription, taskPriority, taskDueDate, taskCategories } = handleFormData(addTaskForm);

    // this is logic stuff not supposed to be in dom, be careful with future imports to avoid circular dependencies
    const taskObject = new Task(taskTitle, taskCategories, taskPriority, taskDescription, taskDueDate);
    taskObject.store();

    createTaskDOM(taskObject);

    clearForm(addTaskForm);

    addTaskDialog.close();
});

// editing a task
const editTaskDialog = document.querySelector('#edit-task-dialog');
const editTaskForm = document.querySelector('#edit-task-form');

// there are many edit task buttons, one for each task, so their event listeners are created with their tasks' DOM elements.

editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskObjectId = editTaskForm.getAttribute('data-task-id');

    const taskObject = PersistanceManager.retrieveTask(taskObjectId);

    const taskContainer = document.querySelector(`div[data-task-id='${taskObjectId}']`);

    const {taskTitle, taskDescription, taskPriority, taskDueDate, taskCategories} = handleFormData(editTaskForm);

    taskObject.title = taskTitle;
    taskObject.description = taskDescription;
    taskObject.priority = taskPriority;
    taskObject.categories = taskCategories;
    taskObject.dueDate = taskDueDate;

    taskObject.store();

    taskContainer.innerHTML = ''; // deconstruct the current task's DOM

    editTaskDOM(taskObject, taskContainer); // reconstruct it

    clearForm(editTaskForm);

    editTaskDialog.close();
});