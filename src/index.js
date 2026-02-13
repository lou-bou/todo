class Task {
    id;
    title;
    categories = [];
    status;

    constructor(title, categories) { // the categories parameter here must be implemented as an array
        this.id = crypto.randomUUID();
        this.title = title;
        this.categories = addCategories(this.categories, categories);
        this.status = 'pending';
    }
}

function addCategories(categorieslist, categories) {
    for (let i = 0; i < categories.length; i++) {
        categorieslist.push(categories[i]);
    }

    return categorieslist;
}