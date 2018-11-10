import {SQLite} from "expo";
import BluebirdPromise from "./BluebirdPromise";

export default class Transporter {
    database;

    constructor() {
        this.database = SQLite.openDatabase('db.db');
        this.initDb();
    }

    initDb() {
        //todo:: sql create commands
        //ex: this.execute('create table if not exists items (id integer primary key not null, done int, value text);');
        // this.execute('');
    }

    execute(sql) {
        this.database.transaction(tx => {
            tx.executeSql(sql);
        });
    }

    select(sql, params) {
        new BluebirdPromise((resolve, reject) => {
            this.database.transaction(tx => {
                tx.executeSql(
                    sql,
                    [ids],
                    (_, {rows: {_array}}) => {
                        resolve(_array);
                    }
                );
            });
        });
    }
}