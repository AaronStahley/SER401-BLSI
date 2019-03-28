export default class AbstractModel {
    store;

    constructor(store) {
        this.store = store;
    }

    get rootStore() {
        return this.store.rootStore;
    }

    reload() {
        if ('id' in this) {
            return this.store.findPK(this.id);
        }
        return Promise.resolve(this);
    };

    fromObj(json) {
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
            }
        }
        return this;
    }

    toJson() {
        return this._toJson(this);
    }


    _toJson(object) {
        let ignore = ['store'];

        let arrayConverter = (array) => {
            return array.map(item => {
                return valConverter(item);
            })
        };

        let objectConverter = (obj) => {
            return 'toJS' in obj ? obj.toJS() : obj.constructor.name;
        };

        let valConverter = (val) => {
            switch (true) {
                case val instanceof AbstractModel:
                    return val.toJson();
                case val instanceof Array:
                    return arrayConverter(val);
                case val instanceof Object:
                    return objectConverter(val);
                default:
                    return val;
            }
        };

        let resultObj = {};
        Object.keys(object).forEach(field => {
            if (!(ignore.includes(field))) {
                resultObj[field] = valConverter(object[field]);
            }
        });
        return resultObj;
    }


    save() {
        if (!this.id) {
            return this.store.insert(this.toJson())
                .then(insertId => {
                    this.id = insertId;
                    this.store.register(this);
                    return this.reload();
                });
        } else {
            return this.store.update(this.toJson())
                .then(good => {
                    if (good === true) {
                        return this.reload();
                    }
                    return null;
                });
        }
    }
}