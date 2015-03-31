var app = {};

// Model
app.Task = function (data) {
    this.description = m.prop(data.description);
};

// Collection
app.TaskList = function () {
    this.tasks = m.prop([]);

    this.loadState = function () {
        this.tasks().push(new app.Task({description: 'Do some clever shit'}));
    };
};

app.vm = {};
app.vm.init = function () {
    // Create a collection and load the state
    app.vm.list = new app.TaskList();
    app.vm.list.loadState();

    // UI method to add a new task
    app.vm.description = m.prop('');
    app.vm.add = function (description) {
        if (description()) {
            app.vm.list.tasks().push(new app.Task({description: description()}));
            app.vm.description('');
        }
    };
};

app.controller = function () {
    app.vm.init();
};

app.view = function () {
    return m('', [
        m('h3', 'Tasks'),
        m('ul', [
            app.vm.list.tasks().map(function (task) {
                return m('li', task.description());
            })
        ])
    ]);
};

m.module(document.getElementById('tasks'), app);
