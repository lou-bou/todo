import { Task, PersistanceManager } from './logic.js';

const addTaskButton = document.querySelector('#add-task-button');
const addTaskDialog = document.querySelector('#add-task-dialog');
const addTaskForm = document.querySelector('#add-task-form');

addTaskButton.addEventListener('click', () => {
    addTaskDialog.showModal();
}); // the add task button's sole purpose

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(addTaskForm);

    let title;
    let categories = [];

    for (var pair of formData.entries()) {
        // the html form has a title input and categories inputs, it checks if the pair is for the title input (the first one)
        if (pair[0] == 'title') { 
            title = pair[1];
        } else {
            // the categories selected will have pair[1] = on, and only the selected categories will be iterated.
            categories.push(pair[0]); 
        }
    }

    // this is logic stuff not supposed to be in dom, be careful with future imports to avoid circular dependencies
    const task = new Task(title, categories);
    PersistanceManager.storeTask(task);

    addTaskDialog.close();
});