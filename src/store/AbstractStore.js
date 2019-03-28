import BluebirdPromise from "../common/BluebirdPromise";
import {observable} from "mobx";

export default class AbstractStore {
    @observable collection = [];
    allFound               = false;
    rootStore;
    transporter;
    model;
    table;

    constructor(model, tableName, rootStore, transporter) {
        this.model       = model;
        this.transporter = transporter;
        this.rootStore   = rootStore;
        this.table       = tableName;
    }

    get = id => {
        return this.collection.find(item => item.id === id);
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

    getOrFindAll = (forceFetch = false) => {
        if (this.allFound && !forceFetch) {
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
        let id = json.id;
        delete json.id;

        let {sql, values} = this.transporter.buildUpdateSql(this.table, id, json);

        return this.transporter.execute(sql, values)
            .then(res => res.rowsAffected > 0);
    };

    insert = (json) => {
        //delete json.id;
        let {sql, values} = this.transporter.buildInsertSql(this.table, json);

        return this.transporter.execute(sql, values)
            .then(res => res.insertId)
    };

    delete = (id) => {
        return this.transporter.execute(`delete from ${this.table} where id = ?`, [id])
    };

    register = (obj) => {
        this.collection.push(obj);
        return this;
    };

    processResults = (_array) => {
        console.log(_array);
        if (_array.length === 0) {
            return [];
        }

        return _array.map(row => {
            let isRegistered = true;
            let obj          = 'id' in row ? this.get(row.id) : null;

            if (!obj) {
                isRegistered = false;
                obj          = new this.model(this);
            }

            obj.fromObj(row);
            if (!isRegistered) {
                this.register(obj);
            }
            return obj;
        });
    };

}