export { clearForms, clearTaskForm, handleTaskFormData, clearProjectForm, handleProjectFormData }

function clearForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form) => {
        if (form.getAttribute("class") == "task-form") {
            clearTaskForm(form);
        } else if (form.getAttribute("class") == "project-form") {
            clearProjectForm(form);
        }
        
    });
}

function clearTaskForm(taskForm) {
    // input fields that have a value attribute
    taskForm.title.value = '';
    taskForm.dueDate.value = '';
    taskForm.description.value = '';

    // uncheck the priorty radio button that is checked
    const priority = document.querySelector('input[name="priority"]:checked');
    if (priority) { // in case the user presses Escape without checking any priority
        priority.checked = false;
    }

    // uncheck every category checkbox
    const categories = document.querySelectorAll('input[type="checkbox"]');
    for (const category of categories) {
        category.checked = false;
    }
}

function clearProjectForm(projectForm) {
    projectForm.title.value = '';
}

function handleTaskFormData(taskForm) {
    let formData = new FormData(taskForm);

    let taskTitle;
    let taskDescription;
    let taskDueDate;
    let taskPriority;
    let taskCategories = [];

    for (const pair of formData.entries()) {
        // each pair is an input from the form in this format: input field name - input field value
        switch (pair[0]) {
            case 'title':
                taskTitle = pair[1];
                break;
            case 'description':
                taskDescription = pair[1];
                break;
            case 'dueDate':
                taskDueDate = pair[1];
                break;
            case 'priority':
                taskPriority = pair[1];
                break;
            default: // case for categories (one category that is selected has its own pair (category name - 'on'), if a category is not selected it has no pair)
                taskCategories.push(pair[0]);

        }
    }

    return { taskTitle, taskDescription, taskDueDate, taskPriority, taskCategories };
}

function handleProjectFormData(projectForm) {
    let formData = new FormData(projectForm);

    let projectTitle;

    for (const pair of formData.entries()) {
        switch (pair[0]) {
            case 'title':
                projectTitle = pair[1];
                break;
        }
    }

    return { projectTitle };

}