var Stats = {};

Stats.model = function (data) {
    this.name = m.prop(data.name);
    this.level = m.prop(data.level || 1);
    this.xp = m.prop(data.xp || 0);
};

Stats.controller = function () {
    var ctrl = this;

    ctrl.stats = m.prop([]);

    ctrl.add = function (data) {
        ctrl.stats().push(new Stats.model(data));
    };

    ctrl.load = function () {
        ctrl.add({name: 'Happiness'});
    };
};

Stats.view = function (ctrl) {
    ctrl.load();
    return m('ul', [
        ctrl.stats().map(function (stat, index) {
            return m('li', stat.name());
        })
    ]);
};

m.module(document.getElementById('stats'), Stats);
