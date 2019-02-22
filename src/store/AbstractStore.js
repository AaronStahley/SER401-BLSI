import BluebirdPromise from "../common/BluebirdPromise";

export default class AbstractStore {
    collection = {};
    storeLocally;
    allFound   = false;
    transporter;
    model;
    table;

    constructor(model, tableName, rootStore, transporter, storeLocally = false) {
        this.model        = model;
        this.transporter  = transporter;
        this.rootStore    = rootStore;
        this.table        = tableName;
        this.storeLocally = storeLocally;
    }

    getPK = id => {
        if (this.storeLocally && id in this.collection) {
            return this.collection[id];
        }
        return null;
    };

    findPK = id => {
        return this.transporter.select(`select * from ${this.table} where id = ?;`, [id])
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };

    findPKs = ids => {
        return this.transporter.select(`select * from ${this.table} where id IN ?;`, [ids])
            .then(this.processResults);
    };

    getOrFindAll = () => {
        if (this.allFound && this.storeLocally) {
            return new BluebirdPromise((resolve, reject) => {
                resolve(Object.values(this.collection));
            })
        }

        return this.transporter.select(`select * from ${this.table};`, [])
            .then(this.processResults)
            .then(objects => {
                this.allFound = true;
                return objects;
            });
    };

    update = (json) => { 
        return this.transporter.select(`update ${this.table} set ${json} where id IN ?;`, [json.id])
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };

    convertFieldNames = (row) => {
        let mappedObj = {};
        for (let dbField in row) {
            let modelField = dbField.toLowerCase()
                .split('_')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join('');

            mappedObj[modelField] = row[dbField];
        }
        return mappedObj;
    };

    processResults = (_array) => {
        if (_array.length == 0) {
            return [];
        }

        return _array.map(row => {

            let obj = new this.model(this);
            obj.fromObj(this.convertFieldNames(row));

            if (this.storeLocally) {
                this.collection[obj.Id] = obj;
            }

            return obj;
        });
    };

}