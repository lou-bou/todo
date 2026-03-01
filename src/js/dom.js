// this is the entry DOM handling js module but it's also where most global event listeners go

import { Task, PersistanceManager, Project, defaultProjectObject } from './logic.js';
import { clearForms, clearTaskForm, handleTaskFormData, clearProjectForm, handleProjectFormData } from './formsHandling.js';
import { renderAllTasksDOM, createTaskDOM, editTaskDOM } from './task_DOM/taskDOM.js';
import { renderAllProjectsDOM, createProjectDOM, editProjectDOM, renderDefaultProjectDOM, editDefaultProjectDOM } from './project_DOM/projectDOM.js';

renderAllTasksDOM(); // gets called each time the page is loaded to display all tasks in localStorage
renderDefaultProjectDOM(); // specifically for default project (which has less DOM elements)
renderAllProjectsDOM(); // same as render tasks but for projects

clearForms(); // gets called each time the page is loaded to clear all forms from old values (if user reloaded while a dialog is still open)

// adding a task

const addTaskButton = document.querySelector('#add-task-button');
const addTaskDialog = document.querySelector('#add-task-dialog');
const addTaskForm = document.querySelector('#add-task-form');

addTaskButton.addEventListener('click', () => {
    addTaskDialog.showModal();
}); // the add task button's sole purpose

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { taskTitle, taskDescription, taskDueDate, taskPriority, taskCategories } = handleTaskFormData(addTaskForm);

    // this is logic stuff not supposed to be in dom, be careful with future imports to avoid circular dependencies
    const taskObject = new Task(taskTitle, taskDescription, taskDueDate, taskPriority, taskCategories);
    taskObject.store();

    /*
    this entire section here is to:
    1) store every new task in its respective project + the default project
    2) re-render the project's title event listener (because the event listener still has the old list of projectObject.taskIds)
    */

    defaultProjectObject.addTask(taskObject.id);
    defaultProjectObject.store();

    const defaultProjectContainer = document.querySelector(`div[data-project-id='${defaultProjectObject.id}']`);

    // re-rendering
    editDefaultProjectDOM(defaultProjectObject, defaultProjectContainer);

    const currentProjectObject = PersistanceManager.retrieveProject(PersistanceManager.currentProjectID);

    if (currentProjectObject.id != "default") { // to not push a task twice to default project
        currentProjectObject.addTask(taskObject.id);
        currentProjectObject.store();

        const currentProjectContainer = document.querySelector(`div[data-project-id='${currentProjectObject.id}']`);

        currentProjectContainer.innerHTML = '';

        // re-rendering
        editProjectDOM(currentProjectObject, currentProjectContainer);
    }

    createTaskDOM(taskObject);

    clearTaskForm(addTaskForm);

    addTaskDialog.close();
});

addTaskDialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clearTaskForm(addTaskForm);
    }
});

// editing a task

// the edit task button is created for each corresponding task, and has its own event listener in taskEditButtonDOM.js

const editTaskDialog = document.querySelector('#edit-task-dialog');
const editTaskForm = document.querySelector('#edit-task-form');

// there are many edit task buttons, one for each task, so their event listeners are created with their tasks' DOM elements.

editTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskObjectId = editTaskForm.getAttribute('data-task-id');

    const taskObject = PersistanceManager.retrieveTask(taskObjectId);

    const taskContainer = document.querySelector(`div[data-task-id='${taskObjectId}']`);

    const { taskTitle, taskDescription, taskDueDate, taskPriority, taskCategories } = handleTaskFormData(editTaskForm);

    taskObject.title = taskTitle;
    taskObject.description = taskDescription;
    taskObject.dueDate = taskDueDate;
    taskObject.priority = taskPriority;
    taskObject.categories = taskCategories;

    taskObject.store();

    taskContainer.innerHTML = ''; // deconstruct the current task's DOM

    editTaskDOM(taskObject, taskContainer); // reconstruct it

    clearTaskForm(editTaskForm);

    editTaskDialog.close();
});

editTaskDialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clearTaskForm(editTaskForm);
    }
});

// task expansion dialog event listener for escape

const taskExpansionDialog = document.querySelector('#task-expansion-dialog');
const taskExpansionTitle = document.querySelector('#task-expansion-title');
const taskExpansionDescription = document.querySelector('#task-expansion-description');
const taskExpansionDueDate = document.querySelector('#task-expansion-dueDate');
const taskExpansionPriority = document.querySelector('#task-expansion-priority');
const taskExpansionStatus = document.querySelector('#task-expansion-status');
const taskExpansionCategories = document.querySelector('#task-expansion-categories');

taskExpansionDialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        taskExpansionTitle.innerHTML = '';

        taskExpansionDescription.innerHTML = '';

        taskExpansionDueDate.innerHTML = '';

        taskExpansionPriority.innerHTML = '';

        taskExpansionStatus.innerHTML = '';

        taskExpansionCategories.innerHTML = '';
    }
});

// adding a project

const addProjectButton = document.querySelector("#add-project-button");
const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectForm = document.querySelector("#add-project-form");

addProjectButton.addEventListener('click', () => {
    addProjectDialog.showModal();
});

addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const { projectTitle } = handleProjectFormData(addProjectForm);

    const projectObject = new Project(projectTitle);
    
    projectObject.store();

    createProjectDOM(projectObject);

    clearProjectForm(addProjectForm);

    addProjectDialog.close();
});

addProjectDialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clearProjectForm(addProjectForm);
    }
});

// editing a project

const editProjectDialog = document.querySelector("#edit-project-dialog");
const editProjectForm = document.querySelector("#edit-project-form");

editProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectObjectId = editProjectForm.getAttribute("data-project-id");

    const projectObject = PersistanceManager.retrieveProject(projectObjectId);

    const projectContainer = document.querySelector(`div[data-project-id='${projectObjectId}']`);

    const { projectTitle } = handleProjectFormData(editProjectForm);

    projectObject.title = projectTitle;

    projectObject.store();

    projectContainer.innerHTML = '';

    editProjectDOM(projectObject, projectContainer);

    clearProjectForm(editProjectForm);

    editProjectDialog.close();
})

editProjectDialog.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        clearProjectForm(editProjectForm);
    }
});