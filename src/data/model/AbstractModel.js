export default class AbstractModel {
    store;

    constructor(store) {
        this.store = store;
    }

    get rootStore() {
        return this.store.rootStore;
    }

    fromObj(json) {
        for (let field in json) {
            if (field in this) {
                this[field] = json[field];
            }
        }
        return this;
    }

    toJson() {
        let ignore = ['store'];

        let arrayConverter = (array) => {
            return array.map(item => {
                return valConverter(item);
            })
        };

        let objectConverter = (obj) =>{
            let resultObj = {};
            obj = 'toJS' in obj ? obj.toJS() : obj;

            Object.keys(obj).forEach(field => {
                if (!(ignore.includes(field))) {
                    resultObj[field] = valConverter(obj[field]);
                }
            });
            return resultObj;
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

        return objectConverter(this);
    }
}