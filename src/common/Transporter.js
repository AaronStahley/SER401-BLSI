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

    execute(sql) {
        this.database.transaction(tx => {
            tx.executeSql(sql);
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
}