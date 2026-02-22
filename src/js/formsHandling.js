export function clearForms() {
    const forms = document.querySelectorAll('.task-form');
    
    forms.forEach((form) => {
        clearForm(form);
    });
}

export function clearForm(form) {
    form.title.value = '';

    // all radio buttons with the name priority
    const priorities = document.getElementsByName('priority');
    for (const priority of priorities) {
        priority.checked = false;
    }

    form.dueDate.value = '';

    form.Personal.checked = false;
    form.Work.checked = false;
    form.School.checked = false;
    form.Urgent.checked = false;
    form.Optional.checked = false;

    form.description.value = '';
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