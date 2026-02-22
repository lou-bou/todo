export class Task {
    id;
    title;
    categories = [];
    status;
    description;
    priority;
    dueDate;

    constructor(title, categories, priority, description, dueDate) { // the categories parameter here must be an array
        this.id = crypto.randomUUID();
        this.title = title;
        this.categories = categories;
        this.status = 'pending'; // default status
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    switchStatus() {
        if (this.status == 'pending') {
            this.status = 'completed';
        } else {
            this.status = 'pending';
        }

        PersistanceManager.storeTask(this);
    }

    delete() {
        PersistanceManager.deleteTask(this.id);
    }

    store() {
        PersistanceManager.storeTask(this);
    }
}

export class PersistanceManager { // utility class for all localStorage related functions
    static storeTask(taskObject) {
        const stringifiedTask = JSON.stringify(taskObject); // at this point, the task object has lost all of its methods
        localStorage.setItem(taskObject.id, stringifiedTask);
    }

    static retrieveTask(taskObjectId) { // the retrieved task object doesn't have its methods, so this creates a new task and assigns its methods to the retrieved task object
        const plainTaskObject = localStorage.getItem(taskObjectId);
        const parsedTaskObject = JSON.parse(plainTaskObject);
        const reconstructedTaskObject = new Task();
        Object.assign(reconstructedTaskObject, parsedTaskObject);
        return reconstructedTaskObject;
    }

    static retrieveAllTasks() {
        let taskObjects = [];
        let taskObject; // to use in iteration for each task in the list
        const taskObjectIds = Object.keys(localStorage); // gets all localStorage keys (the tasks ids in this case)
        
        for (let i = 0; i < taskObjectIds.length; i++) {
            taskObject = this.retrieveTask(taskObjectIds[i]);
            taskObjects.push(taskObject);
        }

        return taskObjects;
    }

    static deleteTask(taskObjectId) {
        localStorage.removeItem(taskObjectId);
    }
}