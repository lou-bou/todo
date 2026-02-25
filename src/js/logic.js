export { Task, PersistanceManager, Project, DefaultProject }

class Task {
    id;
    title;
    description;
    dueDate;
    status;
    priority;
    categories = [];
    type;

    constructor(title, description, dueDate, priority, categories) { // the categories parameter here must be an array
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = 'pending'; // default status
        this.priority = priority;
        this.categories = categories;
        this.type = 'Task';
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

class Project {
    id;
    title;
    taskIds = [];
    type;

    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.type = 'Project';
    }

    addTask(taskId) {
        this.taskIds.push(taskId);
    }

    removeTask(taskId) {
        const index = this.taskIds.indexOf(taskId);
        this.taskIds.splice(index, 1);
    }

    store() {
        PersistanceManager.storeProject(this);
    }
}

class PersistanceManager { // utility class for all localStorage related functions
    static storeTask(taskObject) {
        const stringifiedTask = JSON.stringify(taskObject); // at this point, the task object has lost all of its methods
        localStorage.setItem(taskObject.id, stringifiedTask);
    }

    static retrieveTask(taskObjectId) { // the retrieved task object doesn't have its methods, so this creates a new task and assigns its methods to the retrieved task object
        const plainTaskObject = localStorage.getItem(taskObjectId);
        const parsedTaskObject = JSON.parse(plainTaskObject);

        // if it is not of type "Task" (meaning it's of type "Project"), return null
        if (parsedTaskObject.type != 'Task') {
            return null;
        }
        
        const reconstructedTaskObject = new Task();
        Object.assign(reconstructedTaskObject, parsedTaskObject);
        return reconstructedTaskObject;
    }

    static retrieveAllTasks() {
        let taskObjects = [];
        let taskObject; // to use in iteration for each task in the list
        const ObjectIds = Object.keys(localStorage); // gets all localStorage keys (both task ids and project ids)
        
        for (let i = 0; i < ObjectIds.length; i++) {
            taskObject = this.retrieveTask(ObjectIds[i]);

            // only push this object if it's a task object, because the ObjectIds contains both project ids and task ids
            if (taskObject) {
                taskObjects.push(taskObject);
            }
           
        }

        return taskObjects;
    }

    static deleteTask(taskObjectId) {
        localStorage.removeItem(taskObjectId);
    }

    static storeProject(projectObject) {
        const stringifiedProject = JSON.stringify(projectObject);
        localStorage.setItem(projectObject.id, stringifiedProject);
    }
}

// a permanent default project
const DefaultProject = new Project("Default");

PersistanceManager.storeProject(DefaultProject);