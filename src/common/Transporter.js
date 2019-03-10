import {SQLite} from "expo";
import BluebirdPromise from "./BluebirdPromise";

export default class Transporter {
    databaseName;
    database;

    constructor(dbName) {
        this.databaseName = dbName;
    }

    init() {
        return new BluebirdPromise((resolve, reject) => {
            SQLite.openDatabase(this.databaseName, '1.0', "main", 1, (database) => {
                this.database = database;
                resolve(database);
            });
        });
    }

    execute(sql, params) {
        console.log(sql);
        return new BluebirdPromise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    sql,
                    params,
                    (_, res) => {
                        resolve(res);
                    }
                );
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }


    select(sql, params) {
        return new BluebirdPromise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    sql,
                    params,
                    (_, {rows: {_array}}) => {
                        resolve(_array);
                    }
                );
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }


    buildUpdateSql = (table, id, json) => {
        let updateKeys = [];
        let values     = [];

        Object.keys(json).forEach(key => {
            updateKeys.push(`${this.convertFieldNames([key])} = ?`);
            values.push(this.convertValueToSql(json[key]));
        });
        values.push(id);

        return {
            sql   : `update ${table} set ${updateKeys.join(", ")} where id = ?`,
            values: values
        };
    };


    buildInsertSql = (table, json) => {
        let insertKeys   = this.convertFieldNames(Object.keys(json));
        let insertParams = new Array(insertKeys.length).fill("?");
        let values       = Object.keys(json).map((key) => this.convertValueToSql(json[key]));

        return {
            sql   : `insert into ${table} (${insertKeys.join(', ')}) values (${insertParams.join(', ')})`,
            values: values
        };
    };

    convertFieldNames = (fields) => {
        return fields.map(field => field.replace(/\.?([A-Z]+)/g, function (x, y) {
            return "_" + y.toLowerCase()
        }).replace(/^_/, ""));
    };


    convertValueToSql = (val) => {
        switch (true) {
            case (typeof val) === 'string':
                return val;
            case val === true:
                return 1;
            case val === false:
                return 0;
            case val === "null":
                return val.toUpperCase();
            default:
                return val;
        }
    };
}