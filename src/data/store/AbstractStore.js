import {observable} from "mobx";
import BluebirdPromise from "../../common/BluebirdPromise";

export default class AbstractStore {
    @observable collection = {};
                transporter;
                model;
                table;

    constructor(model, tableName, rootStore, transporter) {
        this.model       = model;
        this.transporter = transporter;
        this.rootStore   = rootStore;
        this.table       = tableName;
    }

    findPK = id => {
        return this.transporter.select(`select * from ${this.table} where id = ?;`, [id])
            .then(this.preProcessResults)
            .then(this.processResults)
            .then(this.postProcessResults)
            .then(res => res[0]);
    };

    findPKs = ids => {
        return this.transporter.select(`select * from ${this.table} where id IN ?;`, [ids])
            .then(this.preProcessResults)
            .then(this.processResults)
            .then(this.postProcessResults);
    };

    findAll = () => {
        return this.transporter.select(`select * from ${this.table};`, [])
            .then(this.preProcessResults)
            .then(this.processResults)
            .then(this.postProcessResults);
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

    preProcessResults = (_array) => _array;

    processResults = (_array) => {
        return _array.map(row => {

            let obj = new this.model(this);
            obj.fromObj(this.convertFieldNames(row));

            return obj;
        });
    };

    postProcessResults = (objects) => objects;

}