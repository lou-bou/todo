export function clearForms() {
    const forms = document.querySelectorAll('.task-form');
    
    forms.forEach((form) => {
        clearForm(form);
    });
}

export function clearForm(form) {
    form.title.value = '';
    form.dueDate.value = '';
    form.description.value = '';

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

export function handleFormData(form) {
    let formData = new FormData(form);

    let taskTitle;
    let taskDescription;
    let taskPriority;
    let taskDueDate;
    let taskCategories = [];

    for (var pair of formData.entries()) {
        // each pair is an input from the form in this format: input field name - input field value
        switch (pair[0]) {
            case 'title':
                taskTitle = pair[1];
                break;
            case 'description':
                taskDescription = pair[1];
                break;
            case 'priority':
                taskPriority = pair[1];
                break;
            case 'dueDate':
                taskDueDate = pair[1];
                break;
            default: // case for categories (one category that is selected has its own pair (category name - 'on'), if a category is not selected it has no pair)
                taskCategories.push(pair[0]);

        }
    }

    return {taskTitle, taskDescription, taskPriority, taskDueDate, taskCategories};
}