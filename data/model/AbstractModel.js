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
}