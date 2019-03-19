import BluebirdPromise from "../common/BluebirdPromise";
import {observable} from "mobx";
import * as mobx from "mobx";

export default class AbstractStore {
    @observable collection = [];
    allFound               = false;
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
        return this.collection.find(item => item.Id === id);
    };

    // getOrFindPK = id => {
    //     return this.getPK(id)
    //         ? Promise.resolve(id)
    //         : this.findPK(id);
    // };


    // getPK = id => {
    //     if (id in this.collection) {
    //         return this.collection[id];
    //     }
    //     return null;
    // };

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
        let id = json.Id;
        delete json.Id;

        let {sql, values} = this.transporter.buildUpdateSql(this.table, id, json);

        return this.transporter.execute(sql, values)
            .then(res => res.rowsAffected > 0);
    };

    insert = (json) => {
        delete json.Id;

        let {sql, values} = this.transporter.buildInsertSql(this.table, json);

        return this.transporter.execute(sql, values)
            .then(res => {
                if (res.insertId) {
                    return res.insertId;
                }
                return null;
            })
    };

    delete = (id) => {
        return this.transporter.execute(`delete from ${this.table} where id = ?`, [id])
            .then(this.processResults)
            .then(res => res.length > 0 ? res[0] : null);
    };

    //Incomplete, but not operable
    updateOrInsert = (json) => {
        if (json.id && json.id !== "") {
            return this.update(json);
        } else {
            return this.insert(json);
        }
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

    register = (obj) => {
        this.collection.push(obj);
        return this;
    };

    processResults = (_array) => {
        if (_array.length === 0) {
            return [];
        }

        return _array.map(row => {
            let isRegistered = false;
            let obj          = 'id' in row ? this.get(row.id) : null;

            if (!obj) {
                isRegistered = true;
                obj          = new this.model(this);
            }

            obj.fromObj(this.convertFieldNames(row));
            if (isRegistered) {
                this.register(obj);
            }
            return obj;
        });
    };

}