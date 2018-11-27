import {observable} from "mobx";

export default class AbstractStore {
    @observable collection = {};
                transporter;
                model;
                table;

    constructor(model, tableName, transporter) {
        this.model       = model;
        this.transporter = transporter;
        this.table       = tableName;
    }

    findPK = id => {
        return this.transporter.select(`select * from ${this.table} where id = ?;`, [id])
            .then(this.processResults);
    };

    findPKs = ids => {
        return this.transporter.select(`select * from ${this.table} where id IN ?;`, [ids])
            .then(this.processResults);
    };

    findAll = () => {
        return this.transporter.select(`select * from ${this.table};`, [])
            .then(this.processResults);
    };

    processResults = (_array) => {
        return _array.map(row => {
            console.log(row);
            let obj = new this.model(this);
            obj.fromObj(row);

            return obj;
        })
    };

}