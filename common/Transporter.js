import {SQLite} from "expo";
import BluebirdPromise from "./BluebirdPromise";

export default class Transporter {
    database;

    constructor(dbName) {
        this.database = SQLite.openDatabase(dbName);
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
            });
        });
    }
}