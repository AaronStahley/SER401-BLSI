export default class AbstractModel {
    store;

    constructor(store) {
        this.store = store;
    }

    get rootStore() {
        return this.store.rootStore;
    }

    fromObj(json) {
        for (let dbField in json) {

            let modelField = dbField.toLowerCase()
                .split('_')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join('');

            if (modelField in this) {
                this[modelField] = json[dbField];
            }
        }
        return this;
    }
}